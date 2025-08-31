let initialApparentRadii = null;

function estimateDistancesToBalls(rgbCounts) {
  const apparentRadii = rgbCounts.map((area) => Math.sqrt(area));

  if (!initialApparentRadii) {
    initialApparentRadii = apparentRadii;
  }

  const distancesToBalls = [];

  for (let i = 0; i < apparentRadii.length; i++) {
    const ratio = initialApparentRadii[i] / apparentRadii[i];
    distancesToBalls[i] = INITIAL_DISTANCES_TO_BALLS[i] * ratio;
  }
  return distancesToBalls;
}

function estimateCameraPosition(distancesToBalls) {
  const a = DISTANCE_BETWEEN_BALLS;
  const b = distancesToBalls[2]; // blue ball
  const c = distancesToBalls[1]; // green ball
  const x = (b ** 2 - a ** 2 - c ** 2) / (2 * a); //x coordinate of the camera (intersection of green & blue circles)
  const z = Math.sqrt(c ** 2 - x ** 2); //z coordinate of the camera
  const xOffset = a / 2;
  return { x: x + xOffset, z };
}
