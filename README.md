# The Gund Gallery Immersion

## Overview

**The Gund Gallery Immersion** is a web-based analytics and engagement platform for The Gund Gallery. It visualizes and analyzes visitor responses to various artworks, providing real-time insights into visitor emotions, artwork popularity, and engagement trends. The dashboard and display are powered by data collected from a Google Form, stored in a Google Sheet, and fetched dynamically via the Google Sheets API. Emotion classification is performed using OpenAI's GPT model via a secure Netlify Function.

**Key Features:**
- Real-time charts and metrics for artwork popularity and visitor emotions
- OpenAI-powered emotion classification (happy, sad, nostalgic, inspired)
- Censoring of inappropriate language in public displays
- A modal to view all recent responses
- A clean, modern UI built with Material Dashboard 3
- Secure backend logic using Netlify Functions (no API keys exposed)

## How It Works

1. **Visitors submit responses** via a Google Form.
2. **Responses are stored** in a connected Google Sheet.
3. **Frontend (dashboard & display)** fetches the latest data from the Google Sheet using the Google Sheets API.
4. **Emotion classification** is performed by sending each response to a Netlify Function, which uses OpenAI's GPT model to return one of: `happy`, `sad`, `nostalgic`, or `inspired`.
5. **Censoring:** Any curse words in responses are automatically replaced with asterisks before being shown on the display page.
6. **Charts and metrics** are updated in real time, and the display page always shows the latest response and its emotion.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (ES6+)
- **UI Framework:** [Material Dashboard 3](https://www.creative-tim.com/product/material-dashboard)
- **Charts:** [Chart.js](https://www.chartjs.org/) and plugins
- **Data Source:** Google Sheets API (connected to a Google Form)
- **Emotion Classification:** OpenAI GPT model via Netlify Functions
- **Backend/Hosting:** Netlify (static hosting + serverless functions)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ggi-dashboard.git
cd ggi-dashboard
```

### 2. Install Dependencies
This project is a static site and does not require a build step. All dependencies are loaded via CDN.  
If you want to use a local server for development, you can use [http-server](https://www.npmjs.com/package/http-server) or Python's built-in server:
```bash
# Using http-server (Node.js)
npm install -g http-server
http-server .
# Or using Python 3
python3 -m http.server 3000
```
Then open [http://localhost:3000/pages/dashboard.html](http://localhost:3000/pages/dashboard.html) in your browser.

### 3. Configure Google Sheets API
- Create a Google Form and link it to a Google Sheet.
- In the code, update the `spreadsheetId` and `apiKey` in the JavaScript section of `pages/dashboard.html`, `pages/display.html`, and `pages/notifications.html` to match your Google Sheet and API credentials.
- Make sure your Google Sheet is shared as "Anyone with the link can view" for public API access.

### 4. Set Up OpenAI API Key in Netlify
- Deploy your project to Netlify.
- In your Netlify site settings, add an environment variable named `OPENAI_API_KEY` with your OpenAI key.
- Netlify Functions will use this key to classify emotions securely.

## Usage
- **Dashboard:** View real-time analytics, charts, and recent responses at `/pages/dashboard.html`.
- **Display:** Show the latest response and its emotion (with curse word censoring) at `/pages/display.html`.
- **Notifications:** Get notified of new responses as they arrive.
- **Artists/Display/Virtual Reality:** Navigate to other sections as needed.
- **Sign In/Sign Up:** (Optional) For user authentication if implemented.

### Customization
- To change artwork names, update both the Google Form options and the code's artwork mappings.
- To adjust emotion classification, edit the Netlify Function prompt and allowed values.
- To add more curse words to censor, update the `censorText` function in `display.html`.

## Project Structure
```
ggi-dashboard/
├── assets/                # Images, CSS, JS libraries
├── pages/
│   ├── dashboard.html     # Main dashboard
│   ├── display.html       # Public display page
│   ├── notifications.html # Notifications page
│   ├── artists.html       # Artists info
│   └── ...                # Other pages
├── netlify/
│   └── functions/
│       └── classify-emotion.js # Netlify Function for emotion classification
├── README.md
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---
**Contact:**  
For questions or support, please open an issue or contact [shrestha1@kenyon.edu].

## Accessing the Dashboard

Once deployed, you can view the main dashboard by visiting:

```
https://silly-pastelito-f0b914.netlify.app/pages/dashboard.html
```


