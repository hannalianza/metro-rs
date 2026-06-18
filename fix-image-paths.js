const fs = require('fs');

const file = 'C:\\Projects\\metro-rs\\src\\data\\products.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace all refrigerationx.com image URLs with local paths
// Pattern: https://refrigerationx.com/upload//style/MODEL-Photoroom.jpg or MODEL.jpg
// → /products/model-lowercase.jpg

const before = (content.match(/https:\/\/refrigerationx\.com\/upload\/\/style\/[^"]+/g) || []).length;

content = content.replace(
  /https:\/\/refrigerationx\.com\/upload\/\/style\/([A-Z0-9\-]+?)(?:-Photoroom)?\.jpg/g,
  (match, model) => `/products/${model.toLowerCase()}.jpg`
);

const after = (content.match(/https:\/\/refrigerationx\.com\/upload\/\/style\/[^"]+/g) || []).length;

fs.writeFileSync(file, content, 'utf8');
console.log(`Replaced ${before - after} URLs. Remaining refrigerationx URLs: ${after}`);
