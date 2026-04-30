"use client";

import { useState } from "react";
import TiltImage from "./TiltImage";
import ImageModal from "./ImageModal";

interface HeroImageProps {
  frontSrc: string;
  backSrc: string | null;
  alt: string;
  children: React.ReactNode;
}

export default function HeroImage({ frontSrc, backSrc, alt, children }: HeroImageProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer relative group"
        onClick={() => setModalOpen(true)}
      >
        <TiltImage className="h-48 w-48">
          {children}
        </TiltImage>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="rounded-full bg-black/40 p-2 backdrop-blur-sm">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
      <ImageModal
        frontSrc={frontSrc}
        backSrc={backSrc}
        alt={alt}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
