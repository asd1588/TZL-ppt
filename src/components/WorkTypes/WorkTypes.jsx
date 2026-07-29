import { useRef, useCallback, useEffect } from "react"
import { WORK_TYPES, SECTION_TITLES } from "../../data/constants"

const CARD = [...WORK_TYPES, ...WORK_TYPES, ...WORK_TYPES]
const CARD_GAP = 20
const SCROLL_SPEED = 40

export default function WorkTypes({ id, activeType, onSelect, scrollTo }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const state = useRef({ offset: 0, dragging: false, startX: 0, startOffset: 0 })
  const rafId = useRef(null)
  const lastTick = useRef(0)

  const oneSetWidth = useCallback(() => {
    const tr = trackRef.current
    if (!tr) return 1
    const cards = tr.children
    if (cards.length < 4) return 1
    let total = 0
    for (let i = 0; i < 4; i++) {
      total += cards[i].offsetWidth || 160
    }
    return total + CARD_GAP * 3
  }, [])

  const tick = useCallback((timestamp) => {
    const s = state.current
    if (s.dragging) return
    if (lastTick.current) {
      const dt = Math.min(timestamp - lastTick.current, 50)
      s.offset -= (SCROLL_SPEED * dt) / 1000
    }
    lastTick.current = timestamp
    const setW = oneSetWidth()
    if (setW > 0 && s.offset <= -setW) {
      s.offset += setW
    }
    if (trackRef.current) {
      trackRef.current.style.transform = "translateX(" + s.offset + "px)"
    }
    rafId.current = requestAnimationFrame(tick)
  }, [oneSetWidth])

  useEffect(() => {
    lastTick.current = 0
    rafId.current = requestAnimationFrame((ts) => { lastTick.current = ts; tick(ts) })
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current) }
  }, [tick])

  const onPointerDown = useCallback((e) => {
    const s = state.current
    s.dragging = true
    s.startX = e.clientX
    s.startOffset = s.offset
    if (rafId.current) cancelAnimationFrame(rafId.current)
    wrapRef.current?.classList.add("grabbing")
  }, [])

  const onPointerMove = useCallback((e) => {
    const s = state.current
    if (!s.dragging) return
    const dx = e.clientX - s.startX
    s.offset = s.startOffset + dx
    if (trackRef.current) {
      trackRef.current.style.transform = "translateX(" + s.offset + "px)"
    }
  }, [])

  const onPointerUp = useCallback(() => {
    const s = state.current
    s.dragging = false
    wrapRef.current?.classList.remove("grabbing")
    lastTick.current = 0
    rafId.current = requestAnimationFrame((ts) => { lastTick.current = ts; tick(ts) })
  }, [tick])

  const onPointerLeave = useCallback(() => {
    const s = state.current
    if (s.dragging) {
      s.dragging = false
      wrapRef.current?.classList.remove("grabbing")
    }
    lastTick.current = 0
    if (!rafId.current) {
      rafId.current = requestAnimationFrame((ts) => { lastTick.current = ts; tick(ts) })
    }
  }, [tick])

  return (
    <section className="work-types" id={id}>
      <div className="section-head">
        <div>
          <h2>{SECTION_TITLES.workTypes.title}</h2><p>{SECTION_TITLES.workTypes.desc}</p>
        </div>
      </div>
      <div className="carousel-wrap work-types-drag"
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        style={{ overflow: "hidden", touchAction: "pan-y" }}
      >
        <div className="carousel-track" ref={trackRef} style={{ transform: "translateX(0)", willChange: "transform" }}>
          {CARD.map((t, i) => (
            <div
              key={i}
              className={"type-card" + (activeType === t.label ? " type-active" : "")}
              style={activeType !== t.label ? { background: "url(/img/folder-" + ((i % 4) + 1) + ".png) center/cover no-repeat" } : undefined}
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

