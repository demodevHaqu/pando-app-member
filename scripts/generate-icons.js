const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateSVGIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D0D12"/>
      <stop offset="100%" style="stop-color:#1A1A24"/>
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B35"/>
      <stop offset="100%" style="stop-color:#FF8C5A"/>
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00D9FF"/>
      <stop offset="100%" style="stop-color:#00B8E6"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.195}" fill="url(#bgGrad)"/>
  <g opacity="0.1" stroke="#00D9FF" stroke-width="${size * 0.002}">
    <line x1="${size * 0.25}" y1="0" x2="${size * 0.25}" y2="${size}"/>
    <line x1="${size * 0.5}" y1="0" x2="${size * 0.5}" y2="${size}"/>
    <line x1="${size * 0.75}" y1="0" x2="${size * 0.75}" y2="${size}"/>
    <line x1="0" y1="${size * 0.25}" x2="${size}" y2="${size * 0.25}"/>
    <line x1="0" y1="${size * 0.5}" x2="${size}" y2="${size * 0.5}"/>
    <line x1="0" y1="${size * 0.75}" x2="${size}" y2="${size * 0.75}"/>
  </g>
  <rect x="${size * 0.254}" y="${size * 0.195}" width="${size * 0.098}" height="${size * 0.609}" rx="${size * 0.02}" fill="url(#orangeGrad)"/>
  <path d="M ${size * 0.303} ${size * 0.195}
           L ${size * 0.547} ${size * 0.195}
           Q ${size * 0.742} ${size * 0.195} ${size * 0.742} ${size * 0.391}
           Q ${size * 0.742} ${size * 0.586} ${size * 0.547} ${size * 0.586}
           L ${size * 0.303} ${size * 0.586}"
        fill="none"
        stroke="url(#orangeGrad)"
        stroke-width="${size * 0.098}"
        stroke-linecap="round"
        stroke-linejoin="round"/>
  <circle cx="${size * 0.742}" cy="${size * 0.742}" r="${size * 0.059}" fill="url(#blueGrad)"/>
  <circle cx="${size * 0.742}" cy="${size * 0.742}" r="${size * 0.029}" fill="#0D0D12"/>
  <circle cx="${size * 0.742}" cy="${size * 0.742}" r="${size * 0.088}" fill="none" stroke="#00D9FF" stroke-width="${size * 0.004}" opacity="0.5"/>
  <circle cx="${size * 0.742}" cy="${size * 0.742}" r="${size * 0.117}" fill="none" stroke="#00D9FF" stroke-width="${size * 0.002}" opacity="0.3"/>
</svg>`;
}

const iconsDir = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  for (const size of sizes) {
    const svg = generateSVGIcon(size);
    const svgBuffer = Buffer.from(svg);

    // Generate PNG from SVG
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));

    console.log(`Generated: icon-${size}x${size}.png`);
  }

  // Also generate favicon.ico from 32x32
  const faviconSvg = generateSVGIcon(32);
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon.png'));

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
