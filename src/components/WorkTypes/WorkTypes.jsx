import { useRef, useCallback, useEffect } from "react"
import { WORK_TYPES } from "../../data/constants"

const CARD = [...WORK_TYPES, ...WORK_TYPES, ...WORK_TYPES]

export default function WorkTypes({ id, activeType, onSelect, scrollTo }) {
  const wrapRef = useRef(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const autoTimer = useRef(null)

  const stopAuto = useCallback(() => {
    if (autoTimer.current) { clearInterval(autoTimer.current); autoTimer.current = null }
  }, [])

  const startAuto = useCallback(() => {
    stopAuto()
    autoTimer.current = setInterval(() => {
      if (!wrapRef.current) return
      wrapRef.current.scrollLeft += 0.8
      if (wrapRef.current.scrollLeft >= wrapRef.current.scrollWidth / 2) {
        wrapRef.current.scrollLeft = 0
      }
    }, 20)
  }, [stopAuto])

  useEffect(() => { startAuto(); return stopAuto }, [startAuto, stopAuto])

  const onPointerDown = useCallback((e) => {
    isDown.current = true
    startX.current = e.clientX
    scrollLeftStart.current = wrapRef.current?.scrollLeft || 0
    stopAuto()
    wrapRef.current?.classList.add("grabbing")
  }, [stopAuto])

  const onPointerMove = useCallback((e) => {
    if (!isDown.current) return
    wrapRef.current.scrollLeft = scrollLeftStart.current - (e.clientX - startX.current)
  }, [])

  const onPointerUp = useCallback(() => {
    isDown.current = false
    wrapRef.current?.classList.remove("grabbing")
    startAuto()
  }, [startAuto])

  return (
    <section className="work-types" id={id}>
      <div className="section-head">
        <div>
          <h2>作品类型</h2>
          <p>四种表达方式，总有一种适合你的故事</p>
        </div>
      </div>
      <div className="carousel-wrap work-types-drag"
        ref={wrapRef}
        onMouseEnter={stopAuto}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={()=>{if(isDown.current){isDown.current=false;wrapRef.current?.classList.remove("grabbing")}startAuto()}}
      >
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