 /* ===== WorksGallery 作品展示组件 =====
  * 四列 × 三行网格布局，入场动画由 CSS animation 驱动
  */
 import { WORKS } from "../../data/constants"
 
 export default function WorksGallery({ id }) {
   return (
     <section className="works-section" id={id}>
       <div className="section-head">
         <div>
           <h2>作品展示</h2>
           <p>四大类型 × 每类三套，5 页精致模板</p>
         </div>
         <button className="view-all">查看全部 →</button>
       </div>
       <div className="gallery">
         {WORKS.map((w, i) => (
           <article key={i} className="work" style={{ animationDelay: (i % 4) * 0.08 + "s" }}>
             <div className="art" style={{ background: w.color }}>
               <div className="art-shape"></div>
             </div>
             <span className="tag">{w.tag}</span>
             <h3>{w.title}</h3>
             <p>{w.desc}</p>
           </article>
         ))}
       </div>
     </section>
   )
 }