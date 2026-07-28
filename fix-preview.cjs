const fs = require("fs");
let w = fs.readFileSync("E:/myppt/src/components/WorksGallery/WorksGallery.jsx", "utf8");
const old = 'const PREVIEWS = {\n  theme04:"/ppt/covers/brand.html",theme08:"/ppt/covers/brand.html",theme09:"/ppt/covers/brand.html",\n  theme05:"/ppt/covers/data.html",theme06:"/ppt/covers/data.html",theme10:"/ppt/covers/data.html",\n  theme01:"/ppt/covers/creative.html",theme11:"/ppt/covers/creative.html",theme12:"/ppt/covers/creative.html",\n  theme02:"/ppt/covers/education.html",theme03:"/ppt/covers/education.html",theme07:"/ppt/covers/education.html",\n}';
const nw = 'const PREVIEWS = {\n  theme01:"/ppt/bp-plan/index.html",theme02:"/ppt/ai-tech/index.html",theme03:"/ppt/tech-arch/index.html",\n  theme04:"/ppt/brand-launch/index.html",theme05:"/ppt/market-data/index.html",theme06:"/ppt/data-report/index.html",\n  theme07:"/ppt/research/index.html",theme08:"/ppt/luxury-brand/index.html",theme09:"/ppt/brand-story/index.html",\n  theme10:"/ppt/finance-report/index.html",theme11:"/ppt/growth-plan/index.html",theme12:"/ppt/music-festival/index.html",\n}';
w = w.replace(old, nw);
fs.writeFileSync("E:/myppt/src/components/WorksGallery/WorksGallery.jsx", w, "utf8");
console.log("PREVIEWS UPDATED");
const i = w.indexOf("PREVIEWS");
console.log(w.substring(i, i + 400));
