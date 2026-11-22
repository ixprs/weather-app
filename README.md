# 🌤️ Weather App

A lightweight and interactive weather application built with **HTML, CSS, and Vanilla JavaScript**. It uses the Open-Meteo API to retrieve real-time weather information for cities around the world.

## ✨ Features

- 🔍 **City Search:** Search for cities around the world.
- 🌡️ **Current Temperature:** Get the current temperature.
- 🤔 **Feels Like:** View the apparent temperature.
- 💨 **Wind Information:** Check wind speed and direction.
- 🌍 **Geolocation Data:** Retrieve city coordinates using the Geocoding API.
- 🕒 **Local Time:** Display the local time of the selected city.
- 🌦️ **Weather Conditions:** Convert weather codes into readable descriptions.
- 🎨 **Dynamic Animations:** Visual effects for rain, snow, fog, clouds, the sun, and the moon.
- ⏳ **Loading Indicator:** Visual feedback while fetching weather data.
- ⚠️ **Error Handling:** Basic handling of invalid city names and request errors.
- 👤 **About Section:** Personal introduction and social media links.

## 🛠️ Technologies

| Technology               | Purpose                               |
| ------------------------ | ------------------------------------- |
| HTML5                    | Application structure                 |
| CSS3                     | Styling and animations                |
| JavaScript (ES6+)        | Application logic and API integration |
| Open-Meteo API           | Weather data                          |
| Open-Meteo Geocoding API | City search and coordinates           |

## 🌐 APIs

This project uses two free APIs provided by Open-Meteo.

**1. Geocoding API**

Used to convert city names into geographic coordinates.

Endpoint:

```text
https://geocoding-api.open-meteo.com/v1/search
```

**2. Weather Forecast API**

Used to retrieve current weather information.

Endpoint:

```text
https://api.open-meteo.com/v1/forecast
```

The application retrieves the following data:

- Temperature
- Apparent Temperature
- Relative Humidity
- Weather Code
- Wind Speed
- Wind Direction
- Local Time
- Day/Night Status

**No API key is required.**

API Documentation: [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)

## 📁 Project Structure

```text
weather-app/
│
├── index.html
├── Weather.css
├── Weather.js
├── images/
├── icons/
├── screenshots/
└── README.md
```

## 🚀 Getting Started

You can run this project locally without installing any additional dependencies.

**1. Clone the repository**

```bash
git clone https://github.com/ixprs/weather-app.git
```

**2. Navigate to the project directory**

```bash
cd weather-app
```

**3. Run the application**

Open `index.html` in your browser.

For a better development experience, you can use the Live Server extension in Visual Studio Code.

## 🖥️ Live Demo

[**View Live Demo**]

## 👨‍💻 Author

**Parsa ix**

Computer Engineering Student | Software Development & Cybersecurity Enthusiast

- GitHub: [@ixprs](https://github.com/ixprs)
- Instagram: [@ix.prs](https://instagram.com/ix.prs)
- Telegram: [@ixprs](https://t.me/ixprs)

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you find this project useful, consider giving it a star!
