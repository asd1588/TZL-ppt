import React, { useState, useCallback, Suspense } from "react"
import "./App.css"
import { NOTICE_DURATION, CAROUSEL_INTERVAL, HERO } from "./data/constants"
import useCarousel from "./hooks/useCarousel"
import Header from "./components/Header/Header"
const PixelBlast = React.lazy(() => import("./components/PixelBlast/PixelBlast"))
import FolderStack from "./components/FolderStack/FolderStack"
import VinylPlayer from "./components/VinylPlayer/VinylPlayer"
import WorkTypes from "./components/WorkTypes/WorkTypes"
import ThemeShowcase from "./components/ThemeShowcase/ThemeShowcase"
import WorksGallery from "./components/WorksGallery/WorksGallery"
import Contact from "./components/Contact/Contact"
import Notification from "./components/Notification/Notification"

export default function App() {
  const [notice, setNotice] = useState("")
  const showNotice = useCallback((msg) => { setNotice(msg); setTimeout(() => setNotice(""), NOTICE_DURATION) }, [])
  const { topIdx, start, stop } = useCarousel(CAROUSEL_INTERVAL, 5)
  const [selectedType, setSelectedType] = useState(null)
  const [focusedWork, setFocusedWork] = useState(null)
  const onFolderClick = useCallback((folderId) => {
    setFocusedWork(folderId)
    const el = document.getElementById("works")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  const onThemeClick = useCallback((themeId) => {
    setFocusedWork(themeId)
    const el = document.getElementById("works")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])
  const scrollTo = useCallback((id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }) }, [])

  return (
    <div className="shell">
      <Header showNotice={showNotice} scrollTo={scrollTo} onSearchSelect={onThemeClick} />
      <main className="main">
        <section className="hero" id="hero" style={{position:"relative"}}>
          <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
            <Suspense fallback={<div />}>
            <PixelBlast variant="circle" pixelSize={4} color="#2d3445" patternScale={2} patternDensity={0.8} enableRipples liquid transparent speed={0.3} edgeFade={0.3} />
            </Suspense>
          </div>
          <div className="hero-left" style={{position:"relative",zIndex:1}}>
            <div className="hero-text">
              <div className="eyebrow"><span className="dot"></span> {HERO.eyebrow}</div>
              <h1>{HERO.title}<em>{HERO.titleEm}</em><br />{HERO.titleEnd}</h1>
              <p className="intro">{HERO.intro}</p>
            </div>
            <VinylPlayer />
          </div>
          <div className="hero-right" style={{position:"relative",zIndex:1}}>
            <FolderStack topIdx={topIdx} start={start} stop={stop} onFolderClick={onThemeClick} />
          </div>
          <div className="doodle-area">
            <span className="squiggle s1"></span><span className="squiggle s2"></span>
            <span className="squiggle s3"></span><span className="sparkle"></span>
          </div>
        </section>
        <WorkTypes id="types" activeType={selectedType} onSelect={setSelectedType} scrollTo={scrollTo} />
        <ThemeShowcase id="themes" activeType={selectedType} onSelect={setSelectedType} onThemeClick={onThemeClick} />
        <WorksGallery id="works" focusedWork={focusedWork} onFocusClear={() => setFocusedWork(null)} />
        <Contact id="contact" />
      </main>
      <Notification message={notice} />
    </div>
  )
}
