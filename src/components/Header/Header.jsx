/* ===== Header ===== */
import { useState, useEffect, useCallback, useRef } from "react"
import { NAV, WORKS, THEMES, BRAND, SEARCH, SECTION_MAP } from "../../data/constants"

const SECTION_IDS = Object.values(SECTION_MAP)

export default function Header({ showNotice, scrollTo, onSearchSelect }) {
  const [activeItem, setActiveItem] = useState("棣栭〉")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const ticking = useRef(false)
  const searchRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    const calc = () => {
      const scrollY = window.scrollY + 100
      let best = { id: "", dist: Infinity }
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const dist = Math.abs(el.offsetTop - scrollY)
        if (dist < best.dist) { best = { id, dist } }
      }
      if (best.id) {
        const item = Object.keys(SECTION_MAP).find(k => SECTION_MAP[k] === best.id)
        if (item && item !== activeItem) setActiveItem(item)
      }
    }
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => { calc(); ticking.current = false })
        ticking.current = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    calc()
    return () => window.removeEventListener("scroll", onScroll)
  }, [activeItem])

  // Click outside to close search
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const doSearch = useCallback((q) => {
    if (!q.trim()) { setResults(null); return }
    const lower = q.toLowerCase()
    const works = WORKS.filter(w =>
      w.title.toLowerCase().includes(lower) ||
      w.tag.toLowerCase().includes(lower)
    ).slice(0, 4)
    const themes = THEMES.filter(t =>
      t.name.toLowerCase().includes(lower) ||
      t.style.toLowerCase().includes(lower) ||
      t.suit.toLowerCase().includes(lower)
    ).slice(0, 4)
    setResults({ works, themes })
  }, [])

  const handleInput = useCallback((e) => {
    const v = e.target.value
    setQuery(v)
    setSelectedIdx(-1)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      doSearch(v)
      setIsOpen(!!v)
    }, 200)
  }, [doSearch])

  const handleKeyDown = useCallback((e) => {
    if (!isOpen || !results) return
    const total = results.works.length + results.themes.length
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIdx(prev => Math.min(prev + 1, total - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIdx(prev => Math.max(prev - 1, -1))
    } else if (e.key === "Enter" && selectedIdx >= 0) {
      const items = [...results.works, ...results.themes]
      const item = items[selectedIdx]
      if (item) {
        const id = item.themeId || item.id
        setIsOpen(false)
        setQuery("")
        if (onSearchSelect) onSearchSelect(id)
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }, [isOpen, results, selectedIdx, onSearchSelect])

  const handleNavClick = useCallback((item) => {
    setActiveItem(item)
    scrollTo(SECTION_MAP[item])
  }, [scrollTo])

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <span className="brand-mark"></span>
          {BRAND.name}
        </div>
        <div className="search-wrap" ref={searchRef}>
          <label className="search">
            <input
              placeholder={SEARCH.placeholder}
              value={query}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(!!query)}
            />
            <span className="search-icon">⌕</span>
          </label>
          {isOpen && results && (results.works.length > 0 || results.themes.length > 0) && (
            <div className="search-dropdown">
              {results.works.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">浣滃搧</div>
                  {results.works.map((w, i) => (
                    <div key={w.themeId}
                      className={"search-item" + (selectedIdx === i ? " search-item-active" : "")}
                      onMouseDown={() => { setIsOpen(false); setQuery(""); if (onSearchSelect) onSearchSelect(w.themeId) }}
                    >
                      <span className="search-item-title">{w.title}</span>
                      <span className="search-item-tag">{w.tag}</span>
                    </div>
                  ))}
                </div>
              )}
              {results.themes.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">椋庢牸</div>
                  {results.themes.map((t, i) => {
                    const idx = (results.works.length) + i
                    return (
                      <div key={t.id}
                        className={"search-item" + (selectedIdx === idx ? " search-item-active" : "")}
                        onMouseDown={() => { setIsOpen(false); setQuery(""); if (onSearchSelect) onSearchSelect(t.id) }}
                      >
                        <span className="search-item-title">{t.name}</span>
                        <span className="search-item-tag">{t.style}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <nav className="nav">
          {NAV.map((item) => (
            <button
              key={item}
              className={item === "瀹氬埗" ? "nav-cta-orange" : "nav-btn" + (activeItem === item ? " active" : "")}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
