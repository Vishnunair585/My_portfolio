import { useEffect } from "react";

export function ClickSound() {
  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();

    const playClick = () => {
      const currentTime = context.currentTime;
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(720, currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, currentTime + 0.08);
      gain.gain.setValueAtTime(0.13, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.08);
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start(currentTime);
      osc.stop(currentTime + 0.08);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest("button, a, [role='button']");
      if (!clickable) return;

      if (context.state === "suspended") {
        context.resume().then(playClick).catch(() => {});
      } else {
        playClick();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
