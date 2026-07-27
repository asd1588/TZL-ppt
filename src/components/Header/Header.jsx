 /* ===== Header 导航栏组件 =====
  * 固定顶部导航栏，含品牌 Logo、搜索框、菜单项
  * 每个导航项点击后通过 scrollTo 跳转到对应 section
  */
 import { NAV } from "../../data/constants"
 
 /** 导航项 → section id 映射 */
 const SECTION_MAP = { "首页": "hero", "模板类型": "types", "作品": "works", "定制": "contact" }
 
 export default function Header({ showNotice, scrollTo }) {
   return (
     <header className="header">
       <div className="header-inner">
         <div className="brand">
           <span className="brand-mark"></span>
           TZLPPT
         </div>
         <label className="search">
           <input
             placeholder="搜索 PPT 作品"
             onKeyDown={e => {
               if (e.key === "Enter")
                 showNotice(e.target.value ? "搜索：" + e.target.value : "全部作品")
             }}
           />
           <span className="search-icon">⌕</span>
         </label>
         <nav className="nav">
           {NAV.map((item, i) => (
             <button
               key={item}
               className={"nav-btn" + (i === 0 ? " active" : "") + (item === "定制" ? " nav-cta-orange" : "")}
               onClick={() => scrollTo(SECTION_MAP[item])}
             >
               {item}
             </button>
           ))}
         </nav>
       </div>
     </header>
   )
 }