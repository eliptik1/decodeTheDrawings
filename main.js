const cameraPositions = [];

fileInput.onchange = function (event) {
  const file = event.target.files[0];
  inputVideo.src = URL.createObjectURL(file);
  inputVideo.play();
};
inputVideo.onloadeddata = function () {
  inputCanvas.width = inputVideo.videoWidth;
  inputCanvas.height = inputVideo.videoHeight;
  segmentationCanvas.width = inputVideo.videoWidth;
  segmentationCanvas.height = inputVideo.videoHeight;
  loop();
};

let colorMode = "default";

defaultMode.onclick = function () {
  colorMode = "default";
};
red.onclick = function () {
  colorMode = "red";
};
green.onclick = function () {
  colorMode = "green";
};
blue.onclick = function () {
  colorMode = "blue";
};

function loop() {
  const { width, height } = inputCanvas;
  const ctx = inputCanvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(inputVideo, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);

  const rgbCounts = segmentImage(imageData);

  const distancesToBalls = estimateDistancesToBalls(rgbCounts);

  const cameraPosition = estimateCameraPosition(distancesToBalls);

  cameraPositions.push(cameraPosition);

  drawOutput(distancesToBalls, cameraPositions);

  requestAnimationFrame(loop);
}
