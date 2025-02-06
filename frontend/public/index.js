import { env } from './env.js';

const host = env.host;
const port = env.port;
const pexelsAPI = env.pexelsAPI;

document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const queryToPexels = await fetchWeather(city);
  await changeVideoSource(queryToPexels.weather[0].description);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`http://${host}:${port}/api/weather?city=${city}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    displayWeather(data);
    return data;
  } catch (error) {
    document.getElementById('weatherContainer').innerHTML = `<p>${error.message}</p>`;
    return {error: 'error'};
  }
}

function displayWeather(data) {
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.style.display = 'block';
  weatherContainer.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Condition: ${data.weather[0].description}</p>
  `;
}

async function changeVideoSource(query) {
  let backgroundVideoElement = document.getElementById('video-container');
  let videoSource = document.getElementById('background-video-source');

  let pexelResponse = await fetch(
    `https://api.pexels.com/videos/search?query=${query}&per_page=1`, // Maybe take the last string of 'query' only
    {
      method: 'GET',
      headers: {'Authorization': `${pexelsAPI}`}
    });
  let pexelResponseJson = await pexelResponse.json();
  let pexelVideo = pexelResponseJson.videos[0].video_files[2].link; // TODO: The second array number (choices 0 to 6) signals the resolution of the video. Make it variable?
                                                                    // TODO: The first array number signals a different picture everytime it's changed; the bigger the number, the less relevancy to the query

  videoSource.setAttribute('src', `${pexelVideo}`);
  videoSource.setAttribute('type', 'video/mp4');

  backgroundVideoElement.load()
  backgroundVideoElement.play()
}
