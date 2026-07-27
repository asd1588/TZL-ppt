 /* ===== Header 导航栏组件 =====
 * 固定顶部导航栏，包含品牌 Logo、搜索框、菜单项
 * 「定制」菜单项显示为橙色按钮
 * 入参：showNotice - 通知回调函数
 */
 import { NAV } from "../../data/constants"
 
 export default function Header({ showNotice }) {
   return (
     <header className="header">
       <div className="header-inner">
         {/* 品牌标识：文件夹图标 + 名称 */}
         <div className="brand">
           <span className="brand-mark"></span>
           TZLPPT
         </div>
 
         {/* 搜索框：回车触发通知 */}
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
 
         {/* 导航菜单：「定制」为橙色按钮 */}
         <nav className="nav">
           {NAV.map((item, i) => (
             <button
               key={item}
               className={
                 "nav-btn" +
                 (i === 0 ? " active" : "") +
                 (item === "定制" ? " nav-cta-orange" : "")
               }
               onClick={() => showNotice(item + "即将上线")}
             >
               {item}
             </button>
           ))}
         </nav>
       </div>
     </header>
   )
 }
