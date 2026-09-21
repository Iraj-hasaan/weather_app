const API_KEY = "YOUR_API_KEY";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    const weatherResult = document.getElementById("weatherResult");
    const errorMessage = document.getElementById("errorMessage");

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        weatherResult.style.display = "none";
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `Humidity: ${data.main.humidity}%`;

        const condition =
            data.weather[0].main.toLowerCase();

        let icon = "🌤️";

        if (condition.includes("clear")) {
            icon = "☀️";
        } 
        else if (condition.includes("cloud")) {
            icon = "☁️";
        } 
        else if (
            condition.includes("rain") ||
            condition.includes("drizzle")
        ) {
            icon = "🌧️";
        } 
        else if (condition.includes("thunderstorm")) {
            icon = "⛈️";
        } 
        else if (condition.includes("snow")) {
            icon = "❄️";
        }

        document.getElementById("weatherIcon").textContent = icon;

        weatherResult.style.display = "block";
        errorMessage.textContent = "";

    } catch (error) {

        weatherResult.style.display = "none";

        errorMessage.textContent =
            "City not found. Please enter a valid city name.";
    }
}
