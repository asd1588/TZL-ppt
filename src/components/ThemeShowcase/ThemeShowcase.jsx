 /* ===== ThemeShowcase 主题风格展示组件 =====
  * 展示 12 套主题风格卡片
  * 支持按 activeType 筛选
  */
 import { useMemo } from "react"
 import { THEMES, WORK_TYPES } from "../../data/constants"
 
 export default function ThemeShowcase({ id, activeType, onSelect }) {
   const filtered = useMemo(() => {
     if (!activeType) return THEMES
     const type = WORK_TYPES.find(t => t.label === activeType)
     if (!type?.related) return THEMES
     return type.related.map(r => THEMES.find(t => t.id === r)).filter(Boolean)
   }, [activeType])
 
   const typeInfo = useMemo(() => {
     if (!activeType) return null
     return WORK_TYPES.find(t => t.label === activeType) || null
   }, [activeType])
 
   return (
     <section className="themes" id={id}>
       <div className="section-head">
         <div>
           <h2>主题风格</h2>
           <p>
             {activeType
               ? <>{typeInfo?.icon} <strong>{activeType}</strong> · 推荐主题</>
               : "12 套预设风格，总有一款契合你的场景"}
           </p>
         </div>
         {activeType && (
           <button className="view-all" onClick={() => onSelect(null)}>
             显示全部 →
           </button>
         )}
       </div>
       <div className="theme-grid">
         {filtered.map((t, i) => (
           <div key={t.id} className="theme-card" style={{ animationDelay: (i % 4) * 0.06 + "s" }}>
             <div className="theme-colorbar" style={{ background: t.color }}>
               <span className="theme-accentbar" style={{ background: t.accent }}></span>
               <span className="theme-cid">{t.id.replace("theme", "#")}</span>
             </div>
             <div className="theme-body">
               <h3 className="theme-tname">{t.name}</h3>
               <p className="theme-style">{t.style}</p>
               <p className="theme-suit">{t.suit}</p>
               <p className="theme-audience">{t.audience}</p>
             </div>
           </div>
         ))}
       </div>
     </section>
   )
 }