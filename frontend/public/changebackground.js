
export function invertColorOfElementAgainstBg(htmlElement) {
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

export function getElementSurroundingPoint(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + (rect.width / 2),
    y: rect.top + (rect.height * 0.25),
  };
}

export function viewportToCanvas(canvas, x, y) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (x - rect.left) * (canvas.width / rect.width),
    y: (y - rect.top) * (canvas.height / rect.height)
  };
}
