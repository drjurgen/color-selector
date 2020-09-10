"use strict";
document.addEventListener("DOMContentLoaded", randomColor);
document.querySelector("input").addEventListener("input", getHexColor);

document.querySelectorAll("#harmony-selector input").forEach((button) => {
  button.addEventListener("click", getSelectedHarmony);
});

let selectedHarmony = "analogous";
let globalBaseHSL;

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const hexColor = rgbToHex({ r, g, b });
  showSelectedColor(hexColor);
}

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
  showSelectedHarmony(hsl);
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

  h = Number(h.toFixed());
  s = Number(s.toFixed());
  l = Number(l.toFixed());

  return { h, s, l };
}

function rgbToCSS(rgb) {
  const cssValue = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  return cssValue;
}

function showSelectedHarmony(baseHSL) {
  globalBaseHSL = baseHSL;
  const harmonyArray = [
    { h: baseHSL.h, s: baseHSL.s, l: baseHSL.l },
    { h: baseHSL.h, s: baseHSL.s, l: baseHSL.l },
    baseHSL,
    { h: baseHSL.h, s: baseHSL.s, l: baseHSL.l },
    { h: baseHSL.h, s: baseHSL.s, l: baseHSL.l },
  ];

  const calcHarmonyArray = calcSelectedHarmony(harmonyArray);
  showColors(calcHarmonyArray);

  console.log(calcHarmonyArray);
  console.log("\n");
}

function getSelectedHarmony() {
  selectedHarmony = this.value;
  console.log(selectedHarmony);
  updateHarmony();
}

function updateHarmony() {
  console.log(globalBaseHSL);
  showSelectedHarmony(globalBaseHSL);
}

function calcSelectedHarmony(harmonyArray) {
  const baseHSL = harmonyArray[2];
  if (selectedHarmony === "analogous") {
    calcAnalogous(harmonyArray, baseHSL);
  } else if (selectedHarmony === "monochromatic") {
    calcMonochromatic(harmonyArray, baseHSL);
  } else if (selectedHarmony === "triad") {
    calcTriad(harmonyArray, baseHSL);
  } else if (selectedHarmony === "complementary") {
    calcComplementary(harmonyArray, baseHSL);
  } else if (selectedHarmony === "compound") {
    calcCompound(harmonyArray, baseHSL);
  } else if (selectedHarmony === "shades") {
    calcShades(harmonyArray, baseHSL);
  }
  return harmonyArray;
}

function calcAnalogous(harmonyArray, baseHSL) {
  harmonyArray[0].h = baseHSL.h - 50;
  harmonyArray[1].h = baseHSL.h - 25;
  harmonyArray[3].h = baseHSL.h + 25;
  harmonyArray[4].h = baseHSL.h + 50;
  validateHarmony(harmonyArray);
  return harmonyArray;
}

function calcMonochromatic(harmonyArray, baseHSL) {
  harmonyArray[0].s = baseHSL.s - 30;
  harmonyArray[1].s = baseHSL.s - 15;
  harmonyArray[3].s = baseHSL.s + 15;
  harmonyArray[4].s = baseHSL.s + 30;
  validateHarmony(harmonyArray);
  return harmonyArray;
}

function calcTriad(harmonyArray, baseHSL) {
  harmonyArray[0].h = baseHSL.h - 60;
  harmonyArray[1].h = baseHSL.h - 60;
  harmonyArray[3].h = baseHSL.h + 60;
  harmonyArray[4].h = baseHSL.h + 60;
  validateHarmony(harmonyArray);
  return harmonyArray;
}

function calcComplementary(harmonyArray, baseHSL) {
  harmonyArray[0].h = baseHSL.h + 180;
  harmonyArray[1].h = baseHSL.h + 180;
  harmonyArray[3].h = baseHSL.h + 180;
  harmonyArray[4].h = baseHSL.h + 180;
  validateHarmony(harmonyArray);
  return harmonyArray;
}

function calcCompound(harmonyArray, baseHSL) {
  harmonyArray[0].h = baseHSL.h - 50;
  harmonyArray[1].h = baseHSL.h + 180;
  harmonyArray[3].h = baseHSL.h + 180;
  harmonyArray[4].h = baseHSL.h + 50;
  validateHarmony(harmonyArray);
  return harmonyArray;
}

function calcShades(harmonyArray, baseHSL) {
  harmonyArray[0].l = baseHSL.l - 35;
  harmonyArray[1].l = baseHSL.l - 15;
  harmonyArray[3].l = baseHSL.l + 15;
  harmonyArray[4].l = baseHSL.l + 35;
  validateHarmony(harmonyArray);
  return harmonyArray;
}

function validateHarmony(harmonyArray) {
  harmonyArray.forEach((hsl) => {
    if (hsl.h < 0) {
      hsl.h += 360;
    } else if (hsl.l > 360) {
      hsl.h -= 360;
    }

    if (hsl.s < 0) {
      hsl.s -= 0 + hsl.s;
    } else if (hsl.s > 100) {
      hsl.s -= hsl.s - 100;
    }

    if (hsl.l < 0) {
      hsl.l -= 0 + hsl.l;
    } else if (hsl.l > 100) {
      hsl.l -= hsl.l - 100;
    }
  });

  // TODO: check if h is between 0 and 360 and if s,l is between 0 and 100
}

function showColors(calcHarmonyArray) {
  calcHarmonyArray.forEach((hslObject) => {
    showColor(calcHarmonyArray, hslObject);
  });
}

function showColor(calcHarmonyArray, hsl) {
  const rgb = hslToRGB(hsl);
  const hex = rgbToHex(rgb);
  displayHarmony(calcHarmonyArray, hsl, rgb, hex);
}

function hslToRGB(hsl) {
  let h = hsl.h;
  let s = hsl.s;
  let l = hsl.l;
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b };
}

function rgbToHex(rgb) {
  const r = rgb.r.toString(16).padStart(2, "0");
  const g = rgb.g.toString(16).padStart(2, "0");
  const b = rgb.b.toString(16).padStart(2, "0");

  const hexColor = `#${r}${g}${b}`;
  return hexColor;
}

function displayHarmony(calcHarmonyArray, hsl, rgb, hex) {
  const colorBox = document.querySelector(".color-container:nth-child(" + (calcHarmonyArray.indexOf(hsl) + 1) + ") .color");
  const hexText = document.querySelector(".color-container:nth-child(" + (calcHarmonyArray.indexOf(hsl) + 1) + ") p");
  const rgbText = document.querySelector(".color-container:nth-child(" + (calcHarmonyArray.indexOf(hsl) + 1) + ") p+p");
  const hslText = document.querySelector(".color-container:nth-child(" + (calcHarmonyArray.indexOf(hsl) + 1) + ") p+p+p");

  colorBox.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  hexText.textContent = `hex: ${hex}`;
  rgbText.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  hslText.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}
