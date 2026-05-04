"use client";

import { useRef, useState, useEffect } from "react";

interface CryButtonProps {
  cryUrl: string | null;
  cryLegacyUrl: string | null;
}

export default function CryButton({ cryUrl, cryLegacyUrl }: CryButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [canPlay, setCanPlay] = useState(true);
  const [playing, setPlaying] = useState(false);

  const src = cryUrl ?? cryLegacyUrl;

  useEffect(() => {
    if (typeof document === "undefined" || !src) return;
    const audio = document.createElement("audio");
    if (!audio.canPlayType("audio/ogg")) {
      setCanPlay(false);
    }
  }, [src]);

  if (!src || !canPlay) return null;

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => setPlaying(false)}
      />
      <button
        onClick={handlePlay}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
          playing
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
        title="Play cry"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {playing ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.788V15.212a.3.3 0 00.477.241l4.547-3.212a.3.3 0 000-.482L6.977 8.547A.3.3 0 006.5 8.788z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.14a.75.75 0 011.28.53v12.72a.75.75 0 01-1.28.53l-4.72-3.14H3.75A.75.75 0 013 15V9a.75.75 0 01.75-.75h3z" />
          )}
        </svg>
        Cry
      </button>
    </>
  );
}
