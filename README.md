## 🌍 Countries Explorer – REST Countries API App

* A modern Country Explorer Web Application built with Vanilla JavaScript, consuming the REST Countries API.
* This project allows users to browse countries, view detailed information, filter by region, and switch between light and dark modes.

# 🚀 Live Demo
https://countries-aga.vercel.app/

# 🛠 Tech Stack
    - 🧩 HTML5
    - 🎨 CSS3
    - 🌗 Dark / Light Mode
    - ⚡ Vanilla JavaScript (ES6+)
    - 🌍 REST Countries API
    - 📦 Modular JS structure

# 📂 Project Structure
```
Countries/
│
├── index.html
├── detail.html
│
├── app.js
├── detail.js
├── service.js
├── data.js
│
├── style.css
├── dark.css
├── colors.css
├── reset.css
│
└── img/
```

## ✨ Features

# 🌎 Home Page
    - Fetches all countries from API
    - Displays country cards dynamically
    - Shows:
        - Flag
        - Name
        - Population
        - Region
        - Capital

# 🔍 Search Functionality
    - Real-time search by country name
    - Case-insensitive filtering

🌐 Filter by Region
    - Africa
    - Americas
    - Asia
    - Europe
    - Oceania

# 📄 Country Detail Page
    - Dynamic route logic (query-based navigation)
    - Shows detailed country information:
        - Native name
        - Subregion
        - Top-level domain
        - Currencies
        - Languages
        - Border countries

# 🌗 Dark Mode
    - Toggle between light & dark themes
    - CSS class switching
    - UI state persistence

# 🧠 Architecture Overview
* Separation of Concerns
    - service.js → API calls
    - app.js → Home page logic
    - detail.js → Detail page logic
    - data.js → Data handling utilities
    - CSS split into:
        - reset
        - base styles
        - theme styles
* Clean structure and modular logic.

# 🧪 How To Run Locally
* git clone https://github.com/your-username/countries-app.git
    - cd countries-app
    - Then open: index.html
    - No build tools required.

