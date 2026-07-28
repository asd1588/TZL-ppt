const fs = require("fs");
const list = ["bp-plan","ai-tech","tech-arch","brand-launch","market-data","data-report","research","luxury-brand","brand-story","finance-report","growth-plan","music-festival"];
list.forEach(p => {
  const h = fs.readFileSync("E:/myppt/public/ppt/" + p + "/index.html", "utf8");
  const headS = h.indexOf("<head");
  const headE = h.indexOf("</head>", headS) + 7;
  const base = '<base href="/ppt/' + p + '/">';
  const hide = '<style>#deck-topbar,#slide-rail,#hint,#deck-save-status{display:none!important}body{overflow:hidden;margin:0}#deck-viewport{position:relative!important;top:0!important;left:0!important;width:100vw!important;height:56.25vw!important}#deck{--deck-left:0px!important;--deck-top:0px!important;--deck-w:100vw!important;--deck-h:56.25vw!important;--deck-scale:1!important}</style>';
  const hc = h.substring(headS, headE);
  const bc = h.substring(h.indexOf("<body"), h.indexOf(">", h.indexOf("<body")) + 1) + h.substring(h.indexOf(">", h.indexOf("<body")) + 1);
  const result = "<!DOCTYPE html>\n" + hc.replace("</head>", base + hide + "</head>") + "\n" + bc;
  fs.writeFileSync("E:/myppt/public/ppt/covers/" + p + ".html", result, "utf8");
  console.log(p);
});
