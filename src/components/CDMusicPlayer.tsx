import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

// Curated list of royalty-free pleasant songs across English, Malayalam, and Tamil
// Using URLs from free music services
const PLAYLIST = [
  { title: "Track 1", url: "/certificates/1.mp3", image: "/certificates/1.jpg", artist: "Local" },
  { title: "Track 2", url: "/certificates/2.mp3", image: "/certificates/2.jpg", artist: "Local" },
  { title: "Track 3", url: "/certificates/3.mp3", image: "/certificates/3.jpg", artist: "Local" },
  { title: "Track 4", url: "/certificates/4.mp3", image: "/certificates/4.jpg", artist: "Local" },
  { title: "Track 5", url: "/certificates/5.mp3", image: "/certificates/5.jpg", artist: "Local" },
  { title: "Track 6", url: "/certificates/6.mp3", image: "/certificates/6.jpg", artist: "Local" },
  { title: "Track 7", url: "/certificates/7.mp3", image: "/certificates/7.jpg", artist: "Local" },
  { title: "Track 8", url: "/certificates/8.mp3", image: "/certificates/8.jpg", artist: "Local" },
  { title: "Track 9", url: "/certificates/9.mp3", image: "/certificates/9.jpg", artist: "Local" },
  { title: "Track 10", url: "/certificates/10.mp3", image: "/certificates/10.jpg", artist: "Local" },
  { title: "Aaya Sher", url: "/certificates/Aaya Sher.mp3", image: "/certificates/aaya sher.jpg", artist: "Local" },
  { title: "Deewaana Deewaana", url: "/certificates/Deewaana Deewaana (PenduJatt.Com.Se).mp3", image: "/certificates/deewana deewana.jpg", artist: "Local" },
  { title: "Gehra Hua Dhurandhar", url: "/certificates/Gehra Hua Dhurandhar 128 Kbps.mp3", image: "/certificates/gehra hua.jpg", artist: "Local" },
  { title: "I Think They Call This Love", url: "/certificates/i think they call this love.mp3", image: "/certificates/i think they call this love.jpg", artist: "Local" },
  { title: "Pavazha Malli", url: "/certificates/Pavazha Malli.mp3", image: "/certificates/pavazha malli.jpg", artist: "Local" },
];

export function CDMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const loadAndPlayTrack = (trackIndex: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTrack(trackIndex);
    audio.src = PLAYLIST[trackIndex].url;
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";
    audio.volume = 0.2;
    audio.muted = false;
    audio.currentTime = 0;
    audio.loop = false;
    audio.load();

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.log("Audio play prevented:", error);
    });
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audio.src && audio.currentSrc) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Audio play prevented:", error);
      });
      return;
    }

    loadAndPlayTrack(currentTrack);
  };

  const playNextTrack = () => {
    const nextTrack = (currentTrack + 1) % PLAYLIST.length;
    loadAndPlayTrack(nextTrack);
  };

  const handleClick = () => {
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    clickTimeoutRef.current = window.setTimeout(() => {
      togglePlayPause();
      clickTimeoutRef.current = null;
    }, 200);
  };

  const handleDoubleClick = () => {
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    playNextTrack();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const nextTrack = (currentTrack + 1) % PLAYLIST.length;
      setCurrentTrack(nextTrack);
      setRotation((prev) => prev + 360);
      audio.src = PLAYLIST[nextTrack].url;
      audio.currentTime = 0;
      audio.load();
      audio.play().catch((error) => {
        console.log("Audio play prevented after track ended:", error);
      });
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;

    audio.volume = 0.2;
    audio.muted = false;
    audio.play().catch((error) => {
      console.log("Audio play prevented:", error);
    });
  }, [isPlaying]);

  // Continuous rotation animation when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Initialize Track 8 on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = PLAYLIST[7].url;
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";
    audio.volume = 0.2;
    audio.load();
  }, []);

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} crossOrigin="anonymous" />

      {/* CD Player UI */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className="fixed top-24 right-6 z-50 cursor-pointer group"
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "0 0 30px var(--color-accent)",
          }}
        />

        {/* CD Container */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ type: "linear", duration: 0 }}
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border-4 border-accent/50 overflow-hidden"
          style={{
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)"
          }}
        >
          {/* CD Surface Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Concentric circles for CD effect */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
            </svg>
          </div>

          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-b from-gray-700 to-black border border-gray-600 shadow-lg" />

          {/* Album Art / Center label */}
          <div className="absolute inset-0 flex items-center justify-center p-2">
            {PLAYLIST[currentTrack]?.image ? (
              <img
                src={PLAYLIST[currentTrack].image}
                alt={PLAYLIST[currentTrack].title}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent/50 shadow-lg"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent/70 flex items-center justify-center shadow-lg">
                <Music className="w-4 h-4 text-background" />
              </div>
            )}
          </div>

          {/* Highlight shine */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/20 blur-sm" />
        </motion.div>

        {/* Play/Pause Indicator */}
        <motion.div
          animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: isPlaying ? Infinity : 0, duration: 2 }}
          className="absolute inset-0 rounded-full border-2 border-accent/30"
        />

        {/* Info tooltip */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/95 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div>{isPlaying ? "🎵 Music On" : "Click to Play"}</div>
          <div className="mt-1 text-[9px] text-accent">Track {currentTrack + 1} / {PLAYLIST.length}</div>
        </div>
      </motion.div>

      <div className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <div className="text-accent font-medium truncate">{PLAYLIST[currentTrack].title}</div>
        <div>{isPlaying ? "Playing" : "Paused"}</div>
      </div>
    </>
  );
}
