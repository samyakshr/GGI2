# The Gund Gallery Immersion

## Overview

**GGI Dashboard** is a web-based analytics and engagement platform designed for The Gund Gallery. It visualizes and analyzes visitor responses to various artworks, providing real-time insights into visitor emotions, artwork popularity, and engagement trends. The dashboard is powered by data collected from a Google Form, stored in a Google Sheet, and fetched dynamically via the Google Sheets API.

The project features:
- Real-time charts and metrics for artwork popularity and visitor emotions
- A notification system for new responses
- A modal to view all recent responses
- A clean, modern UI built with Material Dashboard 3

## Features

- **Live Data Visualization:** Charts update automatically with new Google Form responses.
- **Emotion Analysis:** Classifies visitor feedback into emotions (happy, sad, nostalgic, bored).
- **Artwork Popularity:** Tracks which artworks resonate most with visitors.
- **Recent Responses:** Displays the latest feedback in a sidebar and a modal.
- **Notifications:** Real-time toast and dropdown notifications for new responses.
- **Responsive Design:** Works on desktop and mobile devices.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (ES6+)
- **UI Framework:** [Material Dashboard 3](https://www.creative-tim.com/product/material-dashboard)
- **Charts:** [Chart.js](https://www.chartjs.org/) and plugins
- **Data Source:** Google Sheets API (connected to a Google Form)
- **Deployment:** Static site (can be served with any HTTP server)

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
- In the code, update the `spreadsheetId` and `apiKey` in the JavaScript section of `pages/dashboard.html` and `pages/notifications.html` to match your Google Sheet and API credentials.
- Make sure your Google Sheet is shared as "Anyone with the link can view" for public API access.

## Usage

- **Dashboard:** View real-time analytics, charts, and recent responses.
- **Notifications:** Get notified of new responses as they arrive.
- **Artists/Display/Virtual Reality:** Navigate to other sections as needed.
- **Sign In/Sign Up:** (Optional) For user authentication if implemented.

### Customization

- To change artwork names, update both the Google Form options and the code's artwork mappings.
- To adjust emotion classification, edit the `classifyEmotion` function in `dashboard.html`.

## Project Structure

```
ggi-dashboard/
├── assets/                # Images, CSS, JS libraries
├── pages/
│   ├── dashboard.html     # Main dashboard
│   ├── notifications.html # Notifications page
│   ├── artists.html       # Artists info
│   ├── display.html       # Display page
│   └── ...                # Other pages
├── README.md
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Contact:**  
For questions or support, please open an issue or contact [your email/contact info].
