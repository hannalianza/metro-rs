const https = require('https');
const fs = require('fs');

const url = 'https://assets.katomcdn.com/q_auto,f_auto/v1748937626/products/266/083-XST7230N/083-xst7230n.jpg';
const dest = 'C:\\Projects\\metro-rs\\public\\products\\xst-72-30-n.jpg';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.katom.com/',
  }
};

function download(urlStr, opts, destPath, redirects) {
  if (redirects > 5) { console.error('Too many redirects'); process.exit(1); }
  const parsedUrl = new URL(urlStr);
  const reqOpts = { ...opts, hostname: parsedUrl.hostname, path: parsedUrl.pathname + parsedUrl.search };
  https.get(reqOpts, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('Redirect to', res.headers.location);
      download(res.headers.location, opts, destPath, redirects + 1);
      return;
    }
    if (res.statusCode !== 200) {
      console.error('HTTP error:', res.statusCode);
      process.exit(1);
    }
    const file = fs.createWriteStream(destPath);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      const size = fs.statSync(destPath).size;
      console.log('Downloaded', size, 'bytes to', destPath);
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

download(url, options, dest, 0);
