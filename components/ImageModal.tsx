"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  frontSrc: string;
  backSrc: string | null;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export default function ImageModal({
  frontSrc,
  backSrc,
  alt,
  open,
  onClose,
}: ImageModalProps) {
  const [view, setView] = useState<"front" | "back">("front");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const pinchDistance = useRef(0);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset state on close
  useEffect(() => {
    if (!open) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setView("front");
    }
  }, [open]);

  // Reset zoom/pan when view changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [view]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const hasBack = !!backSrc;
  const currentSrc = view === "back" && backSrc ? backSrc : frontSrc;

  const toggleView = useCallback(() => {
    if (!hasBack) return;
    setView((v) => (v === "front" ? "back" : "front"));
  }, [hasBack]);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      const next = prev + (e.deltaY < 0 ? 0.25 : -0.25);
      const clamped = Math.max(1, Math.min(4, next));
      if (clamped === 1) setPan({ x: 0, y: 0 });
      return clamped;
    });
  }, []);

  // Pinch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchDistance.current = Math.hypot(dx, dy);
    } else if (e.touches.length === 1) {
      isDragging.current = true;
      lastPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = dist - pinchDistance.current;
      pinchDistance.current = dist;
      setZoom((prev) => {
        const next = prev + delta * 0.005;
        const clamped = Math.max(1, Math.min(4, next));
        if (clamped === 1) setPan({ x: 0, y: 0 });
        return clamped;
      });
    } else if (e.touches.length === 1 && isDragging.current) {
      setZoom((currentZoom) => {
        if (currentZoom <= 1) return currentZoom;
        const dx = e.touches[0].clientX - lastPointer.current.x;
        const dy = e.touches[0].clientY - lastPointer.current.y;
        lastPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        return currentZoom;
      });
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Mouse pan
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setZoom((currentZoom) => {
      if (currentZoom <= 1) return currentZoom;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      return currentZoom;
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose]
  );

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[600px] rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
            {alt}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image frame */}
        <div
          className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 select-none"
          style={{
            cursor: zoom > 1 ? "grab" : "default",
            touchAction: "none",
          }}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transition: isDragging.current ? "none" : "transform 0.15s ease-out",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSrc}
              alt={alt}
              className="max-h-full max-w-full object-contain"
              style={{
                imageRendering: view === "back" ? "pixelated" : "auto",
              }}
              draggable={false}
            />
          </div>

          {/* Zoom indicator */}
          {zoom > 1 && (
            <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
              {Math.round(zoom * 100)}%
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-center gap-3 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          {hasBack ? (
            <>
              <button
                onClick={toggleView}
                aria-label="Previous view"
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="min-w-[60px] text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                {view === "front" ? "Front" : "Back"}
              </span>
              <button
                onClick={toggleView}
                aria-label="Next view"
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Scroll to zoom · Drag to pan
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
