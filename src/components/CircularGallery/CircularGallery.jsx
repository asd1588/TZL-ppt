import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
function lerp(p1, p2, t) { return p1 + (p2 - p1) * t; }
function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') instance[key] = instance[key].bind(instance);
  });
}

const DEFAULT_FONT = 'bold 30px Figtree';
const DEFAULT_FONT_URL = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap';

function deriveFontFamilyFromUrl(url) {
  const fileName = (url.split('/').pop() || 'custom-font').split('?')[0];
  const base = fileName.replace(/\.(woff2?|ttf|otf|eot)$/i, '');
  return base.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'CircularGalleryFont';
}
async function loadFontFromStylesheet(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch font stylesheet');
  const cssText = await response.text();
  const faceBlocks = cssText.match(/@font-face\s*{[^}]*}/g) || [];
  let family = null;
  const fontFaces = [];
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?/);
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (!familyMatch || !urlMatch) continue;
    family = familyMatch[1].trim();
    const descriptors = {};
    const w = block.match(/font-weight:\s*([^;]+);/);
    const s = block.match(/font-style:\s*([^;]+);/);
    const r = block.match(/unicode-range:\s*([^;]+);/);
    if (w) descriptors.weight = w[1].trim();
    if (s) descriptors.style = s[1].trim();
    if (r) descriptors.unicodeRange = r[1].trim();
    fontFaces.push(new FontFace(family, 'url('+urlMatch[1]+')', descriptors));
  }
  if (!family) throw new Error('No @font-face found');
  await Promise.allSettled(fontFaces.map(async face => { await face.load(); document.fonts.add(face); }));
  return family;
}
async function loadFontFromFile(url) {
  const family = deriveFontFamilyFromUrl(url);
  const ff = new FontFace(family, 'url('+url+')');
  await ff.load(); document.fonts.add(ff); return family;
}
async function loadCustomFont(fontUrl) {
  return (fontUrl.includes('fonts.googleapis.com') || /\.css(\?.*)?$/i.test(fontUrl))
    ? loadFontFromStylesheet(fontUrl) : loadFontFromFile(fontUrl);
}
async function resolveFont(font, fontUrl) {
  const effectiveUrl = fontUrl || (font === DEFAULT_FONT ? DEFAULT_FONT_URL : null);
  if (!effectiveUrl) {
    if (document.fonts && document.fonts.load) { try { await document.fonts.load(font); await document.fonts.ready; } catch {} }
    return font;
  }
  try {
    const family = await loadCustomFont(effectiveUrl);
    const sizeMatch = font.match(/^\s*(.*?\d+px)/);
    const prefix = sizeMatch ? sizeMatch[1].trim() : 'bold 30px';
    const resolved = prefix + ' "' + family + '"';
    if (document.fonts && document.fonts.load) { try { await document.fonts.load(resolved); } catch {} }
    return resolved;
  } catch (e) { console.error('CircularGallery: font load error', e); return font; }
}
function getFontSize(font) { const m = font.match(/(\d+)px/); return m ? parseInt(m[1],10) : 30; }

