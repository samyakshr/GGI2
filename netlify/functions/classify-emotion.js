/**
 * Netlify serverless function for emotion classification using OpenAI API.
 *
 * Receives a POST request with a JSON body containing a 'text' field.
 * Responds with a JSON object: { emotion: 'happy' | 'sad' | 'nostalgic' | 'inspired' }
 * If the text does not fit any emotion, returns 'inspired' by default.
 *
 * Environment variable required: OPENAI_API_KEY
 */
exports.handler = async (event) => {
  // Parse the input text from the request body
  const { text } = JSON.parse(event.body || '{}');
  const apiKey = process.env.OPENAI_API_KEY;

  // Check for API key
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OpenAI API key not set in environment variables.' }),
    };
  }

  // Call OpenAI API to classify the emotion
  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          // Prompt instructs the model to only use the allowed emotions
          content: `You are an emotion classifier. Given a user's text, respond with ONLY one of these exact words: happy, sad, nostalgic, inspired. If the text does not fit any, respond with "inspired". Do not explain. Do not use any other words.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      max_tokens: 1,
      temperature: 0
    })
  });

  // Parse the OpenAI API response
  const data = await openaiRes.json();
  let emotion = data.choices?.[0]?.message?.content?.trim().toLowerCase() || 'inspired';
  // Only allow the four valid emotions
  const allowed = ['happy', 'sad', 'nostalgic', 'inspired'];
  if (!allowed.includes(emotion)) emotion = 'inspired';

  // Return the classified emotion
  return {
    statusCode: 200,
    body: JSON.stringify({ emotion }),
  };
}; 