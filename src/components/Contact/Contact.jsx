/* ===== Contact 联系方式组件 =====
 * 三卡布局：小红书 + 微信(可翻转) + 咸鱼(可翻转)
 * 卡片内容全部由 src/data/siteConfig.js 的 CONTACT_CARDS 控制
 */
import { useState, forwardRef } from "react"
import { CONTACTS, CONTACT_CARDS, SECTION_TITLES } from "../../data/constants"

const xhs = CONTACT_CARDS.xiaohongshu
const wx = CONTACT_CARDS.wechat
const xy = CONTACT_CARDS.xianyu

const Contact = forwardRef(function Contact(props, ref) {
  const { id } = props
  const [flippedWx, setFlippedWx] = useState(false)
  const [flippedXy, setFlippedXy] = useState(xy.defaultFlipped)
  const cards = CONTACTS.filter(c => c.label !== "\u4e8c\u7ef4\u7801")

  return (
    <section className="contact" id={id} ref={ref}>
      <div className="section-head">
        <div>
          <h2>{SECTION_TITLES.contact.title}</h2>
          <p>{SECTION_TITLES.contact.desc}</p>
        </div>
      </div>
      <div className="contact-grid">
        <a className="contact-xhs-card" href={xhs.link} target="_blank" rel="noopener noreferrer">
          <span className="xhs-icon" dangerouslySetInnerHTML={{ __html: xhs.svg }} />
          <h3>{xhs.title}</h3>
          <p className="contact-value">{xhs.name}</p>
          <p className="contact-desc">{xhs.action}</p>
        </a>
        {cards.map((c, i) => {
          const isWx = c.label === "\u5fae\u4fe1"
          const isXy = c.label === "\u90ae\u7bb1"
          const flipState = isWx ? flippedWx : (isXy ? flippedXy : false)
          const setFlip = isWx ? setFlippedWx : (isXy ? setFlippedXy : null)
          const cfg = isWx ? wx : (isXy ? xy : null)
          return (
            <div
              key={i}
              className={"contact-card" + ((isWx || isXy) ? " flip-card" : "") + ((isWx || isXy) && flipState ? " flipped" : "")}
              onClick={() => { if (setFlip) setFlip(!flipState) }}
              style={(isWx || isXy) ? { cursor: "pointer" } : undefined}
            >
              <div className="flip-inner">
                <div className="flip-front">
                  {cfg ? (
                    <>
                      <span className="contact-icon">{c.icon}</span>
                      <h3>{cfg.title}</h3>
                      <h3>{cfg.name}</h3>
                      <p className="contact-desc">{cfg.action}</p>
                    </>
                  ) : (
                    <>
                      <span className="contact-icon">{c.icon}</span>
                      <h3>{c.label}</h3>
                      <p className="contact-value">{c.value}</p>
                      <p className="contact-desc">{c.desc}</p>
                    </>
                  )}
                </div>
                {cfg && (
                  <div className="flip-back">
                    <span className="flip-back-label">{cfg.qrLabel}</span>
                    <img className="qr-code" src={(import.meta.env.BASE_URL || "/") + cfg.qrImage.replace(/^\//, "")} alt={cfg.qrLabel} />
                    <p className="contact-desc">{cfg.qrDesc}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
})

export default Contact
