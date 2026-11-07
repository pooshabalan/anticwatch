const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'watches');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = [
  { name: 'daytona', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Rolex_Cosmograph_Daytona_116500LN.jpg/1024px-Rolex_Cosmograph_Daytona_116500LN.jpg' },
  { name: 'submariner', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Rolex_Submariner_114060.jpg/1024px-Rolex_Submariner_114060.jpg' },
  { name: 'speedmaster', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Omega_Speedmaster_Professional_Moonwatch.jpg/1024px-Omega_Speedmaster_Professional_Moonwatch.jpg' },
  { name: 'royaloak', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Audemars_Piguet_Royal_Oak.jpg/1024px-Audemars_Piguet_Royal_Oak.jpg' },
  { name: 'nautilus', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Patek_Philippe_Annual_Calendar_Ref._5205G_-_2015-05-30_18-50-25.jpg/1024px-Patek_Philippe_Annual_Calendar_Ref._5205G_-_2015-05-30_18-50-25.jpg' },
  { name: 'cartier', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cartier_Tank_Basculante_-_side.JPG/1024px-Cartier_Tank_Basculante_-_side.JPG' }
];

images.forEach(img => {
  const dest = path.join(dir, img.name + '.jpg');
  https.get(img.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => console.log('Downloaded', img.name));
    } else {
      console.error('Failed to download', img.name, 'Status:', res.statusCode);
    }
  }).on('error', (err) => console.error(err));
});
