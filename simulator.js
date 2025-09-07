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

renderer.render(scene, camera);
