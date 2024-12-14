const apiKey = 'bd5e378503939ddaee76f12ad7a97608';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherDescription = document.getElementById('weatherDescription');
const errorMessage = document.getElementById('errorMessage');

getWeatherBtn.addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = cityInput.value.trim();

    if (city === '') {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.style.display = 'block';
        weatherInfo.style.display = 'none';
        return;
    }

    errorMessage.style.display = 'none';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                errorMessage.textContent = 'City not found. Please try again.';
                errorMessage.style.display = 'block';
                weatherInfo.style.display = 'none';
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            errorMessage.textContent = 'Error fetching weather data. Please try again later.';
            errorMessage.style.display = 'block';
            weatherInfo.style.display = 'none';
        });
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDescription.textContent = `Condition: ${data.weather[0].description}`;

    weatherInfo.style.display = 'block';
}
