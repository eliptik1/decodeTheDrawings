const cameraPositions = [];

function loop() {
  const { imgData, trueCameraPosition } = getInputImageData();

  const rgbCounts = segmentImage(imgData);

  const distancesToBalls = estimateDistancesToBalls(rgbCounts);

  const cameraPosition = estimateCameraPosition(distancesToBalls);

  cameraPositions.push(cameraPosition);

  drawOutput(distancesToBalls, cameraPositions, trueCameraPosition);

  requestAnimationFrame(loop);
}
