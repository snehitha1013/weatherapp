const API_KEY = "8dd4d7bd8ad0458398b164642250104 "; // Replace with your key // Replace with your actual WeatherAPI key

async function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");

    const city = cityInput.value.trim();
    if (city === "") {
        weatherInfo.innerHTML = `<p class="error">Please enter a city name.</p>`;
        return;
    }

    weatherInfo.innerHTML = `<p class="loading">⏳ Fetching weather data...</p>`; 

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error. Try again!");

        const data = await response.json();

        if (data.error) {
            weatherInfo.innerHTML = `<p class="error">❌ ${data.error.message}</p>`;
            return;
        }

        // Clear input after fetching
        cityInput.value = "";

        // Display weather information
        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>🌡️ Temperature: ${data.current.temp_c.toFixed(1)}°C</p>
                <p>💧 Humidity: ${data.current.humidity}%</p>
                <p>🌤️ Weather: ${data.current.condition.text}</p>
                <img src="https:${data.current.condition.icon}" alt="Weather Icon">
            </div>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = `<p class="error">⚠️ Failed to fetch weather data.</p>`;
    }
}
