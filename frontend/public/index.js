import { env } from './env.js';

const host = env.host;
const port = env.port;
const pexelsAPI = env.pexelsAPI;

document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const queryToPexels = await fetchWeather(city);
  try {
    await changeVideoSource(queryToPexels.weather[0].description);
  } catch (error) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.style.display = 'block';
    document.getElementById('weatherContainer').innerHTML = `<p>${city} not found as a city.</p>`;
  }
});

// Let Header font have dynamic colors
setInterval(() => {
  let header = document.querySelector("header");
  invertColorOfElementAgainstBg(header);
}, 200);

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
    return { error: 'error' };
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
      headers: { 'Authorization': `${pexelsAPI}` }
    });
  let pexelResponseJson = await pexelResponse.json();
  let pexelVideo = pexelResponseJson.videos[0].video_files[2].link; // TODO: The second array number (choices 0 to 6) signals the resolution of the video. Make it variable?
                                                                    // TODO: The first array number signals a different picture everytime it's changed; the bigger the number, the less relevancy to the query

  videoSource.setAttribute('src', `${pexelVideo}`);
  videoSource.setAttribute('type', 'video/mp4');

  backgroundVideoElement.load()
  backgroundVideoElement.play()
}

function invertColorOfElementAgainstBg(htmlElement) {
  const point = getElementSurroundingPoint(htmlElement);
  const video = document.getElementById("video-container");
  const videoCaptureCanvas = document.getElementById("video-capture-canvas");

  const ctx = videoCaptureCanvas.getContext("2d", { willReadFrequently: true });

  videoCaptureCanvas.width = video.videoWidth;
  videoCaptureCanvas.height = video.videoHeight;

  // Copy the video frame to the videoCanvas to extract colors at point
  ctx.drawImage(video, 0, 0, videoCaptureCanvas.width, videoCaptureCanvas.height, 0, 0, videoCaptureCanvas.width, videoCaptureCanvas.height);

  try {
    const { x, y } = viewportToCanvas(videoCaptureCanvas, point.x, point.y);
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    const invertedColor = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;

    if (htmlElement) {
      htmlElement.style.color = invertedColor;
    }

  } catch (err) {
    console.log("Error: ", err);
  }
}

function getElementSurroundingPoint(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + (rect.width / 2),
    y: rect.top + (rect.height * 0.25),
  };
}

function viewportToCanvas(canvas, x, y) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (x - rect.left) * (canvas.width / rect.width),
    y: (y - rect.top) * (canvas.height / rect.height)
  };
}
