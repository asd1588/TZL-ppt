const fs = require("fs");
["brand","creative","data","education"].forEach(p => {
  const h = fs.readFileSync("E:/myppt/public/ppt/"+p+"/index.html", "utf8");
  const headS = h.indexOf("<head");
  const headE = h.indexOf("</head>", headS) + 7;
  const headContent = h.substring(headS, headE);
  const bodyS = h.indexOf("<body");
  const bodyE = h.indexOf(">", bodyS) + 1;
  const bodyContent = h.substring(bodyE);
  const base = "<base href=\"/ppt/"+p+"/\">";
  const hide = "<style>#deck-topbar,#slide-rail,#hint,#deck-save-status{display:none!important}#deck-viewport{position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important}#deck{--deck-left:0px!important;--deck-top:0px!important;--deck-w:100vw!important;--deck-h:100vh!important;--deck-scale:1!important}</style>";
  const result = "<!DOCTYPE html>\n" + headContent.replace("</head>", base + hide + "</head>") + "\n<body>" + bodyContent;
  fs.writeFileSync("E:/myppt/public/ppt/covers/"+p+".html", result, "utf8");
  console.log(p + " OK");
});
