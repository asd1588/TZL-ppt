const fs = require("fs");
const list = ["bp-plan","ai-tech","tech-arch","brand-launch","market-data","data-report","research","luxury-brand","brand-story","finance-report","growth-plan","music-festival"];

var css = '<style>\n/* CUSTOM ========== */\n';
css += '.preview-author-name{font-size:0!important}\n';
css += '.preview-author-name::before{content:"@user_name";font-size:12px!important}\n';
css += '.preview-author-links a{display:none!important}\n';
css += '#preview-lang-toggle{display:none!important}\n';
css += '/* #preview-theme-toggle{display:none!important} */\n';
css += '</style>\n';


list.forEach(p => {
  let h = fs.readFileSync("E:/myppt/public/ppt/" + p + "/index.html", "utf8");
  // Replace the old CUSTOM block
  const s = h.indexOf("/* CUSTOM");
  if (s > -1) {
    const e = h.indexOf("</style>", s) + 8;
    h = h.substring(0, s) + css + h.substring(e);
  } else {
    // First time: inject before </head>
    h = h.replace("</head>", css + "</head>");
  }
  // Add script before </body>
    fs.writeFileSync("E:/myppt/public/ppt/" + p + "/index.html", h, "utf8");
  console.log(p);
});
console.log("DONE");
