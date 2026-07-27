 /* ===== Header 导航栏组件 =====
  * 基于 scroll + offsetTop 对比确定当前高亮 section
  * 点击立即高亮，不依赖 IntersectionObserver 延迟
  */
 import { useState, useEffect, useCallback, useRef } from "react"
 import { NAV } from "../../data/constants"
 
 const SECTION_MAP = { "首页": "hero", "模板类型": "types", "作品": "works", "定制": "contact" }
 const SECTION_IDS = Object.values(SECTION_MAP)
 
 export default function Header({ showNotice, scrollTo }) {
   const [activeItem, setActiveItem] = useState("首页")
   const ticking = useRef(false)
 
   /* 滚动时找最接近视口顶部（+100px 头部偏移）的 section */
   useEffect(() => {
     const calc = () => {
       const scrollY = window.scrollY + 100
       let best = { id: "", dist: Infinity }
       for (const id of SECTION_IDS) {
         const el = document.getElementById(id)
         if (!el) continue
         const dist = Math.abs(el.offsetTop - scrollY)
         if (dist < best.dist) { best = { id, dist } }
       }
       if (best.id) {
         const item = Object.keys(SECTION_MAP).find(k => SECTION_MAP[k] === best.id)
         if (item && item !== activeItem) setActiveItem(item)
       }
     }
     const onScroll = () => {
       if (!ticking.current) {
         requestAnimationFrame(() => { calc(); ticking.current = false })
         ticking.current = true
       }
     }
     window.addEventListener("scroll", onScroll, { passive: true })
     calc()
     return () => window.removeEventListener("scroll", onScroll)
   }, [activeItem])
 
   const handleNavClick = useCallback((item) => {
     setActiveItem(item)
     scrollTo(SECTION_MAP[item])
   }, [scrollTo])
 
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
           {NAV.map((item) => (
             <button
               key={item}
               className={
                 item === "定制"
                   ? "nav-cta-orange"
                   : "nav-btn" + (activeItem === item ? " active" : "")
               }
               onClick={() => handleNavClick(item)}
             >
               {item}
             </button>
           ))}
         </nav>
       </div>
     </header>
   )
 }