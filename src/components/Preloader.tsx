import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "Guten tag",
  "Hallo",
  "Welcome"
];

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const wordElement = wordRef.current;
    const textWrapper = textWrapperRef.current;
    const curvePath = curvePathRef.current;
    
    if (!preloader || !wordElement || !textWrapper || !curvePath) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    gsap.set(preloader, { yPercent: 0, display: "flex" });
    gsap.set(textWrapper, { opacity: 1, y: 0 });
    
    const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
    const flatPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;
    
    curvePath.setAttribute("d", initialPath);

    let wordIndex = 0;
    wordElement.textContent = words[wordIndex];

    const exitAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(preloader, { display: "none" });
          setIsCompleted(true);
        }
      });

      tl.to(textWrapper, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(curvePath, {
        attr: { d: flatPath },
        duration: 0.8,
        ease: "power4.inOut" // roughly equivalent to [0.76, 0, 0.24, 1]
      }, "-=0.1")
      .to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      }, "<");
    };

    const nextWord = () => {
      if (wordIndex < words.length - 1) {
        wordIndex++;
        gsap.to(wordElement, {
          opacity: 0,
          y: -8,
          duration: 0.1,
          onComplete: () => {
            wordElement.textContent = words[wordIndex];
            gsap.to(wordElement, { opacity: 1, y: 0, duration: 0.1 });
          }
        });

        setTimeout(nextWord, wordIndex === 1 ? 800 : 800);
      } else {
        setTimeout(exitAnimation, 400);
      }
    };

    setTimeout(nextWord, 900);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      curvePath.setAttribute("d", `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`);
    };
    window.addEventListener("resize", onResize);
    
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (isCompleted) return null;

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] hidden items-center justify-center pointer-events-none"
    >
      <div 
        ref={textWrapperRef}
        className="relative z-10 flex items-center gap-[14px] text-white text-5xl font-medium tracking-tight"
      >
        <span className="w-3 h-3 bg-white rounded-full"></span>
        <span ref={wordRef} className="transition-transform duration-150 ease-in-out will-change-transform">
          Hello
        </span>
      </div>

      <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] fill-[#141516]">
        <path ref={curvePathRef}></path>
      </svg>
    </div>
  );
}
