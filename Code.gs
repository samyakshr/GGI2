function doGet(e) {
  try {
    // Get the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Get all data from the sheet
    var data = sheet.getDataRange().getValues();
    Logger.log('Raw data: ' + JSON.stringify(data));
    
    // Process the data
    var processedData = processData(data);
    Logger.log('Processed data: ' + JSON.stringify(processedData));
    
    // Return as JSON
    return ContentService.createTextOutput(JSON.stringify(processedData))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      artworkVotes: { 'Tree': 0, 'Flower': 0, 'Swing': 0, 'House': 0 },
      emotionCounts: { 'happy': 0, 'sad': 0, 'nostalgic': 0, 'bored': 0 },
      recentResponses: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function processData(data) {
  try {
    var headers = data[0];
    Logger.log('Headers: ' + JSON.stringify(headers));
    
    var artworkVotes = {
      'Tree': 0,
      'Flower': 0,
      'Swing': 0,
      'House': 0
    };
    
    var emotionCounts = {
      'happy': 0,
      'sad': 0,
      'nostalgic': 0,
      'bored': 0
    };
    
    var recentResponses = [];
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var totalResponsesToday = 0;
    var totalEngagementToday = 0;
    
    // Find the column indices for experience and artwork
    var experienceColIndex = headers.indexOf("How would you describe your experience at the gallery today in one sentence or phrase?");
    var artworkColIndex = headers.indexOf("Which artwork stood out to you the most?");
    var timestampColIndex = 0; // Assuming timestamp is in the first column
    
    Logger.log('Column indices - Experience: ' + experienceColIndex + ', Artwork: ' + artworkColIndex);
    
    if (experienceColIndex === -1 || artworkColIndex === -1) {
      throw new Error('Required columns not found in spreadsheet');
    }
    
    // Skip header row
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      Logger.log('Processing row ' + i + ': ' + JSON.stringify(row));
      
      // Get the timestamp
      var timestamp = new Date(row[timestampColIndex]);
      timestamp.setHours(0, 0, 0, 0);
      
      // Check if the response is from today
      if (timestamp.getTime() === today.getTime()) {
        totalResponsesToday++;
        
        // Get the experience description
        var experience = row[experienceColIndex];
        if (experience && typeof experience === 'string') {
          experience = experience.trim();
          
          // Get the artwork from the correct column
          var artwork = row[artworkColIndex];
          if (artwork && typeof artwork === 'string') {
            artwork = artwork.trim();
            Logger.log('Found artwork: ' + artwork);
            if (artworkVotes.hasOwnProperty(artwork)) {
              artworkVotes[artwork]++;
            }
          }
          
          // Classify emotion from experience description
          var emotion = classifyEmotion(experience);
          if (emotionCounts.hasOwnProperty(emotion)) {
            emotionCounts[emotion]++;
          }
          
          // Calculate engagement (positive emotions count as engagement)
          if (emotion === 'happy' || emotion === 'nostalgic') {
            totalEngagementToday++;
          }
          
          // Add to recent responses (last 10 entries)
          if (recentResponses.length < 10) {
            recentResponses.unshift({
              experience: experience,
              artwork: artwork || 'Unknown',
              emotion: emotion,
              timestamp: row[timestampColIndex]
            });
          }
        }
      }
    }
    
    // Calculate engagement rate
    var engagementRate = totalResponsesToday > 0 ? 
      Math.round((totalEngagementToday / totalResponsesToday) * 100) : 0;
    
    Logger.log('Final counts - Artwork votes: ' + JSON.stringify(artworkVotes));
    Logger.log('Final counts - Emotion counts: ' + JSON.stringify(emotionCounts));
    Logger.log('Daily stats - Total responses: ' + totalResponsesToday);
    Logger.log('Daily stats - Engagement rate: ' + engagementRate + '%');
    
    return {
      artworkVotes: artworkVotes,
      emotionCounts: emotionCounts,
      recentResponses: recentResponses,
      dailyStats: {
        totalResponses: totalResponsesToday,
        engagementRate: engagementRate
      }
    };
  } catch (error) {
    Logger.log('Error in processData: ' + error.toString());
    throw error;
  }
}

function classifyEmotion(text) {
  text = text.toLowerCase();
  
  // Define keywords for each emotion
  var happyKeywords = ['happy', 'joy', 'great', 'wonderful', 'amazing', 'love', 'enjoy', 'beautiful', 'excellent', 'fantastic', 'inspiring', 'uplifting', 'delightful', 'peaceful', 'calm'];
  var sadKeywords = ['sad', 'disappoint', 'bad', 'poor', 'unhappy', 'terrible', 'awful', 'horrible', 'upset', 'depressed', 'uninspiring', 'disheartening', 'gloomy', 'melancholy'];
  var nostalgicKeywords = ['nostalgic', 'memory', 'remember', 'childhood', 'past', 'old', 'back then', 'reminisce', 'recall', 'memories', 'youth', 'childhood', 'reminiscent', 'sentimental', 'grandmother', 'grandfather', 'family'];
  var boredKeywords = ['bored', 'boring', 'uninteresting', 'dull', 'tired', 'monotonous', 'repetitive', 'tedious', 'uninspiring', 'unexciting', 'uninspired', 'unmotivated'];
  
  // Count matches for each emotion
  var counts = {
    'happy': 0,
    'sad': 0,
    'nostalgic': 0,
    'bored': 0
  };
  
  // Count keyword matches
  happyKeywords.forEach(function(keyword) {
    if (text.includes(keyword)) counts.happy++;
  });
  sadKeywords.forEach(function(keyword) {
    if (text.includes(keyword)) counts.sad++;
  });
  nostalgicKeywords.forEach(function(keyword) {
    if (text.includes(keyword)) counts.nostalgic++;
  });
  boredKeywords.forEach(function(keyword) {
    if (text.includes(keyword)) counts.bored++;
  });
  
  // Find the emotion with the highest count
  var maxCount = 0;
  var maxEmotion = 'happy'; // Default to happy
  
  for (var emotion in counts) {
    if (counts[emotion] > maxCount) {
      maxCount = counts[emotion];
      maxEmotion = emotion;
    }
  }
  
  return maxEmotion;
}

function onFormSubmit(e) {
  // This function will run when a form is submitted
  // You can add any additional processing here
} 