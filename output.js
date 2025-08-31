function drawOutput(initialDistancesToBalls, path) {
  const ctx = outputCanvas.getContext("2d");
  const { width, height } = outputCanvas;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "black";
  ctx.textBaseline = "top";
  ctx.font = "40px Arial";
  ctx.fillText("Top view", 5, 5);

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(15, 15);
  for (let i = BALLS.length - 1; i >= 1; i--) {
    const { x, z, radius, color } = BALLS[i];
    drawCircle(ctx, x, z, radius, color);

    ctx.lineWidth = 0.1;
    drawCircle(ctx, x, z, initialDistancesToBalls[i], null, color);
  }

  path.forEach(({ x, z }) => drawCircle(ctx, x, z, 0.2, "black"));

  ctx.restore();
}

function drawCircle(ctx, x, y, radius, fillStyle, strokeStyle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  fillStyle && ctx.fill();
  strokeStyle && ctx.stroke();
}
