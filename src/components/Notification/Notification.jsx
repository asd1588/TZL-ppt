 /* ===== Notification 通知条组件 =====
 * 固定底部居中浮层，显示提示信息后自动消失
 * 入参：message - 要显示的文字（空字符串则隐藏）
 */
 export default function Notification({ message }) {
   return (
     <div className={"notice" + (message ? " show" : "")}>
       {message}
     </div>
   )
 }
