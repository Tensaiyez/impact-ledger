// Simple script to create placeholder PWA icons
// In a real project, you would use proper icon generation tools

const fs = require('fs')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

// Create a simple SVG icon
const createSVGIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#3b82f6" rx="${size * 0.2}"/>
  <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="white" font-family="Arial, sans-serif" font-size="${size * 0.3}" font-weight="bold">IL</text>
</svg>
`

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons')
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// Generate SVG icons for each size
sizes.forEach(size => {
  const svg = createSVGIcon(size)
  const filename = `icon-${size}x${size}.svg`
  fs.writeFileSync(path.join(iconsDir, filename), svg)
  console.log(`Generated ${filename}`)
})

console.log('Icon generation complete!')
console.log('Note: In production, convert these SVG files to PNG format for better PWA compatibility.')
