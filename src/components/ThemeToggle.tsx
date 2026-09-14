import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ///////////////////////////////////////////////////////////////////////////
export type AnimationVariant = "circle" | "rectangle" | "gif" | "polygon" | "circle-blur";
export type AnimationStart = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "top-center" | "bottom-center" | "bottom-up" | "top-down" | "left-right" | "right-left";

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left": return { cx: "0", cy: "0" };
    case "top-right": return { cx: "40", cy: "0" };
    case "bottom-left": return { cx: "0", cy: "40" };
    case "bottom-right": return { cx: "40", cy: "40" };
    case "top-center": return { cx: "20", cy: "0" };
    case "bottom-center": return { cx: "20", cy: "40" };
    default: return { cx: "20", cy: "20" };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const positionCoords = getPositionCoords(start);
    const { cx, cy } = positionCoords;
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }
  if (start === "center") return "";
  if (variant === "rectangle") return "";
  const positionCoords = getPositionCoords(start);
  const { cx, cy } = positionCoords;
  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }
  return "";
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left": return "top left";
    case "top-right": return "top right";
    case "bottom-left": return "bottom left";
    case "bottom-right": return "bottom right";
    case "top-center": return "top center";
    case "bottom-center": return "bottom center";
    default: return "center";
  }
};

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);
  
  if (variant === "gif") {
    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) { animation-timing-function: var(--expo-in); }
      ::view-transition-new(root) { mask: url('${url}') center / 0 no-repeat; animation: scale 3s; }
      ::view-transition-old(root), .dark::view-transition-old(root) { animation: scale 3s; }
      @keyframes scale { 0% { mask-size: 0; } 10% { mask-size: 50vmax; } 90% { mask-size: 50vmax; } 100% { mask-size: 2000vmax; } }`,
    };
  }

  // Handle circle center explicitly for simplicity here, like user's code
  if (variant === "circle" && start === "center") {
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
      ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      ::view-transition-new(root) { animation-name: reveal-light${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
      ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
      .dark::view-transition-new(root) { animation-name: reveal-dark${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
      @keyframes reveal-dark${blur ? "-blur" : ""} { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(150.0% at 50% 50%); } }
      @keyframes reveal-light${blur ? "-blur" : ""} { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(150.0% at 50% 50%); } }`,
    };
  }

  // Handle circle with custom start positions
  if (variant === "circle" && start !== "center") {
    const getClipPathPosition = (position: AnimationStart) => {
      switch (position) {
        case "top-left": return "0% 0%";
        case "top-right": return "100% 0%";
        case "bottom-left": return "0% 100%";
        case "bottom-right": return "100% 100%";
        case "top-center": return "50% 0%";
        case "bottom-center": return "50% 100%";
        default: return "50% 50%";
      }
    };
    const clipPosition = getClipPathPosition(start);
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
      ::view-transition-group(root) { animation-duration: 1s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      ::view-transition-new(root) { animation-name: reveal-light-${start}${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
      ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
      .dark::view-transition-new(root) { animation-name: reveal-dark-${start}${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} { from { clip-path: circle(0% at ${clipPosition}); } to { clip-path: circle(150.0% at ${clipPosition}); } }
      @keyframes reveal-light-${start}${blur ? "-blur" : ""} { from { clip-path: circle(0% at ${clipPosition}); } to { clip-path: circle(150.0% at ${clipPosition}); } }`,
    };
  }

  return {
    name: "fallback",
    css: ""
  };
};

export const useThemeToggle = ({
  variant = "circle",
  start = "top-right",
  blur = false,
  gifUrl = "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
    setThemeState(saved);
    setIsDark(saved === "dark");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setTheme = (newTheme: "dark" | "light") => {
    setThemeState(newTheme);
    setIsDark(newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const styleId = "theme-transition-styles";
  const updateStyles = useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement; 
    if (!styleElement) { 
      styleElement = document.createElement("style"); 
      styleElement.id = styleId; 
      document.head.appendChild(styleElement); 
    } 
    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";

    if (typeof window === "undefined") return; 
    
    // Inject styles for the top-right circle view transition
    const anim = createAnimation(variant, start, blur, gifUrl);
    updateStyles(anim.css, anim.name);

    const switchTheme = () => { setTheme(nextTheme); }; 

    if (!document.startViewTransition) { 
      switchTheme(); 
      return; 
    } 
    document.startViewTransition(switchTheme);
  }, [theme, variant, start, blur, gifUrl, updateStyles]);

  return { isDark, toggleTheme };
};

export function ThemeToggle({
  className = "",
  variant = "circle",
  start = "top-right",
  blur = false,
  gifUrl = "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s",
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
}) {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur, gifUrl });

  return (
    <button
      type="button"
      className={cn(
        "size-10 cursor-pointer rounded-full bg-black dark:bg-white p-0 transition-all duration-300 active:scale-95 flex items-center justify-center",
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <svg viewBox="0 0 240 240" fill="none" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5" fill={isDark ? "black" : "white"} />
          <path d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5" fill={isDark ? "white" : "black"} />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill={isDark ? "black" : "white"}
        />
      </svg>
    </button>
  );
}
