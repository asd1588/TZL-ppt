 /* ===== useCarousel 自定义 Hook =====
 * 提供自动轮播功能，支持暂停/恢复
 * 入参：interval - 轮播间隔（毫秒），默认 3500
 * 返回：{ topIdx, start, stop } - 当前索引、启动轮播、停止轮播
 */
 import { useState, useRef, useCallback, useEffect } from "react"
 
 export default function useCarousel(interval = 3500, total = 5) {
   const [topIdx, setTopIdx] = useState(0)
   const timerRef = useRef(null)
 
   const stop = useCallback(() => {
     if (timerRef.current) {
       clearInterval(timerRef.current)
       timerRef.current = null
     }
   }, [])
 
   const start = useCallback(() => {
     stop()
     timerRef.current = setInterval(() => {
       setTopIdx(prev => (prev + 1) % total)
     }, interval)
   }, [interval, total, stop])
 
   // 组件挂载时自动启动，卸载时自动清理
   useEffect(() => {
     start()
     return stop
   }, [start, stop])
 
   return { topIdx, start, stop }
 }
