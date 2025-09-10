Here’s a polished **README** for your Nimbus Weather & News App, incorporating the **task description** and your **project structure** from the image:

---

# Nimbus - Weather & News Aggregator App

Nimbus is a **React Native** and **TypeScript** app that aggregates weather information and news headlines, with a unique logic to filter news based on the current weather. This project was built as part of an assessment task for i2Global.

---

## Table of Contents

* [Features](#features)
* [Screens](#screens)
* [Technical Specifications](#technical-specifications)
* [Project Structure](#project-structure)
* [Setup](#setup)
* [APIs Used](#apis-used)
* [Screenshots](#screenshots)

---

## Features

### Weather Information

* Fetches current weather data based on the user's location.
* Displays temperature, weather conditions, and a 5-day forecast.
* Supports temperature units selection (Celsius/Fahrenheit).

### News Headlines

* Fetches latest news headlines using a public news API.
* Displays headline, description, and links to full articles.

### Weather-Based News Filtering

* Filters news based on current weather conditions:

  * **Cold weather:** Shows news related to depressing topics.
  * **Hot weather:** Shows news related to fear.
  * **Cool weather:** Shows news about winning and happiness.

### Settings

* Allows users to manage their preferences:

  * Temperature unit selection.
  * Preferred news categories.

---

## Screens

1. **Home Screen**
   Displays weather information and filtered news headlines.

2. **Settings Screen**
   Allows users to select units and preferred news categories.

---

## Technical Specifications

* **Framework:** React Native
* **Language:** TypeScript
* **State Management:** Provider (via React Context)
* **APIs:**

  * OpenWeatherMap API for weather data
  * NewsAPI for news headlines
* **Responsive Design:** Supports multiple device screen sizes
* **File Handling & Assets:** Includes images and fonts for proper UI rendering.

---

## Project Structure

```
NIMBUS_BASE
│
├─ .expo
├─ .vscode
├─ android
├─ app
│  ├─ (tabs)
│  │  ├─ _layout.tsx
│  │  ├─ index.tsx
│  │  ├─ two.tsx
│  │  ├─ layout.tsx
│  │  ├─ +html.tsx
│  │  ├─ +not-found.tsx
│  │  └─ locationPermission.tsx
│
├─ assets
│  ├─ fonts
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ splash-icon-dark.png
│     └─ splash-icon.png
│
├─ components
├─ constants
├─ context
│  ├─ LocationContext.tsx
│  └─ SettingsContext.tsx
│
├─ node_modules
├─ services
│  ├─ newsService.ts
│  └─ weatherService.ts
│
├─ types
│  ├─ news.ts
│  └─ weather.ts
│
├─ .gitignore
├─ app.json
├─ expo-env.d.ts
├─ package.json
├─ package-lock.json
└─ tsconfig.json
```

---

## Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd NIMBUS_BASE
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the app:

```bash
npx expo start
```

4. Allow location permissions for fetching weather data.

---

## APIs Used

* **OpenWeatherMap API**: Provides current weather and 5-day forecast.
* **NewsAPI**: Fetches latest news headlines.
* News is filtered based on weather conditions using custom logic.

---

## Screenshots

*(Add screenshots of your app here, showing Home Screen, Settings Screen, and any unique UI elements.)*

---

## Notes

* The app uses React Context for state management (`SettingsContext` and `LocationContext`).
* Weather unit selection and news preferences are saved in context for a seamless experience.
* Designed to be modular and easily extendable with more settings or additional news sources.

---
