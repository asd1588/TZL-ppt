import { useState, useCallback } from "react"
import "./App.css"
import { NOTICE_DURATION, CAROUSEL_INTERVAL } from "./data/constants"
import useCarousel from "./hooks/useCarousel"
import Header from "./components/Header/Header"
import FolderStack from "./components/FolderStack/FolderStack"
import WorkTypes from "./components/WorkTypes/WorkTypes"
import ThemeShowcase from "./components/ThemeShowcase/ThemeShowcase"
import WorksGallery from "./components/WorksGallery/WorksGallery"
import Contact from "./components/Contact/Contact"
import Notification from "./components/Notification/Notification"

export default function App() {
  const [notice, setNotice] = useState("")
  const showNotice = useCallback((msg) => {
    setNotice(msg); setTimeout(() => setNotice(""), NOTICE_DURATION)
  }, [])
  const { topIdx, start, stop } = useCarousel(CAROUSEL_INTERVAL, 5)
  const scrollTo = useCallback((sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])
  const [selectedType, setSelectedType] = useState(null)

  return (
    <div className="shell">
      <Header showNotice={showNotice} scrollTo={scrollTo} />
      <main className="main">
        <section className="hero" id="hero">
          <div className="hero-left">
            <div className="hero-text">
              <div className="eyebrow"><span className="dot"></span> 每周上新 · 创意演示灵感</div>
              <h1>让每一页<em>PPT</em><br />都有登场的勇气</h1>
              <p className="intro">从有趣的想法到动人的故事</p>
            </div>
            <div className="hero-earth-area">
              <div className="dash-line"></div>
              <div className="plane"><span className="propeller"></span><span className="plane-body">&#9992;</span></div>
              <div className="earth"></div><div className="orbit"></div>
            </div>
          </div>
          <div className="hero-right">
            <FolderStack topIdx={topIdx} start={start} stop={stop} />
          </div>
          <div className="doodle-area">
            <span className="squiggle s1"></span>
            <span className="squiggle s2"></span>
            <span className="squiggle s3"></span>
            <span className="sparkle"></span>
          </div>
        </section>
        <WorkTypes id="types" activeType={selectedType} onSelect={setSelectedType} scrollTo={scrollTo} />
        <ThemeShowcase id="themes" activeType={selectedType} onSelect={setSelectedType} />
        <WorksGallery id="works" />
        <Contact id="contact" />
      </main>
      <Notification message={notice} />
    </div>
  )
}