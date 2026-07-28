const fs = require("fs");
let w = fs.readFileSync("E:/myppt/src/components/WorksGallery/WorksGallery.jsx", "utf8");
w = w.replace(/\/ppt\/covers\//g, "/ppt/");
w = w.replace(/\.html/g, "/index.html");
w = w.replace(/\/index\.html\/index\.html/g, "/index.html");
fs.writeFileSync("E:/myppt/src/components/WorksGallery/WorksGallery.jsx", w, "utf8");
const i = w.indexOf("PREVIEWS");
console.log(w.substring(i, i + 400));
