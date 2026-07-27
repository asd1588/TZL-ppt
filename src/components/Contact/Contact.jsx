 /* ===== Contact 联系方式组件 =====
  * 三栏布局：微信 / 邮箱 / 二维码
  * 支持 forwardRef + id 实现锚点滚动
  */
 import { forwardRef } from "react"
 import { CONTACTS } from "../../data/constants"
 
 const Contact = forwardRef(function Contact(props, ref) {
   const { id } = props
   return (
     <section className="contact" id={id} ref={ref}>
       <div className="section-head">
         <div>
           <h2>联系我们</h2>
           <p>定制属于你的专属 PPT</p>
         </div>
       </div>
       <div className="contact-grid">
         {CONTACTS.map((c, i) => (
           <div key={i} className="contact-card">
             <span className="contact-icon">{c.icon}</span>
             <h3>{c.label}</h3>
             <p className="contact-value">{c.value}</p>
             <p className="contact-desc">{c.desc}</p>
           </div>
         ))}
       </div>
     </section>
   )
 })
 
 export default Contact