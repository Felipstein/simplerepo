import { RgbaColor } from 'react-colorful';

/**
 * Access http://www.w3.org/TR/AERT#color-contrast for more info
 */
export function darkContrast({ r, g, b, a }: RgbaColor) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return !(brightness > 128 || a < 0.5);
}

export function hexToRgba(hex: string) {
  const hexWithoutHash = hex.replace(/^#/, '');

  let r: number;
  let g: number;
  let b: number;
  let a: number;

  if (hexWithoutHash.length === 3) {
    r = parseInt(hexWithoutHash[0] + hexWithoutHash[0], 16);
    g = parseInt(hexWithoutHash[1] + hexWithoutHash[1], 16);
    b = parseInt(hexWithoutHash[2] + hexWithoutHash[2], 16);
    a = 1;
  } else if (hexWithoutHash.length === 6) {
    r = parseInt(hexWithoutHash.slice(0, 2), 16);
    g = parseInt(hexWithoutHash.slice(2, 4), 16);
    b = parseInt(hexWithoutHash.slice(4, 6), 16);
    a = 1;
  } else if (hexWithoutHash.length === 8) {
    r = parseInt(hexWithoutHash.slice(0, 2), 16);
    g = parseInt(hexWithoutHash.slice(2, 4), 16);
    b = parseInt(hexWithoutHash.slice(4, 6), 16);
    a = parseInt(hexWithoutHash.slice(6, 8), 16) / 255;
  } else {
    throw new Error('Invalid hex color');
  }

  return { r, g, b, a };
}
