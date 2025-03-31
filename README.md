# Living Planet

This project presents a web application that visualises real-time environmental data, including weather conditions, air quality, and routing directions. It provides an interactive user interface and integrates multiple third-party APIs to support environmentally aware decision-making.

## Overview

The application provides access to environmental data through a responsive web interface. Key features include:

- Displaying live weather forecasts and air quality data
- Searching and rendering routes between locations using Google Maps
- User login via Google OAuth2
- Hosting on a Microsoft Azure Virtual Machine

## Methodology

- **Technology Stack**: HTML, CSS, JavaScript, jQuery, PHP  
- **Cloud Hosting**: Microsoft Azure VM  
- **External APIs**: OpenWeatherMap, Google Maps

- **System Features**:
  - Real-time weather and air quality data using OpenWeatherMap API
  - Route planning and map display via Google Maps API
  - OAuth-based login system using Google accounts
  - Deployed on an Azure VM with vCPUs and 4 GiB RAM

## File Structure

The project includes HTML, CSS, JavaScript, and PHP components, with JavaScript files separated by responsibility:

- `index.html` – Main interface (weather, air quality, directions)  
- `about.html` – Additional project information  
- `styles/style-connected.css` – Frontend styling  
- `scripts/weather.js` – Retrieves weather data  
- `scripts/air-quality.js` – Retrieves air quality data  
- `scripts/map.js` – Handles Google Maps integration  
- `scripts/distance.js` – Calculates distances and routes  
- `oauth_handler.php` – Initiates Google OAuth2  
- `oauth_callback.php` – Processes OAuth2 responses  
- `oauth_view.php` – Login UI

## Results

The application successfully integrates environmental data and mapping tools to support informed, location-based decision-making. It delivers a seamless experience for viewing weather, checking air quality, and navigating directions.

## Ethical Considerations

- **Data Accuracy**: The system uses reputable public APIs (OpenWeatherMap, Google Maps) for up-to-date environmental data.  
- **User Privacy**: Google OAuth is used for authentication; no user data is stored on the backend.

## Future Work

- Refactor JavaScript into modular components for better maintainability  
- Add user preferences and saved locations  
- Improve API failure handling and visual loading states

## Setup Instructions

To run this project locally, ensure you have the following installed:

- A local web server with **PHP** (e.g. XAMPP, MAMP)
- Internet access for API calls (OpenWeatherMap, Google Maps)

### Steps

1. Clone the repository into your server’s root directory  
2. Open `index.html` via `localhost`  
3. Ensure API keys are set correctly in the JavaScript files

## Acknowledgements

This project was developed as part of the **KF6013 Cloud Computing and Web API Programming** module at Northumbria University, focusing on real-time API integration and cloud-hosted web application deployment.
