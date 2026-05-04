"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface DexVoiceProps {
  name: string;
  genus: string;
  flavorText: string;
}

export default function DexVoice({ name, genus, flavorText }: DexVoiceProps) {
  const [available, setAvailable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setAvailable(true);
    }
  }, []);

  // Cancel on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = useCallback(() => {
    const synth = window.speechSynthesis;

    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const formatted = name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const text = genus
      ? `${formatted}, the ${genus}. ${flavorText}`
      : `${formatted}. ${flavorText}`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    synth.cancel();
    synth.speak(utterance);
    setSpeaking(true);
  }, [name, genus, flavorText, speaking]);

  if (!available) return null;

  return (
    <button
      onClick={handleSpeak}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        speaking
          ? "bg-purple-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
      title="Read Pokedex entry aloud"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {speaking ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        )}
      </svg>
      Dex Voice
    </button>
  );
}
