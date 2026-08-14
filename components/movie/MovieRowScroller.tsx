"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

type MovieRowScrollerProps = {
  children: React.ReactNode;
};

export default function MovieRowScroller({
  children,
}: MovieRowScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: -850,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: 850,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative">

      {/* LEFT ARROW */}
      <button
        type="button"
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/90 group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={28} />
      </button>

      {/* MOVIES */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
      >
        {children}
      </div>

      {/* RIGHT ARROW */}
      <button
        type="button"
        onClick={scrollRight}
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/90 group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={28} />
      </button>

    </div>
  );
}