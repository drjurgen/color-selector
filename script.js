"use strict";

document.querySelector("input").addEventListener("input", getHexColor);
const displayHexValue = document.querySelector(".color-container:nth-child(3) p");
const displayRGBValue = document.querySelector(".color-container:nth-child(3) p + p");
const displayHSLValue = document.querySelector(".color-container:nth-child(3) p + p + p");

function getHexColor() {
  const selectedHexColor = this.value;
  showSelectedColor(selectedHexColor);
}

function showSelectedColor(hexColor) {
  const rgb = hexToRGB(hexColor);
  const hsl = rgbToHsl(rgb);
  const cssRGB = rgbToCSS(rgb);

  console.log("hex", hexColor);
  console.log("rgb", rgb);
  console.log("hsl", hsl);
  console.log("css-rgb", cssRGB);
  console.log("\n");

  showRGB(rgb, cssRGB);
  showHex(hexColor);
  showHSL(hsl);
}

function hexToRGB(hexColor) {
  const red = Number.parseInt(hexColor.substring(1, 3), 16);
  const green = Number.parseInt(hexColor.substring(3, 5), 16);
  const blue = Number.parseInt(hexColor.substring(5, 7), 16);

  return { red, green, blue };
}

function rgbToHsl(rgb) {
  let r = rgb.red;
  let g = rgb.green;
  let b = rgb.blue;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = h.toFixed();
  s = s.toFixed();
  l = l.toFixed();

  return { h, s, l };
}

function rgbToCSS(rgb) {
  const cssValue = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  return cssValue;
}

function showHex(hexColor) {
  displayHexValue.textContent = `hex: ${hexColor}`;
}

function showRGB(rgb, cssRGB) {
  displayRGBValue.textContent = `rgb (${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  document.querySelector(".color3").style.backgroundColor = cssRGB;
}

function showHSL(hsl) {
  displayHSLValue.textContent = `hsl (${hsl.h}, ${hsl.s}, ${hsl.l})`;
}
