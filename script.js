"use strict";

document.querySelector("input").addEventListener("input", getHexColor);
const displayHexValue = document.querySelector(".color-container:nth-child(3) p");
const displayRGBValue = document.querySelector(".color-container:nth-child(3) p + p");
const displayHSLValue = document.querySelector(".color-container:nth-child(3) p + p + p");

function getHexColor() {
  const selectedHexColor = this.value;
  console.log(selectedHexColor);

  showHexColor(selectedHexColor);
  hexToRGB(selectedHexColor);
}

function hexToRGB(hexColor) {
  let red = hexColor.substring(1, 3);
  let green = hexColor.substring(3, 5);
  let blue = hexColor.substring(5, 7);

  red = Number.parseInt(red, 16);
  green = Number.parseInt(green, 16);
  blue = Number.parseInt(blue, 16);
  console.log({ red, green, blue });

  showRGBText(red, green, blue);
  rgbToHsl(red, green, blue);
}

function rgbToHsl(r, g, b) {
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

  h = h.toFixed(2);
  s = s.toFixed(2);
  l = l.toFixed(2);

  console.log({ h, s, l }); // just for testing
  showHSLText(h, s, l);
}

function showHexColor(hexColor) {
  displayHexValue.textContent = `hex: ${hexColor}`;
  document.querySelector(".color3").style.backgroundColor = hexColor;
}

function showRGBText(red, green, blue) {
  displayRGBValue.textContent = `rgb (${red}, ${green}, ${blue})`;
}

function showHSLText(h, s, l) {
  displayHSLValue.textContent = `hsl (${h}, ${s}, ${l})`;
}
