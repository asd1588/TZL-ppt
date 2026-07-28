const fs = require("fs");
const c = fs.readFileSync("E:/myppt/src/data/constants.js", "utf8");
const s = c.indexOf("export const WORKS = [");
const s2 = c.indexOf("[", s);
const e = c.indexOf("];", c.indexOf("};", s)) + 2;
const n = "[\n  {themeId:\"theme04\",tag:\"\u54c1\u724c\u63d0\u6848\",title:\"\u5e74\u8f7b\u5316\u4ea7\u54c1\u53d1\u5e03\u4f1a\",desc:\"5\u9875 / \u7c89\u7cd6\u679c\u8272\",color:\"#f8c8d8\"},\n  {themeId:\"theme04\",tag:\"\u54c1\u724c\u63d0\u6848\",title:\"\u5e74\u8f7b\u5316\u4ea7\u54c1\u53d1\u5e03\u4f1a\",desc:\"5\u9875 / \u7c89\u7cd6\u679c\u8272\",color:\"#f8c8d8\"},\n  {themeId:\"theme01\",tag:\"\u521b\u610f\u7b56\u5212\",title:\"\u521b\u4e1a\u9879\u76eeBP\u63d0\u6848\",desc:\"5\u9875 / \u6e29\u6696\u7c73\u8272\",color:\"#e8dcc8\"},\n  {themeId:\"theme02\",tag:\"\u6559\u80b2\u57f9\u8bad\",title:\"\u79d1\u6280\u521b\u65b0\u6210\u679c\u6c47\u62a5\",desc:\"5\u9875 / \u7d2b\u7eff\u6e10\u53d8\",color:\"#b8a0d8\"}\n]";
const result = c.substring(0, s2) + n + c.substring(e);
fs.writeFileSync("E:/myppt/src/data/constants.js", result, "utf8");
const v = fs.readFileSync("E:/myppt/src/data/constants.js", "utf8");
const count = v.split("export const WORKS").length - 1;
console.log("WORKS count:", count);
const wi = v.indexOf("export const WORKS");
console.log(v.substring(wi, wi + 400));
try { new Function(v); console.log("SYNTAX OK"); } catch (err) { console.log("SYNTAX:", err.message); }
