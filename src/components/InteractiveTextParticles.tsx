import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function InteractiveTextParticles({ text = "VISHNU", className }: { text?: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const update = () => setIsLight(document.documentElement.classList.contains("light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let disposed = false;
    let width = 1;
    let height = 1;
    let particles: { x: number; y: number; tx: number; ty: number; vx: number; vy: number; seed: number }[] = [];
    const pointer = { x: -1000, y: -1000 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const sample = document.createElement("canvas");
      sample.width = Math.round(width);
      sample.height = Math.round(height);
      const sampleContext = sample.getContext("2d");
      if (!sampleContext) return;
      const fontSize = Math.min(width / (text.length * 0.7), height * 0.72);
      sampleContext.font = `900 ${fontSize}px Space Grotesk, sans-serif`;
      sampleContext.textAlign = "center";
      sampleContext.textBaseline = "middle";
      sampleContext.fillStyle = "white";
      sampleContext.fillText(text, width / 2, height / 2);
      const data = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
      particles = [];
      for (let y = 0; y < sample.height; y += 4) {
        for (let x = 0; x < sample.width; x += 4) {
          if (data[(y * sample.width + x) * 4 + 3] > 100) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0,
              seed: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => { pointer.x = -1000; pointer.y = -1000; };
    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    build();

    const render = (time: number) => {
      if (disposed) return;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        const dx = particle.tx - particle.x;
        const dy = particle.ty - particle.y;
        const distance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);
        if (distance < 90) {
          const force = (1 - distance / 90) * 2.4;
          particle.vx += ((particle.x - pointer.x) / Math.max(distance, 1)) * force;
          particle.vy += ((particle.y - pointer.y) / Math.max(distance, 1)) * force;
        }
        particle.vx += dx * 0.012;
        particle.vy += dy * 0.012;
        particle.vx *= 0.88;
        particle.vy *= 0.88;
        particle.x += particle.vx;
        particle.y += particle.vy;
        const glow = 0.55 + Math.sin(time * 0.002 + particle.seed) * 0.25;
        if (isLight) {
          context.fillStyle = `rgba(30, 60, 200, ${glow + 0.2})`;
        } else {
          context.fillStyle = `rgba(94, 211, 255, ${glow})`;
        }
        context.fillRect(particle.x, particle.y, 1.8, 1.8);
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [text, isLight]);

  return <canvas ref={canvasRef} className={cn("block h-full w-full", className)} aria-label={text} role="img" />;
}
