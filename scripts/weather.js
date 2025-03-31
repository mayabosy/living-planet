// weather.js

// Define a function to fetch weather data from the API
function fetchWeatherData(lat, lng) {
    // Define API key
    const API_KEY = 'd264769b62abfe935fcfb618495b440c';

    // Construct API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

    // Fetch weather data from the API
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant weather information
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            const city = data.name; 

            // Return weather data
            return { temperature, description, icon, windSpeed, city, humidity };
        })
        .catch(error => {
            // Log error if fetching weather data fails
            console.error('Error fetching weather data:', error);
            return null;
        });
}

// Function to update the weather display on the homepage
function updateWeatherDisplay(weatherData) {
    if (!weatherData) {
        // Handle case when weather data is not available
        console.error('Weather data is not available.');
        return;
    }
    // Round temperature to nearest whole number
    const temperature = Math.round(weatherData.temperature);

    // Get today's date and hour
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    // Update HTML elements with weather information
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = weatherData.description;
    document.getElementById('wind-speed').textContent = `${weatherData.windSpeed} m/s`;
    document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
    document.getElementById('date').textContent = `${date}`;
    document.getElementById('hour').textContent = `${time}`;
    document.getElementById('weather-city').textContent = weatherData.city; // Set city name


    // Set weather icon
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.icon}.png`);
    weatherIcon.setAttribute('alt', weatherData.description);
}

// Define a function to update weather based on location
function updateWeatherByLocation(lat, lng) {
    // Fetch weather data based on provided latitude and longitude
    fetchWeatherData(lat, lng)
        .then(weatherData => {
            // Update weather display with the fetched data
            updateWeatherDisplay(weatherData);
        });
}

// Default display: Living Planet HQ weather
const defaultLatitude = 54.9733;
const defaultLongitude = -1.6145;
updateWeatherByLocation(defaultLatitude, defaultLongitude);

// Event listener for location selection on the map
document.addEventListener('locationSelected', event => {
    const { lat, lng } = event.detail;
    // Update weather based on the selected location
    updateWeatherByLocation(lat, lng);
});
