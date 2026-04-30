"use client";

import { useState } from "react";

export default function AnimatedSprite({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="flex flex-col items-center gap-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${alt} animated`}
        className="h-16 w-16 object-contain"
        onError={() => setFailed(true)}
      />
      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
        Animated
      </span>
    </div>
  );
}
