 /* ===== WorkTypes 作品类型展示组件 =====
  * 四列卡片无限走马灯循环
  * click 选中→筛选主题 + 自动跳转到风格模块
  */
 import { WORK_TYPES } from "../../data/constants"
 
 const CARD = [...WORK_TYPES, ...WORK_TYPES, ...WORK_TYPES]
 
 export default function WorkTypes({ id, activeType, onSelect, scrollTo }) {
   return (
     <section className="work-types" id={id}>
       <div className="section-head">
         <div>
           <h2>作品类型</h2>
           <p>四种表达方式，总有一种适合你的故事</p>
         </div>
       </div>
       <div className="carousel-wrap">
         <div className="carousel-track">
           {CARD.map((t, i) => (
             <div
               key={i}
               className={"type-card" + (activeType === t.label ? " type-active" : "")}
               onClick={() => {
                 const next = t.label === activeType ? null : t.label
                 onSelect(next)
                 if (next) scrollTo("themes")
               }}
             >
               <span className="type-icon">{t.icon}</span>
               <span className="type-label">{t.label}</span>
             </div>
           ))}
         </div>
       </div>
     </section>
   )
 }