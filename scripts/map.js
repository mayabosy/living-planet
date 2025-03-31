// map.js

// Function called when Google Maps API is initialized
window.initMap = function () {

    // Define map options
    let mapOptions = {
        center: new google.maps.LatLng(54.977775, -1.6145),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Create map object
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Initialize DirectionsService and DirectionsRenderer
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('directions-panel'),
        polylineOptions: {
            strokeColor: 'green'
        }
    });

    // Set initial mode to walking
    let selectedMode = 'WALKING';

    // Function to update button styles based on selected mode
    function updateButtonStyles() {
        $('.mode-btn').removeClass('selected'); // Remove selected class from all buttons
        $(`#${selectedMode.toLowerCase()}-btn`).addClass('selected'); // Add selected class to the button corresponding to the selected mode
    }

    // Custom icon for the Living Planet Headquarters
    const customIcon = {
        url: 'images/planet-earth.png',
        scaledSize: new google.maps.Size(35, 35),

    };
    // Marker for the Living Planet Headquarters 
    const livingPlanetMarker = new google.maps.Marker({
        position: new google.maps.LatLng(54.976634, -1.60745),
        map: map,
        title: 'Living Planet Headquarters',
        icon: customIcon
    });

    // Click event listener to the map to calculate route from clicked location
    map.addListener('click', (event) => {
        const clickedLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        distance(directionsService, directionsRenderer, map, selectedMode, clickedLocation);
    });

    // Define event listeners for mode buttons
    $('#public-transport-btn').on('click', function () {
        selectedMode = 'TRANSIT';
        distance(directionsService, directionsRenderer, map, selectedMode, selectedLocation); // Pass selectedLocation
        updateButtonStyles();
    });

    $('#walking-btn').on('click', function () {
        selectedMode = 'WALKING';
        distance(directionsService, directionsRenderer, map, selectedMode, selectedLocation); // Pass selectedLocation
        updateButtonStyles();
    });

    $('#driving-btn').on('click', function () {
        selectedMode = 'DRIVING';
        distance(directionsService, directionsRenderer, map, selectedMode, selectedLocation); // Pass selectedLocation
        updateButtonStyles();
    });

    // Fetch coordinates for each city using Geocoding API
    const cities = [
        // Array of cities
        'London',
        'Manchester',
        'Birmingham',
        'Newcastle upon Tyne',
        'Leeds',
        'Sheffield',
        'Liverpool',
        'Bradford',
        'Sunderland',
        'York',
        'Durham',
        'Hull',
        'Doncaster',
        'Middlesbrough',
        'Darlington',
        'Harrogate',
        'Scarborough',
        'Whitby',
        'Berwick-upon-Tweed',
        'Edinburgh',
        'Glasgow',
        'Aberdeen',
        'Dundee',
        'Inverness',
        'Stirling',
        'Perth',
        'Newport',
        'Cardiff',
        'Swansea',
        'Bristol',
        'Plymouth',
        'Exeter',
        'Southampton',
        'Portsmouth',
        'Brighton',
        'Norwich',
        'Cambridge',
        'Oxford',
        'Reading',
        'Bath',
        'York',
        'Belfast',
        'Lisburn',
        'North Sields',
        'Cork',
        'Dublin',
        'Whitley Bay',
        'Blyth',
        'Seaham',
        'Gateshead',
        'Blaydon',
    ];
    // Loop through each location
    cities.forEach(cityName => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: cityName }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                const marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: cityName,
                    icon: {
                        url: 'images/pin.png',
                        scaledSize: new google.maps.Size(35, 35),
                    }
                });

                // Fetch air quality data for each location
                fetchAirQuality({ lat: location.lat(), lng: location.lng() }, marker, map, directionsService, directionsRenderer); // Pass directionsRenderer as a parameter

                // Add click event listener to the marker to dispatch locationSelected event and calculate directions
                marker.addListener('click', () => {
                    const clickedLocation = { lat: location.lat(), lng: location.lng() };
                    document.dispatchEvent(new CustomEvent('locationSelected', { detail: clickedLocation }));
                    selectedLocation = clickedLocation; // Update selectedLocation
                    distance(directionsService, directionsRenderer, map, selectedMode, clickedLocation);
                });
            } else {
                console.error('Geocode was not successful for the following reason:', status);
            }
        });
    });

    // Loop through each location
    cities.forEach(city => {
        const marker = new google.maps.Marker({
            position: { lat: city.lat, lng: city.lng },
            map: map,
            title: city.name
        });

        // Fetch air quality data for each location
        fetchAirQuality(city, marker, map, directionsService, directionsRenderer, selectedMode); // Pass directionsRenderer as a parameter

        // Add click event listener to the marker to dispatch locationSelected event and calculate directions
        marker.addListener('click', () => {
            console.log('Marker clicked:', city.name); // Check if the marker click event listener is triggered
            const clickedLocation = { lat: city.lat, lng: city.lng };
            console.log('Clicked location:', clickedLocation); // Check if the clicked location is correct
            document.dispatchEvent(new CustomEvent('locationSelected', { detail: clickedLocation }));
            selectedLocation = clickedLocation; // Update selectedLocation
            console.log('Selected location:', selectedLocation); // Check if selectedLocation is updated correctly
            distance(directionsService, directionsRenderer, map, selectedMode, clickedLocation);
        });
    });


    // Event listener for locationSelected
    document.addEventListener('locationSelected', (e) => {
        selectedLocation = e.detail;
        distance(directionsService, directionsRenderer, map, selectedMode, selectedLocation); // Pass selectedMode and selectedLocation
    });


    updateButtonStyles(); // Update button styles based on initial mode

};
