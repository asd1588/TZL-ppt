 /* ===== App 主应用组件 =====
 * 组合所有页面模块，管理全局通知和文件夹轮播状态
 * 子组件：Header, Hero区(含FolderStack/Doodle/Plane),
 *         WorksGallery, Notification
 */
 import { useState, useCallback } from "react"
 import "./App.css"
 import { NOTICE_DURATION, CAROUSEL_INTERVAL } from "./data/constants"
 import useCarousel from "./hooks/useCarousel"
 import Header from "./components/Header/Header"
 import FolderStack from "./components/FolderStack/FolderStack"
 import WorksGallery from "./components/WorksGallery/WorksGallery"
 import Notification from "./components/Notification/Notification"
 
 export default function App() {
   /* ===== 通知状态 ===== */
   const [notice, setNotice] = useState("")
   const showNotice = useCallback((msg) => {
     setNotice(msg)
     setTimeout(() => setNotice(""), NOTICE_DURATION)
   }, [])
 
   /* ===== 文件夹轮播状态 ===== */
   const { topIdx, start, stop } = useCarousel(CAROUSEL_INTERVAL, 5)
 
   return (
     <div className="shell">
       {/* 顶部导航栏 */}
       <Header showNotice={showNotice} />
 
       <main className="main">
         {/* ===== Hero 英雄区 ===== */}
         <section className="hero">
           {/* 左侧文案 */}
           <div className="hero-content">
             <div className="eyebrow">
               <span className="dot"></span> 每周上新 · 创意演示灵感
             </div>
             <h1>
               让每一页<em>PPT</em>
               <br />
               都有登场的勇气
             </h1>
             <p className="intro">
               从有趣的想法到动人的故事，为你的表达找到一份恰到好处的视觉灵感。
             </p>
           </div>
 
           {/* 手绘装饰元素 */}
           <div className="doodle-area">
             <span className="squiggle s1"></span>
             <span className="squiggle s2"></span>
             <span className="squiggle s3"></span>
             <span className="sparkle"></span>
           </div>
 
           {/* 虚线轨迹 */}
           <div className="dash-line"></div>
 
           {/* 螺旋桨飞机 */}
           <div className="plane">
             <span className="propeller"></span>
             <span className="plane-body">&#9992;</span>
           </div>
 
           {/* 文件夹堆叠（核心交互） */}
           <FolderStack topIdx={topIdx} start={start} stop={stop} />
 
           {/* 装饰：地球 + 轨道环 */}
           <div className="earth"></div>
           <div className="orbit"></div>
         </section>
 
         {/* 作品展示 */}
         <WorksGallery />
       </main>
 
       {/* 全局通知条 */}
       <Notification message={notice} />
     </div>
   )
 }
