let inputType = null;

videoButton.onclick = function () {
  fileInput.click();
};

fileInput.onchange = function (event) {
  const file = event.target.files[0];
  inputVideo.src = URL.createObjectURL(file);
  inputVideo.play();
};
inputVideo.onloadeddata = function () {
  inputType = "video";
  videoCanvas.width = inputVideo.videoWidth;
  videoCanvas.height = inputVideo.videoHeight;
  segmentationCanvas.width = inputVideo.videoWidth;
  segmentationCanvas.height = inputVideo.videoHeight;
  simulationCanvas.style.display = "none";
  mainInterface.style.display = "flex";
  startPanel.style.display = "none";
  loop();
};

simulationButton.onclick = function () {
  inputType = "simulation";
  segmentationCanvas.width = simulationCanvas.width;
  segmentationCanvas.height = simulationCanvas.height;
  videoCanvas.style.display = "none";
  mainInterface.style.display = "flex";
  startPanel.style.display = "none";
  loop();
};

function getInputImageData() {
  let imgData = null;
  if (inputType == "simulation") {
    updateSimulation();
    imgData = getSimulationImageData();
  } else {
    const { width, height } = videoCanvas;
    const ctx = videoCanvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(inputVideo, 0, 0);
    imgData = ctx.getImageData(0, 0, width, height);
  }
  return imgData;
}

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
