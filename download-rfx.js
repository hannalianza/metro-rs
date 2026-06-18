const https = require('https');
const fs = require('fs');
const path = require('path');

const DEST_DIR = 'C:\\Projects\\metro-rs\\public\\products';

const items = [
  ['XR72-3-N.jpg', 'xr72-3-n.jpg'],
  ['XPR-44-N.jpg', 'xpr-44-n.jpg'],
  ['XPR-67-N.jpg', 'xpr-67-n.jpg'],
  ['XPR-93-N.jpg', 'xpr-93-n.jpg'],
  ['XGM-10-N6-Photoroom.jpg', 'xgm-10-n6.jpg'],
  ['XGM-15-N6-Photoroom.jpg', 'xgm-15-n6.jpg'],
  ['XGM-19-N6-Photoroom.jpg', 'xgm-19-n6.jpg'],
  ['XGM-23-N6-Photoroom.jpg', 'xgm-23-n6.jpg'],
  ['XGM-35-N-Photoroom.jpg', 'xgm-35-n.jpg'],
  ['XGM-47-N-Photoroom.jpg', 'xgm-47-n.jpg'],
  ['XBB-1SB-N6.jpg', 'xbb-1sb-n6.jpg'],
  ['XBB-2SB-N6.jpg', 'xbb-2sb-n6.jpg'],
  ['XBB-3SB-N6.jpg', 'xbb-3sb-n6.jpg'],
  ['XBB-4SB-N6.jpg', 'xbb-4sb-n6.jpg'],
  ['XBB-2SG-N.jpg', 'xbb-2sg-n.jpg'],
  ['XBB-3SG-N.jpg', 'xbb-3sg-n.jpg'],
  ['XBB-4SG-N.jpg', 'xbb-4sg-n.jpg'],
  ['XBB-24-48SB-N6.jpg', 'xbb-24-48sb-n6.jpg'],
  ['XBC-24SB-N6.jpg', 'xbc-24sb-n6.jpg'],
  ['XBC-36SB-N6.jpg', 'xbc-36sb-n6.jpg'],
  ['XBC-50SB-N6.jpg', 'xbc-50sb-n6.jpg'],
  ['XBB-24-60SB-N6.jpg', 'xbb-24-60sb-n6.jpg'],
  ['XBB-24-72SB-N6.jpg', 'xbb-24-72sb-n6.jpg'],
  ['XBB-24-48SG-N.jpg', 'xbb-24-48sg-n.jpg'],
  ['XBB-24-60SG-N.jpg', 'xbb-24-60sg-n.jpg'],
  ['XBB-24-72SG-N.jpg', 'xbb-24-72sg-n.jpg'],
  ['XBD-1SB-N6.jpg', 'xbd-1sb-n6.jpg'],
  ['XBD-2SB-N6.jpg', 'xbd-2sb-n6.jpg'],
  ['XBD-3SB-N6.jpg', 'xbd-3sb-n6.jpg'],
  ['XBD-4SB-N.jpg', 'xbd-4sb-n.jpg'],
  ['XBC-65SB-N6.jpg', 'xbc-65sb-n6.jpg'],
  ['XBC-80SB-N.jpg', 'xbc-80sb-n.jpg'],
  ['XBC-95SB-N.jpg', 'xbc-95sb-n.jpg'],
];

function downloadOne(srcFile, destFile) {
  return new Promise((resolve) => {
    const url = `https://refrigerationx.com/upload//style/${srcFile}`;
    const dest = path.join(DEST_DIR, destFile);
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://refrigerationx.com/',
        'Cache-Control': 'no-cache',
      }
    };
    const file = fs.createWriteStream(dest);
    const req = https.get(options, (res) => {
      if (res.statusCode !== 200) {
        file.close(); try { fs.unlinkSync(dest); } catch(e) {}
        resolve({ destFile, ok: false, status: res.statusCode });
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        resolve({ destFile, ok: size > 1000, size });
      });
    });
    req.on('error', (err) => { file.close(); try { fs.unlinkSync(dest); } catch(e) {} resolve({ destFile, ok: false, error: err.message }); });
    req.setTimeout(15000, () => { req.destroy(); resolve({ destFile, ok: false, error: 'timeout' }); });
  });
}

async function run() {
  console.log(`Downloading ${items.length} images from refrigerationx.com...`);
  const results = [];
  for (let i = 0; i < items.length; i += 5) {
    const batch = items.slice(i, i + 5);
    const batchResults = await Promise.all(batch.map(([src, dest]) => downloadOne(src, dest)));
    for (const r of batchResults) {
      results.push(r);
      console.log((r.ok ? '✓' : '✗') + ' ' + r.destFile + (r.ok ? ` (${r.size} bytes)` : ` — ${r.status || r.error}`));
    }
  }
  const ok = results.filter(r => r.ok).length;
  console.log(`\nDone: ${ok}/${items.length} succeeded`);
}
run().catch(console.error);
