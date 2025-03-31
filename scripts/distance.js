// distance.js

// Variable to store the selected location
let selectedLocation = null;

// Function to calculate distance and directions
function distance(directionsService, directionsRenderer, map, travelMode, clickedLocation) {
    // Living Planet HQ coordinates
    const livingPlanetHQ = { lat: 54.976634, lng:-1.60745 };
    console.log("Received travel mode:", travelMode); // Debugging

    // Calculate distance using Distance Matrix Service
    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
        {
            // Set origins and destinations for distance calculation
            origins: clickedLocation ? [{ lat: clickedLocation.lat, lng: clickedLocation.lng }] : [],
            destinations: [{ lat: livingPlanetHQ.lat, lng: livingPlanetHQ.lng }],
            travelMode: travelMode,
        },
        (response, status) => {
            if (status === 'OK') {
                const distanceText = response.rows[0].elements[0].distance.text;
                const durationText = response.rows[0].elements[0].duration.text;

                // Show distance and duration to the user
                $('#distance-info').html(`
                <div style="padding: 10px; margin-bottom: 10px;">
                    <p style="font-weight: bold; color: #26a785;">Distance to Living Planet HQ:</p>
                    <p style="margin-bottom: 5px;">${distanceText}</p>
                    <p style="font-weight: bold; color: #26a785;">Estimated Duration:</p>
                    <p>${durationText}</p>
                </div>
            `);

                if (clickedLocation) {
                    // Get directions using Directions Service
                    directionsService.route(
                        {
                            origin: new google.maps.LatLng(clickedLocation.lat, clickedLocation.lng),
                            destination: new google.maps.LatLng(livingPlanetHQ.lat, livingPlanetHQ.lng),
                            travelMode: travelMode,
                        },
                        (result, status) => {
                            if (status === 'OK') {
                                // Handle successful directions retrieval
                                directionsRenderer.setDirections(result);
                                $('#directions-panel').css('display', 'block'); // Display the directions panel
                            }
                        }
                    );
                }
            } 
        }
    );
};