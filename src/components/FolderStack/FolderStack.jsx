 /* ===== FolderStack 文件夹堆叠组件 =====
 * Hero 区核心交互模块：5 个文件夹叠加轮播
 * 自动轮播 + hover 暂停 + 悬停扇形展开
 * 入参：topIdx - 当前顶层索引，start - 启动轮播，stop - 停止轮播
 */
 import { FOLDERS } from "../../data/constants"
 
 export default function FolderStack({ topIdx, start, stop, onFolderClick }) {
   return (
     <div className="folder-stack" onMouseEnter={stop} onMouseLeave={start}>
       {FOLDERS.map((f, i) => {
         /* 计算相对层级位置：0 为顶层，4 为底层 */
         const relIdx = (i - topIdx + 4) % 4
         return (
           <div
             key={i}
             className="folder"
            style={{ "--idx": relIdx, background: f.cover, cursor: "pointer" }}
            onClick={() => { document.title = "Folder: " + f.id; onFolderClick && onFolderClick(f.id); }}
           >
             {/* 文件夹标签 */}
             <div className="folder-tab"></div>
             {/* 封面预览区 */}
             <div
               className="folder-preview"
               style={{ background: f.bgImage || f.cover, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.9) saturate(.8)" }}
             ></div>
             {/* 标题信息 */}
             <div className="folder-info">
               <strong className="folder-title">{f.title}</strong>
               <span className="folder-sub">{f.sub}</span>
             </div>
           </div>
         )
       })}
     </div>
   )
 }
