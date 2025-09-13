function add(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function subtract(v1, v2) {
  return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function scale(v, scalar) {
  return { x: v.x * scalar, y: v.y * scalar };
}

function magnitude(v) {
  return Math.hypot(v.x, v.y);
}

function normalize(v) {
  const mag = magnitude(v);
  return scale(v, 1 / mag);
}

function perpendicular(v) {
  return { x: -v.y, y: v.x };
}
