"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

type MovieCardProps = {
  movie: Movie;
  trailerKey?: string | null;
};

export default function MovieCard({
  movie,
  trailerKey,
}: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const title = movie.title || movie.name || "Untitled";

  const year =
    movie.release_date?.split("-")[0] ||
    movie.first_air_date?.split("-")[0] ||
    "N/A";

  const type = movie.title ? "Movie" : "TV Show";

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (hovered && trailerKey) {
      timer = setTimeout(() => {
        setShowTrailer(true);
      }, 5000);
    } else {
      setShowTrailer(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hovered, trailerKey]);

  return (
    <Link
      href={
        movie.title
          ? `/movies/${movie.id}`
          : `/tv-shows/${movie.id}`
      }
    >
      <div
        className="group min-w-[400px] cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setShowTrailer(false);
        }}
      >
        {/* VIDEO / IMAGE */}
        <div className="relative h-[225px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

          {/* BACKDROP */}
          <Image
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={title}
            fill
            sizes="400px"
            className={`object-cover transition-opacity duration-500 ${
              showTrailer ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* YOUTUBE TRAILER */}
          {showTrailer && trailerKey && (
            <iframe
              className="absolute inset-0 h-full w-full scale-[1.25] pointer-events-none"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
              allow="autoplay; encrypted-media"
              title={`${title} trailer`}
            />
          )}

          {/* OVERLAY */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* INFO */}
        <div className="mt-4">
          <h3 className="line-clamp-1 text-xl font-semibold text-white">
            {title}
          </h3>

          <div className="mt-2 flex items-center gap-3 text-sm text-zinc-400">

            <span className="flex items-center gap-1 text-red-500">
              <Star
                size={14}
                fill="currentColor"
              />

              {movie.vote_average.toFixed(1)}
            </span>

            <span>•</span>

            <span>{year}</span>

            <span>•</span>

            <span>{type}</span>

          </div>
        </div>
      </div>
    </Link>
  );
}