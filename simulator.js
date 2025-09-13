const renderer = new THREE.WebGLRenderer({
  canvas: simulationCanvas,
  antialias: true,
});

const scene = new THREE.Scene();

BALLS.forEach((ball) => {
  const geometry = new THREE.SphereGeometry(ball.radius, 128, 128);
  const material = new THREE.MeshBasicMaterial({
    color: ball.color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(ball);
  scene.add(mesh);
});

const aspectRatio = simulationCanvas.width / simulationCanvas.height;

const camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspectRatio);
camera.position.copy(INITIAL_CAMERA_POSITION);

const path = generateCirclePath(INITIAL_CAMERA_POSITION);

function updateSimulation() {
  const trueCameraPosition = path.shift();
  camera.position.copy(trueCameraPosition);
  camera.lookAt(0, PEN_HEIGHT, 0);
  renderer.render(scene, camera);
  return trueCameraPosition;
}

function getSimulationImageData() {
  const { width, height } = simulationCanvas;
  const pixels = new Uint8ClampedArray(width * height * 4);
  const gl = simulationCanvas.getContext("webgl");
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  //fix vertical flip
  for (let y = 0; y < height / 2; y++) {
    for (let x = 0; x < width; x++) {
      for (let i = 0; i < 3; i++) {
        const topIndex = (y * width + x) * 4 + i;
        const bottomY = height - y - 1;
        const bottomIndex = (bottomY * width + x) * 4 + i;
        const aux = pixels[topIndex];
        pixels[topIndex] = pixels[bottomIndex];
        pixels[bottomIndex] = aux;
      }
    }
  }

  const imgData = new ImageData(pixels, width, height);
  return imgData;
}

function generateCirclePath(start, radius = 10, pointCount = 100) {
  const points = [];
  const center = { x: start.x, y: start.y, z: start.z + radius };
  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2 - Math.PI / 2;
    const x = center.x + radius * Math.cos(angle);
    const z = center.z + radius * Math.sin(angle);
    const y = center.y;
    points.push({ x, y, z });
  }
  return points;
}
