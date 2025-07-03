// Get elements
const locationInput = document.getElementById('location');
const getWeatherBtn = document.getElementById('get-weather-btn');
const locationName = document.getElementById('location-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const weatherSection = document.querySelector('.weather-section');

// API endpoint
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'YOUR_API_KEY_HERE';

// Add event listener to get weather button
getWeatherBtn.addEventListener('click', getWeather);

// Function to get weather data
function getWeather() {
  const location = locationInput.value.trim();
  if (location === '') {
    alert('Please enter a location');
    return;
  }

  // Construct API URL
  const apiUrl = `${apiEndpoint}?q=${location}&units=metric&appid=${apiKey}`;

  // Fetch weather data
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        temperature: data.main.temp
      };

      // Update UI
      updateUI(weatherData);
    })
    .catch(error => {
      console.error(error);
      alert('Error fetching weather data');
    });
}

// Function to update UI
function updateUI(weatherData) {
  locationName.textContent = weatherData.location;
  weatherDescription.textContent = weatherData.description;
  temperature.textContent = `${weatherData.temperature}°C`;

  // Add fade-in animation
  weatherSection.classList.add('fade-in');
  setTimeout(() => {
    weatherSection.classList.remove('fade-in');
  }, 500);
}