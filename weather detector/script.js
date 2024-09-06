// Function to handle keypress and trigger weather detection on "Enter"
function handleKeyPress(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}

// Function to fetch weather data
async function getWeather() {
    const location = document.getElementById("location").value;
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = "Loading...";

    // Get latitude and longitude of the city using Open-Meteo API or any other geocoding service
    const geocodingApi = `https://geocoding-api.open-meteo.com/v1/search?name=${location}`;
    
    try {
        const geoResponse = await fetch(geocodingApi);
        const geoData = await geoResponse.json();
        
        if (geoData.results && geoData.results.length > 0) {
            const { latitude, longitude } = geoData.results[0];

            // Fetch weather data using Open-Meteo API
            const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const weatherResponse = await fetch(weatherApi);
            const weatherData = await weatherResponse.json();

            const { temperature, windspeed, weathercode } = weatherData.current_weather;
            weatherResult.innerHTML = `
                <h2>Weather in ${location}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windspeed} km/h</p>
                <p>Weather Code: ${weathercode}</p>
            `;
        } else {
            weatherResult.innerHTML = "Location not found. Please try another city.";
        }
    } catch (error) {
        weatherResult.innerHTML = "An error occurred. Please try again.";
        console.error(error);
    }
}
