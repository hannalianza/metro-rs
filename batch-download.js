const https = require('https');
const fs = require('fs');
const path = require('path');

const DEST_DIR = 'C:\\Projects\\metro-rs\\public\\products';
const BASE_URL = 'https://assets.katomcdn.com/q_auto,f_auto/v1748937626/products/266';

// All 58 Refrigeration-X models still needing images
// Format: [model-with-dashes (used for filename), model-without-dashes (used for katom SKU)]
const models = [
  'XR19-1-N6',
  'XR24-1-N6',
  'XR47-2-N6',
  'XR72-3-N',
  'XF19-1-N',
  'XF24-1-N',
  'XF47-2-N',
  'XF72-3-N',
  'XST-28-N6',
  'XST-36-N6',
  'XST-48-N',
  'XST-60-N',
  'XST-72-N',
  'XST-28-12-N6',
  'XST-36-15-N6',
  'XST-48-18-N',
  'XST-60-24-N',
  'XPR-44-N',
  'XPR-67-N',
  'XPR-93-N',
  'XUR-28-N6',
  'XUR-36-N6',
  'XUR-48-N6',
  'XUR-60-N6',
  'XUR-72-N',
  'XUF-28-N',
  'XUF-36-N',
  'XUF-48-N',
  'XUF-60-N',
  'XGM-10-N6',
  'XGM-15-N6',
  'XGM-19-N6',
  'XGM-23-N6',
  'XGM-35-N',
  'XGM-47-N',
  'XBB-1SB-N6',
  'XBB-2SB-N6',
  'XBB-3SB-N6',
  'XBB-4SB-N6',
  'XBB-2SG-N',
  'XBB-3SG-N',
  'XBB-4SG-N',
  'XBB-24-48SB-N6',
  'XBC-24SB-N6',
  'XBC-36SB-N6',
  'XBC-50SB-N6',
  'XBB-24-60SB-N6',
  'XBB-24-72SB-N6',
  'XBB-24-48SG-N',
  'XBB-24-60SG-N',
  'XBB-24-72SG-N',
  'XBD-1SB-N6',
  'XBD-2SB-N6',
  'XBD-3SB-N6',
  'XBD-4SB-N',
  'XBC-65SB-N6',
  'XBC-80SB-N',
  'XBC-95SB-N',
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
  'Referer': 'https://www.katom.com/',
};

function downloadOne(model) {
  return new Promise((resolve) => {
    const sku = model.replace(/-/g, '');           // XR191N6
    const skuUpper = `083-${sku.toUpperCase()}`;   // 083-XR191N6
    const skuLower = `083-${sku.toLowerCase()}`;   // 083-xr191n6
    const url = `${BASE_URL}/${skuUpper}/${skuLower}.jpg`;
    const filename = `${model.toLowerCase()}.jpg`; // xr19-1-n6.jpg
    const dest = path.join(DEST_DIR, filename);

    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      headers,
    };

    const file = fs.createWriteStream(dest);
    const req = https.get(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        // Simple redirect follow
        https.get(res.headers.location, { headers }, (res2) => {
          if (res2.statusCode !== 200) {
            file.close();
            resolve({ model, ok: false, status: res2.statusCode, url });
            return;
          }
          const f2 = fs.createWriteStream(dest);
          res2.pipe(f2);
          f2.on('finish', () => {
            f2.close();
            const size = fs.statSync(dest).size;
            resolve({ model, ok: size > 1000, size, url });
          });
        });
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(dest); } catch(e) {}
        resolve({ model, ok: false, status: res.statusCode, url });
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        resolve({ model, ok: size > 1000, size, url });
      });
    });
    req.on('error', (err) => {
      file.close();
      try { fs.unlinkSync(dest); } catch(e) {}
      resolve({ model, ok: false, error: err.message, url });
    });
    req.setTimeout(15000, () => {
      req.destroy();
      resolve({ model, ok: false, error: 'timeout', url });
    });
  });
}

async function run() {
  console.log(`Downloading ${models.length} images...`);
  const results = [];
  // Download 5 at a time
  for (let i = 0; i < models.length; i += 5) {
    const batch = models.slice(i, i + 5);
    const batchResults = await Promise.all(batch.map(downloadOne));
    for (const r of batchResults) {
      results.push(r);
      if (r.ok) {
        console.log(`✓ ${r.model} (${r.size} bytes)`);
      } else {
        console.log(`✗ ${r.model} — status ${r.status || r.error}`);
      }
    }
  }

  const ok = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok);
  console.log(`\nDone: ${ok}/${models.length} succeeded`);
  if (fail.length) {
    console.log('Failed:');
    fail.forEach(r => console.log(`  ${r.model}: ${r.status || r.error}`));
  }
}

run().catch(console.error);
