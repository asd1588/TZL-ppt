 /* ===== WorksGallery 作品展示组件 =====
 * 四列网格布局，展示精选 PPT 作品卡片
 * 入场动画（淡入上移）由 CSS animation 驱动
 */
 import { WORKS } from "../../data/constants"
 
 export default function WorksGallery() {
   return (
     <section className="works-section">
       {/* 标题区 */}
       <div className="section-head">
         <div>
           <h2>作品演示</h2>
           <p>四种表达方式，四个值得被看见的故事。</p>
         </div>
         <button className="view-all">查看全部 →</button>
       </div>
 
       {/* 卡片网格 */}
       <div className="gallery">
         {WORKS.map((w, i) => (
           <article key={i} className="work">
             {/* 抽象色块装饰（背景色由数据驱动） */}
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
