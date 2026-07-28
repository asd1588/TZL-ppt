const fs = require("fs");
let w = `/* ===== WorksGallery ===== */
import { useState } from "react"
import { WORKS } from "../../data/constants"

const LIMIT = 4
const PREVIEWS = {
  theme04:"/ppt/covers/brand.html",theme08:"/ppt/covers/brand.html",theme09:"/ppt/covers/brand.html",
  theme05:"/ppt/covers/data.html",theme06:"/ppt/covers/data.html",theme10:"/ppt/covers/data.html",
  theme01:"/ppt/covers/creative.html",theme11:"/ppt/covers/creative.html",theme12:"/ppt/covers/creative.html",
  theme02:"/ppt/covers/education.html",theme03:"/ppt/covers/education.html",theme07:"/ppt/covers/education.html",
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
          <h2>\u4f5c\u54c1\u5c55\u793a</h2>
          <p>4 \u5957 5 \u9875\u7cbe\u81f4\u6a21\u677f</p>
        </div>
        <button className="view-all" onClick={() => setShowAll(!showAll)}>
          {showAll ? "\u6536\u8d77 \u2191" : "\u67e5\u770b\u5168\u90e8 \u2192"}
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
            <div className="art" style={{ background: PREVIEWS[w.themeId] ? "#eef2f5" : w.color }}>
              {PREVIEWS[w.themeId]
                ? <iframe
                    src={PREVIEWS[w.themeId]}
                    className="ppt-preview-iframe"
                    title={w.title}
                    loading="lazy"
                  />
                : <div className="art-shape"></div>
              }
              {PREVIEWS[w.themeId] && <span className="work-preview-badge">\u25b6 \u9884\u89c8</span>}
            </div>
            <span className="tag">{w.tag}</span>
            <h3>{w.title}</h3>
            <p>{w.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}`;
fs.writeFileSync("E:/myppt/src/components/WorksGallery/WorksGallery.jsx", w, "utf8");
console.log("GALLERY CREATED");
