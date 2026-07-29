import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './TiltedCard.css';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  background, altText = 'Tilted card image',
  captionText = '', containerHeight = '100%', containerWidth = '100%',
  imageHeight, imageWidth, scaleOnHover = 1.05, rotateAmplitude = 10,
  showMobileWarning = false, showTooltip = true,
  overlayContent = null, displayOverlayContent = false,
  children, className = ''
}) {
  const ref = useRef(null);
  const x = useMotionValue(); const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() { scale.set(scaleOnHover); opacity.set(1); }
  function handleMouseLeave() { opacity.set(0); scale.set(1); rotateX.set(0); rotateY.set(0); rotateFigcaption.set(0); }

  const innerH = imageHeight || containerHeight;
  const innerW = imageWidth || containerWidth;

  return (
    <figure ref={ref} className={"tilted-card-figure " + className}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {showMobileWarning && <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>}
      <motion.div className="tilted-card-inner" style={{ width: innerW, height: innerH, rotateX, rotateY, scale }}>
        {background ? (
          <div className="tilted-card-bg" style={{ width: innerW, height: innerH, backgroundImage: background, backgroundSize: "cover", backgroundPosition: "center" }} />
        ) : (
          <div className="tilted-card-bg tilted-card-bg-default" />
        )}
        {children ? (
          <motion.div className="tilted-card-children" style={{ transform: "translateZ(30px)" }}>
            {children}
          </motion.div>
        ) : (displayOverlayContent && overlayContent) ? (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        ) : null}
      </motion.div>
      {showTooltip && (
        <motion.figcaption className="tilted-card-caption" style={{ x, y, opacity, rotate: rotateFigcaption }}>
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
