const host = "localhost";
const port = "8080";

document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.getElementById('city').value;
  await fetchWeather(city);
  changeBackgroundImage(city);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`http://${host}:${port}/api/weather?city=${city}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error(error);
    document.getElementById('weatherContainer').innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.style.display = "block";
  weatherContainer.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Condition: ${data.weather[0].description}</p>
  `;
}

function changeBackgroundImage(city) {
  const body = document.body;
  switch (city.toLowerCase()) {
    case 'london':
      body.style.backgroundImage = "url('images/london.jpg')";
      break;
    case 'wylie':
      body.style.backgroundImage = "url('images/wylie.jpg')";
      break;
    case 'addis ababa':
      body.style.backgroundImage = "url('images/addis_ababa.jpg')";
      break;
    default:
      body.style.backgroundImage = "url('images/default.jpg')";
      break;
  }
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
}
