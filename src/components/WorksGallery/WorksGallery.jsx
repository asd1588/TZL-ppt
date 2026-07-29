/* ===== WorksGallery ===== */
import { useState, useEffect, useRef } from "react"
import TiltedCard from "../TiltedCard/TiltedCard"
import { WORKS } from "../../data/constants"

const LIMIT = 4
const PREVIEWS = {
  "folder-cover":"/ppt/folder-cover/index.html",
  "folder-showcase":"/ppt/folder-showcase/index.html",
  "folder-creative":"/ppt/folder-creative/index.html",
  "folder-works":"/ppt/folder-works/index.html",
  theme01:"/ppt/bp-plan/index.html",theme02:"/ppt/ai-tech/index.html",theme03:"/ppt/tech-arch/index.html",
  theme04:"/ppt/brand-launch/index.html",theme05:"/ppt/market-data/index.html",theme06:"/ppt/data-report/index.html",
  theme07:"/ppt/research/index.html",theme08:"/ppt/luxury-brand/index.html",theme09:"/ppt/brand-story/index.html",
  theme10:"/ppt/finance-report/index.html",theme11:"/ppt/growth-plan/index.html",theme12:"/ppt/music-festival/index.html"
}

export default function WorksGallery({ id, focusedWork, onFocusClear }) {
  const [focusId, setFocusId] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const galleryRef = useRef(null)

  useEffect(() => {
    if (!focusedWork) { setFocusId(null); return }
    setFocusId(focusedWork)
  }, [focusedWork])

  const focusedDisplay = focusId ? WORKS.filter(w => w.themeId === focusId) : null
  const display = focusedDisplay || (showAll ? WORKS : WORKS.slice(0, LIMIT))

  const handleClick = (w) => {
    const url = PREVIEWS[w.themeId]
    if (url) window.open(url, "_blank")
  }

  return (
    <section className="works-section" id={id}>
      <div className="section-head">
        <div>
          <h2>作品展示</h2>
          <p>12 套 5 页精致模板</p>
        </div>
        <button className="view-all" onClick={() => { if (focusId) { onFocusClear && onFocusClear(); setFocusId(null); setShowAll(false); } else { setShowAll(!showAll); } }}>
          {focusId ? "← 回到精选" : (showAll ? "收起 ↑" : "查看全部 →")}
        </button>
      </div>
      {focusedDisplay ? (
        <div className="gallery gallery-focused">
          {focusedDisplay.map((w, i) => {
            const card = (
              <article
                key={i}
                data-theme={w.themeId}
                className={"work" + (focusId === w.themeId ? " work-focused" : "")}
                onClick={() => handleClick(w)}
              >
                <div className="tilt-card-art" style={{ height: "143px", borderRadius: "14px 14px 0 0", background: w.cover || w.color }}>
                  {PREVIEWS[w.themeId] && <span className="work-preview-badge">▶ 预览</span>}
                </div>
                <div className="tilt-card-body">
                  <span className="tag">{w.tag}</span>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </article>
            );
            return (
              <TiltedCard
                key={i}
                captionText={w.title}
                containerHeight="auto"
                imageHeight="143px"
                scaleOnHover={1.03}
                rotateAmplitude={6}
                showTooltip={true}
              >
                {card}
              </TiltedCard>
            );
          })}
        </div>
      ) : (
        <div ref={galleryRef} className={"gallery" + (showAll ? "" : " gallery-collapsed")}>
          {display.map((w, i) => {
            const card = (
              <article
                data-theme={w.themeId}
                className={"work" + (focusId === w.themeId ? " work-focused" : "")}
                style={{ animationDelay: (i % 4) * 0.08 + "s", cursor: PREVIEWS[w.themeId] ? "pointer" : "default" }}
                onClick={() => handleClick(w)}
              >
                <div className="tilt-card-art" style={{ height: "110px", borderRadius: "14px 14px 0 0", background: w.cover || w.color }}>
                  {PREVIEWS[w.themeId] && <span className="work-preview-badge">▶ 预览</span>}
                </div>
                <div className="tilt-card-body">
                  <span className="tag">{w.tag}</span>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </article>
            );
            return !showAll ? (
              <TiltedCard
                key={i}
                captionText={w.title}
                containerHeight="auto"
                imageHeight="165px"
                scaleOnHover={1.03}
                rotateAmplitude={6}
                showTooltip={true}
              >
                {card}
              </TiltedCard>
            ) : card;
          })}
        </div>
      )}
    </section>
  )
}