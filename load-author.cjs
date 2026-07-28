const fs = require("fs");
const list = ["bp-plan","ai-tech","tech-arch","brand-launch","market-data","data-report","research","luxury-brand","brand-story","finance-report","growth-plan","music-festival"];
const css = '<style>\n/* CUSTOM: edit /xgzzl ========== */\n.preview-author-name{font-size:0!important}\n.preview-author-links a{display:none!important}\n#preview-lang-toggle{display:none!important}\n/* #preview-theme-toggle{display:none!important} */\n</style>\n';
const script = '<script>\nfetch("/xgzzl").then(function(r){return r.json()}).then(function(d){\n  var n=document.querySelector(".preview-author-name");\n  if(n){n.textContent=d.name;n.style.fontSize="12px"}\n  var w=document.querySelector(".preview-author-links");\n  if(w){w.innerHTML="";d.links.forEach(function(l){\n    var a=document.createElement("a");\n    a.href=l.url;a.target="_blank";a.rel="noopener noreferrer";\n    a.setAttribute("data-platform",l.platform);\n    a.setAttribute("aria-label",l.label);a.title=l.label;\n    if(l.svg){a.innerHTML=l.svg}\n    else if(l.icon){var i=document.createElement("img");i.src=l.icon;i.alt="";a.appendChild(i)}\n    else{a.textContent=l.label}\n    w.appendChild(a);\n  })}\n}).catch(function(e){console.log("xgzzl:",e)});\n</script>';
list.forEach(function(p){
  var h = fs.readFileSync("E:/myppt/public/ppt/" + p + "/index.html", "utf8");
  var s = h.indexOf("/* CUSTOM");
  var e = h.indexOf("</style>", s) + 8;
  h = h.substring(0, s) + css + h.substring(e);
  h = h.replace("</body>", script + "\n</body>");
  fs.writeFileSync("E:/myppt/public/ppt/" + p + "/index.html", h, "utf8");
  console.log(p);
});
console.log("DONE");
