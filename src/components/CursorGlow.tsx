import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const update = () => setIsLight(document.documentElement.classList.contains("light"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0;
    const handle = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", handle);
    let raf: number;
    const loop = () => {
      x += (tx - x) * 0.28;
      y += (ty - y) * 0.28;
      if (ref.current) ref.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", handle); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-50 h-[400px] w-[400px] rounded-full"
      style={
        isLight
          ? {
              background:
                "radial-gradient(circle, oklch(0.65 0.28 25 / 0.35), oklch(0.7 0.25 330 / 0.18) 40%, transparent 65%)",
              mixBlendMode: "multiply",
            }
          : {
              background: "radial-gradient(circle, oklch(0.7 0.22 230 / 0.22), transparent 60%)",
              mixBlendMode: "screen",
            }
      }
    />
  );
}
