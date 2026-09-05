import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/vishnu.jpeg";

export function PortraitReveal() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [particlesVisible, setParticlesVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const image = new Image();
    image.src = portrait;
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;

    const render = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = bounds.width * pixelRatio;
      canvas.height = bounds.height * pixelRatio;
      context.scale(pixelRatio, pixelRatio);
      context.clearRect(0, 0, bounds.width, bounds.height);

      const imageRatio = image.width / image.height;
      const boxRatio = bounds.width / bounds.height;
      const drawWidth = imageRatio > boxRatio ? bounds.height * imageRatio : bounds.width;
      const drawHeight = imageRatio > boxRatio ? bounds.height : bounds.width / imageRatio;
      const offsetX = (bounds.width - drawWidth) / 2;
      const offsetY = bounds.height - drawHeight;
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = 100;
      sampleCanvas.height = Math.max(1, Math.round(100 / imageRatio));
      const sampleContext = sampleCanvas.getContext("2d");
      if (!sampleContext) return;
      sampleContext.drawImage(image, 0, 0, sampleCanvas.width, sampleCanvas.height);
      const pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
      const progress = Math.min(1, (performance.now() - startTime) / 1800);
      const ease = 1 - Math.pow(1 - progress, 3);

      for (let index = 0; index < pixels.length; index += 16) {
        const pixelIndex = index / 4;
        const sourceX = pixelIndex % sampleCanvas.width;
        const sourceY = Math.floor(pixelIndex / sampleCanvas.width);
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3] / 255;
        if (alpha < 0.2) continue;
        const targetX = offsetX + (sourceX / sampleCanvas.width) * drawWidth;
        const targetY = offsetY + (sourceY / sampleCanvas.height) * drawHeight;
        const seed = Math.sin(pixelIndex * 12.9898) * 43758.5453;
        const random = seed - Math.floor(seed);
        const startX = targetX + (random - 0.5) * bounds.width * 1.4;
        const startY = targetY + (Math.cos(pixelIndex) - 0.5) * bounds.height * 0.8;
        const size = 0.7 + (red + green + blue) / 900;
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${Math.min(0.9, 0.25 + ease * 0.7)})`;
        context.fillRect(startX + (targetX - startX) * ease, startY + (targetY - startY) * ease, size, size);
      }

      if (progress < 1) frame = requestAnimationFrame(render);
    };

    const startTime = performance.now();
    image.onload = () => {
      resizeObserver = new ResizeObserver(render);
      resizeObserver.observe(canvas);
      render();
    };
    const timer = window.setTimeout(() => setParticlesVisible(false), 2050);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div
      className="portrait-reveal"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
      }}
      onPointerLeave={() => setPointer({ x: 50, y: 50 })}
      style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as React.CSSProperties}
    >
      <div className="portrait-halo" />
      <div className="portrait-backdrop-word">VISHNU</div>
      <div className="portrait-details portrait-detail-top">FULL STACK DEVELOPER / 2026</div>
      <div className="portrait-details portrait-detail-left"><b>BASED IN</b><br />TAMIL NADU, INDIA<br /><span>BUILD / SOLVE / SHIP</span></div>
      <div className="portrait-details portrait-detail-right"><b>FOCUS</b><br />SYSTEMS + AI<br /><span>OPEN TO COLLABORATION</span></div>
      <div className="portrait-details portrait-detail-bottom">SCROLL TO EXPLORE <i>↓</i></div>
      <div className="portrait-frame">
        <img src={portrait} alt="Vishnu M" className="portrait-image portrait-image-color" />
        <img src={portrait} alt="" className="portrait-image portrait-image-mono" />
        <canvas ref={canvasRef} className={`portrait-particles ${particlesVisible ? "is-visible" : ""}`} />
        <div className="portrait-crosshair portrait-crosshair-left" />
        <div className="portrait-crosshair portrait-crosshair-right" />
      </div>
    </div>
  );
}