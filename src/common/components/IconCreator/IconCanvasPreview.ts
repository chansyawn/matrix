import { PixelCrop } from 'react-image-crop';

const TO_RADIANS = Math.PI / 180;

export const canvasImagePreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  ctx.save();

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);

  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  ctx.restore();
};

export const canvasTextPreview = (
  canvas: HTMLCanvasElement,
  text: string,
  backgroundColor: string,
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  ctx.save();

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '1px sans-serif';
  const fontSize = Math.min(
    256,
    (canvas.width - 128) / ctx.measureText(text).width,
  );

  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.fillStyle = getBrightness(backgroundColor) > 200 ? '#000' : '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 - fontSize / 2);

  ctx.restore();
};

// 获取 rgb 颜色的亮度
const getBrightness = (hex: string) => {
  const rgb = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!rgb) return 0;
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
