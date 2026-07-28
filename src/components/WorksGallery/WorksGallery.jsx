/* ===== WorksGallery ===== */
import { useState } from "react"
import { WORKS } from "../../data/constants"

const LIMIT = 4
const PREVIEWS = {
  theme01:"/ppt/bp-plan/index.html",theme02:"/ppt/ai-tech/index.html",theme03:"/ppt/tech-arch/index.html",
  theme04:"/ppt/brand-launch/index.html",theme05:"/ppt/market-data/index.html",theme06:"/ppt/data-report/index.html",
  theme07:"/ppt/research/index.html",theme08:"/ppt/luxury-brand/index.html",theme09:"/ppt/brand-story/index.html",
  theme10:"/ppt/finance-report/index.html",theme11:"/ppt/growth-plan/index.html",theme12:"/ppt/music-festival/index.html",
}

export default function WorksGallery({ id }) {
  const [showAll, setShowAll] = useState(false)
  const display = showAll ? WORKS : WORKS.slice(0, LIMIT)

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
        <button className="view-all" onClick={() => setShowAll(!showAll)}>
          {showAll ? "收起 ↑" : "查看全部 →"}
        </button>
      </div>
      <div className={"gallery" + (showAll ? "" : " gallery-collapsed")}>
        {display.map((w, i) => (
          <article
            key={i}
            className="work"
            style={{ animationDelay: (i % 4) * 0.08 + "s", cursor: PREVIEWS[w.themeId] ? "pointer" : "default" }}
            onClick={() => handleClick(w)}
          >
            <div className="art" style={{ background: w.cover || w.color }}>
              {PREVIEWS[w.themeId] && <span className="work-preview-badge">▶ 预览</span>}
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