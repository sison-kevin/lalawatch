"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

type MovieRowProps = {
  title: string;
  movies: Movie[];
};

export default function MovieRow({
  title,
  movies,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;

    const amount = 420;

    rowRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-14">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="h-7 w-1 rounded-full bg-red-500" />

          <h2 className="text-4xl font-bold text-white">
            {title}
          </h2>

        </div>
      </div>

      {/* Row */}
      <div className="relative">

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-[90px] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Movies */}
        <div
          ref={rowRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-[90px] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
        >
          <ChevronRight size={32} />
        </button>

      </div>
    </section>
  );
}
