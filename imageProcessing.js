function segmentImage(imgData, threshold = 80) {
  const { width, height, data } = imgData;
  const ctx = segmentationCanvas.getContext("2d");

  const outputData = ctx.createImageData(width, height);
  const rgbCounts = [0, 0, 0];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const diffR = r - (g + b) / 2;
    const diffG = g - (r + b) / 2;
    const diffB = b - (r + g) / 2;

    const newR = diffR > threshold ? 255 : 0;
    const newG = diffG > threshold ? 255 : 0;
    const newB = diffB > threshold ? 255 : 0;

    rgbCounts[0] += newR / 255;
    rgbCounts[1] += newG / 255;
    rgbCounts[2] += newB / 255;

    if (colorMode === "default")
      outputData.data.set([newR, newG, newB, 255], i);
    if (colorMode === "red") outputData.data.set([newR, newR, newR, 255], i);
    if (colorMode === "green") outputData.data.set([newG, newG, newG, 255], i);
    if (colorMode === "blue") outputData.data.set([newB, newB, newB, 255], i);
  }
  ctx.putImageData(outputData, 0, 0);
  return rgbCounts;
}
