const fs = require("fs");
const list = ["bp-plan","ai-tech","tech-arch","brand-launch","market-data","data-report","research","luxury-brand","brand-story","finance-report","growth-plan","music-festival"];
const css = '<style>\n/* ========== CUSTOM: REPLACE BELOW ========== */\n';
const c1 = '#slide-rail .slide-rail-head,.slide-rail-resize{display:none!important}\n';
const c2 = '#slide-rail-list{display:none!important}\n';
const c3 = '#slide-rail::after{content:"@xxxx";display:flex;align-items:center;justify-content:center;height:100%;font:700 28px/1 var(--sans-zh);color:var(--pp-fg2);padding:20px;text-align:center}\n';
const c4 = '.preview-author-name{font-size:0!important}\n';
const c5 = '.preview-author-name::before{content:"@\u4f60\u7684\u540d\u79f0";font-size:12px!important}\n';
const c6 = '.preview-author-links a{display:none!important}\n';
const c7 = '.preview-author-links::after{content:"\u5fae\u4fe1 / \u90ae\u7bb1 / GitHub";font:500 11px/1 var(--sans-zh);color:var(--pp-fg2);padding:4px 0}\n';
const c8 = '#preview-lang-toggle{display:none!important}\n';
const c9 = '/* #preview-theme-toggle{display:none!important} */\n';
const end = '/* ========================================== */\n</style>';
const all = css + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + end;

list.forEach(p => {
  let h = fs.readFileSync("E:/myppt/public/ppt/" + p + "/index.html", "utf8");
  h = h.replace("</head>", all + "</head>");
  fs.writeFileSync("E:/myppt/public/ppt/" + p + "/index.html", h, "utf8");
  console.log(p);
});
console.log("\\nALL DONE");
