const fs = require("fs");
let c = fs.readFileSync("E:/myppt/src/data/constants.js", "utf8");
const s = c.indexOf("export const WORKS = [");
const e = c.indexOf("];", s) + 2;
const items = [
  '{themeId:"theme02",tag:"\u79d1\u6280\u53d1\u5e03",title:"AI \u667a\u80fd\u79d1\u6280\u53d1\u5e03\u4f1a",desc:"5\u9875 / \u7d2b\u7eff\u6e10\u53d8",color:"#b8a0d8",cover:"linear-gradient(135deg,#b8a0d8,#6a9e7a)"}',
  '{themeId:"theme04",tag:"\u54c1\u724c\u65b9\u6848",title:"\u5e74\u8f7b\u5316\u6d88\u8d39\u54c1\u724c\u53d1\u5e03",desc:"5\u9875 / \u7c89\u7cd6\u679c\u8272",color:"#f8c8d8",cover:"linear-gradient(135deg,#f8c8d8,#e88aaa)"}',
  '{themeId:"theme01",tag:"\u521b\u4e1a\u9879\u76ee",title:"\u521b\u4e1a\u9879\u76eeBP\u7b56\u5212\u65b9\u6848",desc:"5\u9875 / \u6e29\u6696\u7c73\u8272",color:"#e8dcc8",cover:"linear-gradient(135deg,#e8dcc8,#b8a88a)"}',
  '{themeId:"theme06",tag:"\u6570\u636e\u5206\u6790",title:"\u5e74\u5ea6\u6570\u636e\u6218\u7565\u62a5\u544a",desc:"5\u9875 / \u6df1\u6d77\u519b\u84dd",color:"#1a2332",cover:"linear-gradient(135deg,#1a2332,#4a7c6f)"}',
  '{themeId:"theme03",tag:"\u5f00\u53d1\u8005\u5927\u4f1a",title:"\u6280\u672f\u67b6\u6784\u8bbe\u8ba1\u65b9\u6848",desc:"5\u9875 / \u6df1\u84dd\u7070",color:"#2d3445",cover:"linear-gradient(135deg,#2d3445,#5a7d9c)"}',
  '{themeId:"theme05",tag:"\u5e02\u573a\u5206\u6790",title:"\u5e02\u573a\u8d8b\u52bf\u6570\u636e\u5206\u6790",desc:"5\u9875 / \u6696\u9ec4\u8272\u8c31",color:"#f0e68c",cover:"linear-gradient(135deg,#f0e68c,#d4a373)"}',
  '{themeId:"theme07",tag:"\u8c03\u7814\u62a5\u544a",title:"\u884c\u4e1a\u8c03\u7814\u767d\u76ae\u4e66",desc:"5\u9875 / \u51b7\u767d\u84dd",color:"#eef2f5",cover:"linear-gradient(135deg,#eef2f5,#7a9e9f)"}',
  '{themeId:"theme08",tag:"\u9ad8\u7aef\u54c1\u724c",title:"\u9ad8\u7aef\u54c1\u724c\u6218\u7565\u63d0\u6848",desc:"5\u9875 / \u9ed1\u91d1",color:"#1a1a1a",cover:"linear-gradient(135deg,#1a1a1a,#c9a84c)"}',
  '{themeId:"theme09",tag:"\u54c1\u724c\u6545\u4e8b",title:"\u54c1\u724c\u6545\u4e8b\u53d9\u4e8b\u65b9\u6848",desc:"5\u9875 / \u6df1\u84dd",color:"#0d2137",cover:"linear-gradient(135deg,#0d2137,#5c7d9c)"}',
  '{themeId:"theme10",tag:"\u91d1\u878d\u62a5\u544a",title:"\u57fa\u91d1\u5b63\u5ea6\u8868\u73b0\u62a5\u544a",desc:"5\u9875 / \u6697\u91d1",color:"#2a2520",cover:"linear-gradient(135deg,#2a2520,#d4a030)"}',
  '{themeId:"theme11",tag:"\u589e\u957f\u7b56\u7565",title:"\u7528\u6237\u589e\u957f\u7b56\u7565\u65b9\u6848",desc:"5\u9875 / \u6df1\u7eff\u4eae\u7eff",color:"#1a3a2a",cover:"linear-gradient(135deg,#1a3a2a,#6abf6a)"}',
  '{themeId:"theme12",tag:"\u5a31\u4e50\u6d3b\u52a8",title:"\u97f3\u4e50\u8282\u54c1\u724c\u4f01\u5212\u6848",desc:"5\u9875 / \u6df1\u7d2b\u9713\u8679",color:"#2a1035",cover:"linear-gradient(135deg,#2a1035,#e060d0)"}'
];
const n = "export const WORKS = [\n  " + items.join(",\n  ") + "\n];\n";
c = c.substring(0, s) + n + c.substring(e);
fs.writeFileSync("E:/myppt/src/data/constants.js", c, "utf8");
console.log("12 WORKS CREATED");
// Verify
const v = fs.readFileSync("E:/myppt/src/data/constants.js", "utf8");
const idx = v.indexOf("export const WORKS");
console.log(v.substring(idx, idx + 200));
const count = v.split("export const WORKS").length - 1;
console.log("WORKS count:", count);
// Check for cover field
console.log("Has cover field:", v.includes('cover'));
