/* ===== ThemeShowcase 主题风格展示组件 =====
 * 默认显示 3 张，点击展开全部。卡片居中排版。  */
import { useState, useMemo } from "react"
import { THEMES, WORK_TYPES, SECTION_TITLES } from "../../data/constants"

const LIMIT = 3

export default function ThemeShowcase({ id, activeType, onSelect, onThemeClick }) {
  const [showAll, setShowAll] = useState(true)
  const isFiltered = !!activeType

  const filtered = useMemo(() => {
    if (!activeType) return THEMES
    const type = WORK_TYPES.find(t => t.label === activeType)
    if (!type?.related) return THEMES
    return type.related.map(r => THEMES.find(t => t.id === r)).filter(Boolean)
  }, [activeType])

  const display = isFiltered ? filtered : (showAll ? THEMES : THEMES.slice(0, LIMIT))

  const typeInfo = useMemo(() => {
    if (!activeType) return null
    return WORK_TYPES.find(t => t.label === activeType) || null
  }, [activeType])

  return (
    <section className="themes" id={id}>
      <div className="section-head">
        <div>
          <h2>{SECTION_TITLES.themes.title}</h2>
          <p>
            {isFiltered
              ? <>{typeInfo?.icon} <strong>{activeType}</strong> 路 推荐主题</>
              : SECTION_TITLES.themes.desc}
          </p>
        </div>
        {isFiltered
          ? <button className="view-all" onClick={() => { onSelect(null); setShowAll(true); }}>显示全部 →</button>
          : THEMES.length > LIMIT && (
              <button className="view-all" onClick={() => setShowAll(!showAll)}>
                {showAll ? SECTION_TITLES.works.collapse : SECTION_TITLES.works.showAll}
              </button>
            )
        }
      </div>
      <div className={"theme-grid" + (!isFiltered && showAll ? " theme-grid-expanded" : "")}>
        {display.map((t, i) => (
          <div key={t.id} className="theme-card" style={{ "--entry-delay": (i % 3) * 0.06 + "s", "--sway-delay": (i * 0.1 + 0.6) + "s", cursor: "pointer" }} onClick={() => onThemeClick && onThemeClick(t.id)}>
            <div className="theme-colorbar" style={{ background: t.color }}>
              <span className="theme-accentbar" style={{ background: t.accent }}></span>
              <span className="theme-cid">{t.id.replace("theme", "#")}</span>
            </div>
            <div className="theme-body">
              <h3 className="theme-tname">{t.name}</h3>
              <p className="theme-style">{t.style}</p>
              <p className="theme-suit">{t.suit}</p>
              <p className="theme-audience">{t.audience}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}




