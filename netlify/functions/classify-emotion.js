exports.handler = async (event) => {
  const { text } = JSON.parse(event.body || '{}');
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OpenAI API key not set in environment variables.' }),
    };
  }

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

  const data = await openaiRes.json();
  let emotion = data.choices?.[0]?.message?.content?.trim().toLowerCase() || 'inspired';
  const allowed = ['happy', 'sad', 'nostalgic', 'inspired'];
  if (!allowed.includes(emotion)) emotion = 'inspired';

  return {
    statusCode: 200,
    body: JSON.stringify({ emotion }),
  };
}; 