    // air-quality.js

    // Define API key
    const API_KEY = '277b4da00876bc47ddcc1051b24f7843';

    // Function to fetch air quality data for a location
    function fetchAirQuality(location, marker, map, directionsService, directionsRenderer, selectedMode) {
        $.ajax({
        // Construct API URL for air quality data
        url: `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lng}&appid=${API_KEY}`,
            method: 'GET',
            dataType: 'json',
            // Handle successful response
            success: function(data) {
                // Extract air quality information from response
                const airQuality = data.list[0].main.aqi;
                const airQualityText = getAirQualityText(airQuality);
                const emoji = getEmoji(airQuality);
                const airQualityColorClass = getAirQualityColorClass(airQuality);
                const contentString = `<div><span>Air Quality: </span><span class="${airQualityColorClass} air-quality-text">${airQualityText}</span> ${emoji}</div>`;

                // Create info window with air quality information
                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    disableAutoPan: true // Disable auto-panning
                });

                // Event listeners for marker
                marker.addListener('mouseover', () => {
                    infowindow.open(map, marker);
                });

                marker.addListener('mouseout', () => {
                    infowindow.close();
                });

                marker.addListener('click', () => {
                    selectedLocation = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() }; // Store the selected location from marker
                    distance(directionsService, directionsRenderer, map, selectedMode, selectedLocation); // Calculate and display directions
                });
                
            },
            // Handle error response
            error: function(xhr, status, error) {
                console.error('Error fetching air quality data:', error);
            }
        });
    }


    // Function to get air quality text based on AQI value
    function getAirQualityText(aqi) {
        if (aqi == 1) return 'Good';
        if (aqi == 2) return 'Fair';
        if (aqi == 3) return 'Moderate';
        if (aqi == 4) return 'Poor';
        if (aqi == 5) return 'Very Poor';
        return 'Unknown';
    }

    // Function to get emoji based on AQI value
    function getEmoji(aqi) {
        if (aqi == 1) return '😊'; // Good
        if (aqi == 2) return '😐'; // Fair
        if (aqi == 3) return '😕'; // Moderate
        if (aqi == 4) return '😞'; // Poor
        if (aqi == 5) return '😷'; // Very Poor
        return '❓'; // Unknown
    }

    // Function to get CSS class for air quality based on AQI value
    function getAirQualityColorClass(aqi) {
        if (aqi == 1) return 'air-quality-good'; 
        if (aqi == 2) return 'air-quality-fair'; 
        if (aqi == 3) return 'air-quality-moderate'; 
        if (aqi == 4) return 'air-quality-poor'; 
        if (aqi == 5) return 'air-quality-very-poor'; 
        return ''; // Unknown
    }
