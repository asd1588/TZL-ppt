import { useState, useRef, useCallback, useEffect } from "react"
import "./VinylPlayer.css"

const BAR_BLOCKS = [
  8,5,6,1,8,4,7,9,4,6,10,1,7,5,8,4,9,1,6,8,4,7,5,10,
  1,9,6,4,8,7,5,6,10,4,1,8,5,7,9,4,6,1,8,10,5,7,4,9,6,5,4,8,2,7,5,9,3,6,8,4
]

export default function VinylPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const analyserRef = useRef(null)
  const rafRef = useRef(null)
  const wrapperRef = useRef(null)
  const initDone = useRef(false)

  const startLoop = useCallback(() => {
    const loop = () => {
      if (!analyserRef.current) return
      const data = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(data)
      const bars = document.querySelectorAll(".vp-spectrum .vp-bar")
      const step = Math.max(1, Math.floor(data.length / bars.length))
      for (let i = 0; i < bars.length; i++) {
        const idx = Math.min(i * step, data.length - 1)
        const val = data[idx] / 255
        bars[i].style.setProperty("--b", Math.max(1, Math.min(10, Math.round(val * 10))))
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
  }, [])

  // Init audio context once on mount
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || initDone.current) return
    const init = async () => {
      try {
        if (audio.readyState < 2) await new Promise(r => { audio.addEventListener("loadedmetadata", r, { once: true }); audio.load() })
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const src = ctx.createMediaElementSource(audio)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 256
        src.connect(analyser)
        analyser.connect(ctx.destination)
        ctxRef.current = ctx
        analyserRef.current = analyser
        initDone.current = true
        // Try autoplay
        await ctx.resume()
        await audio.play()
        setPlaying(true)
        wrapperRef.current?.classList.add("vp-audio")
        startLoop()
      } catch { /* autoplay blocked, waiting for click */ }
    }
    init()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (ctxRef.current) ctxRef.current.close()
    }
  }, [startLoop])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !initDone.current) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      wrapperRef.current?.classList.remove("vp-audio")
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    } else {
      ctxRef.current?.resume()
      audio.play().then(() => {
        setPlaying(true)
        wrapperRef.current?.classList.add("vp-audio")
        startLoop()
      }).catch(() => setPlaying(false))
    }
  }, [playing, startLoop])

  return (
    <div className={"vp-wrapper" + (playing ? "" : " vp-paused")} ref={wrapperRef}>
      <audio ref={audioRef} src="/audio/稻香.mp3" loop preload="auto" />
      <div className="vp-turntable" onClick={togglePlay}>
        <div className="vp-vinyl">
          <div className="vp-grooves"></div>
          <div className="vp-label"></div>
        </div>
        <svg className="vp-tonearm" viewBox="0 0 50 60">
          <defs>
            <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#999" />
              <stop offset="100%" stopColor="#555" />
            </linearGradient>
          </defs>
          <circle cx="42" cy="8" r="7" fill="url(#armGrad)" />
          <rect x="8" y="6" width="35" height="4" rx="2" fill="#888" />
          <rect x="4" y="4" width="6" height="10" rx="1" fill="#666" />
          <polygon points="7,14 4,20 10,20" fill="#aaa" />
        </svg>
        <div className="vp-play-hint">
          <svg viewBox="0 0 24 24" width="16" height="16">
            {playing
              ? <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
              : <path d="M8 5v14l11-7z" fill="currentColor" />
            }
          </svg>
        </div>
      </div>
      <div className="vp-spectrum">
        {BAR_BLOCKS.map((b, i) => (
          <span key={i} className="vp-bar" style={{"--b": b, "--i": i}}></span>
        ))}
      </div>
    </div>
  )
}