function createTextTexture(gl, text, font, color) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  const m = ctx.measureText(text);
  canvas.width = Math.ceil(m.width) + 20;
  canvas.height = Math.ceil(getFontSize(font) * 1.2) + 20;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({gl, plane, text, textColor, font}) {
    autoBind(this); this.gl = gl; this.plane = plane; this.text = text; this.textColor = textColor; this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;void main(){vec4 c=texture2D(tMap,vUv);if(c.a<0.1)discard;gl_FragColor=c;}`,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    this.mesh.scale.set(textHeight * aspect, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({geometry, gl, image, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius, font}) {
    this.extra = 0; this.geometry = geometry; this.gl = gl; this.image = image; this.index = index; this.length = length;
    this.renderer = renderer; this.scene = scene; this.screen = screen; this.text = text; this.viewport = viewport;
    this.bend = bend; this.textColor = textColor; this.borderRadius = borderRadius; this.font = font;
    this.createShader(); this.createMesh(); this.createTitle(); this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false,
      vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;p.z=(sin(p.x*4.0+uTime)*1.5+cos(p.y*2.0+uTime)*1.5)*(0.1+uSpeed*0.5);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;float box(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=box(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);float a=1.0-smoothstep(-0.002,0.002,d);gl_FragColor=vec4(color.rgb,a);}`,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };
  }
  createMesh() { this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program }); this.plane.setParent(this.scene); }
  createTitle() { this.title = new Title({gl:this.gl, plane:this.plane, text:this.text, textColor:this.textColor, font:this.font}); }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) { this.plane.position.y = 0; this.plane.rotation.z = 0; }
    else {
      const B = Math.abs(this.bend), R = (H*H + B*B) / (2*B);
      const ex = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R*R - ex*ex);
      if (this.bend > 0) { this.plane.position.y = -arc; this.plane.rotation.z = -Math.sign(x) * Math.asin(ex/R); }
      else { this.plane.position.y = arc; this.plane.rotation.z = Math.sign(x) * Math.asin(ex/R); }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const off = this.plane.scale.x / 2;
    const vOff = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + off < -vOff;
    this.isAfter = this.plane.position.x - off > vOff;
    if (direction === 'right' && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === 'left' && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }
  onResize({screen, viewport}={}) {
    if (screen) this.screen = screen;
    if (viewport) { this.viewport = viewport; }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(container, {items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase}) {
    document.documentElement.classList.remove('no-js');
    this.container = container; this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer(); this.createCamera(); this.createScene(); this.onResize();
    this.createGeometry(); this.createMedias(items, bend, textColor, borderRadius, font);
    this.update(); this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio||1,2) });
    this.gl = this.renderer.gl; this.gl.clearColor(0,0,0,0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() { this.camera = new Camera(this.gl); this.camera.fov = 45; this.camera.position.z = 20; }
  createScene() { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 }); }
  createMedias(items, bend, textColor, borderRadius, font) {
    const defaults = [
      {image:'https://picsum.photos/seed/1/800/600?grayscale',text:'Item1'},
      {image:'https://picsum.photos/seed/2/800/600?grayscale',text:'Item2'},
      {image:'https://picsum.photos/seed/3/800/600?grayscale',text:'Item3'},
    ];
    const gi = items && items.length ? items : defaults;
    this.mediasImages = gi.concat(gi);
    this.medias = this.mediasImages.map((data, idx) => new Media({
      geometry: this.planeGeometry, gl: this.gl, image: data.image, index: idx,
      length: this.mediasImages.length, renderer: this.renderer, scene: this.scene,
      screen: this.screen, text: data.text, viewport: this.viewport,
      bend, textColor, borderRadius, font
    }));
  }
  onTouchDown(e) { this.isDown = true; this.scroll.position = this.scroll.current; this.start = e.touches ? e.touches[0].clientX : e.clientX; }
  onTouchMove(e) { if(!this.isDown)return; const x=e.touches?e.touches[0].clientX:e.clientX; this.scroll.target=this.scroll.position+(this.start-x)*(this.scrollSpeed*0.025); }
  onTouchUp() { this.isDown = false; this.onCheck(); }
  onWheel(e) { this.scroll.target += ((e.deltaY||0)>0?this.scrollSpeed:-this.scrollSpeed)*0.2; this.onCheckDebounce(); }
  onKeyDown(e) {
    if(e.key==='ArrowRight'){e.preventDefault();this.scroll.target+=this.scrollSpeed*5;this.onCheckDebounce();}
    if(e.key==='ArrowLeft'){e.preventDefault();this.scroll.target-=this.scrollSpeed*5;this.onCheckDebounce();}
    if(e.key==='Home'){e.preventDefault();this.scroll.target=0;this.onCheckDebounce();}
  }
  onCheck() { if(!this.medias||!this.medias[0])return; const w=this.medias[0].width; const idx=Math.round(Math.abs(this.scroll.target)/w); this.scroll.target=this.scroll.target<0?-w*idx:w*idx; }
  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov/2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    if (this.medias) this.medias.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const dir = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) this.medias.forEach(m => m.update(this.scroll, dir));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
    this.container?.addEventListener('keydown', this.boundOnKeyDown);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    ['resize','mousewheel','wheel','mousedown','mousemove','mouseup','touchstart','touchmove','touchend'].forEach(e => window.removeEventListener(e, this['boundOn'+e[0].toUpperCase()+e.slice(1)]));
    if (this.renderer?.gl?.canvas?.parentNode) this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    if (this.container) this.container.removeEventListener('keydown', this.boundOnKeyDown);
  }
}

export default function CircularGallery({items,bend=3,textColor='#ffffff',borderRadius=.05,font='bold 30px Figtree',fontUrl,scrollSpeed=2,scrollEase=.05}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    let app, mounted = true;
    resolveFont(font, fontUrl).then(resolved => {
      if (!mounted || !ref.current) return;
      app = new App(ref.current, {items,bend,textColor,borderRadius,font:resolved,scrollSpeed,scrollEase});
    }).catch(() => {});
    return () => { mounted = false; if (app) app.destroy(); };
  }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase]);
  return <div className="circular-gallery" ref={ref} tabIndex={0} role="region" aria-label="Circular image gallery. Use left and right arrow keys to navigate." />;
}