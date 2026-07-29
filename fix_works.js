const fs = require("fs");
const path = "E:/myppt/src/components/WorksGallery/WorksGallery.jsx";
let content = fs.readFileSync(path, "utf8");

// Fix corrupted <p> tag
content = content.replace(/<p>[^<]*\uFFFD[^<]*<\/p>/g, "<p>{SECTION_TITLES.works.desc}</p>");

// Fix corrupted string literals - remove all U+FFFD characters
content = content.replace(/\uFFFD/g, "");

fs.writeFileSync(path, content, "utf8");
console.log("Fixed");
