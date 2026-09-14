async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        // Find the city
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found");
        }

        const location = locationData.results[0];

        // Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current.temperature_2m;
        const humidity = weatherData.current.relative_humidity_2m;
        const code = weatherData.current.weather_code;

        let condition;
        let icon;

        if (code === 0) {
            condition = "Sunny";
            icon = "☀️";
        } else if (code >= 1 && code <= 3) {
            condition = "Cloudy";
            icon = "☁️";
        } else if (code >= 51 && code <= 99) {
            condition = "Rainy";
            icon = "🌧️";
        } else {
            condition = "Weather condition";
            icon = "🌤️";
        }

        result.innerHTML = `
            <h2>${location.name}</h2>
            <h1>${icon}</h1>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Condition: ${condition}</p>
        `;

    } catch (error) {
        result.innerHTML = "City not found. Please try again.";
    }
}
