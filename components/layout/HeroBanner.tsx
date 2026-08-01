"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type HeroBannerProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
  };

  videos: {
    key: string;
    site: string;
    type: string;
  }[];
};

export default function HeroBanner({
  movie,
  videos,
}: HeroBannerProps) {

  const [showVideo, setShowVideo] = useState(false);
  const [muted, setMuted] = useState(true);

  const trailer =
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  ) ||
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Teaser"
  ) ||
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Clip"
  ) ||
  videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Featurette"
  ) ||
  videos.find(
    (video) =>
      video.site === "YouTube"
  );

  useEffect(() => {
    setShowVideo(false);

    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2500);

    return () => clearTimeout(timer);

  }, [movie]);
  console.log(trailer?.key);

  return (
    <section className="relative h-screen overflow-hidden">

      {/* IMAGE */}

      {!showVideo && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* VIDEO */}

      {showVideo && trailer && (
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${
            muted ? 1 : 0
          }&controls=0&loop=1&playlist=${trailer.key}&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />

      )}

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Content */}

      <div className="relative flex h-full items-center px-20">

        <div className="max-w-2xl text-white">

          <h1 className="text-7xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-8 text-xl text-gray-200 line-clamp-4">
            {movie.overview}
          </p>

          <div className="mt-10 flex gap-4">

            <button className="rounded-xl bg-white px-8 py-4 font-bold text-black hover:bg-gray-200">
              ▶ Watch Now
            </button>

            <button className="rounded-xl bg-gray-700/80 px-8 py-4 hover:bg-gray-600">
              More Info
            </button>

          </div>

        </div>

      </div>

    {/* Custom Mute Button */}

    {showVideo && (

    <button
      onClick={() => setMuted(!muted)}
      className="
        absolute
        top-24
        right-8
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        border
        border-white/20
        bg-black/30
        backdrop-blur-xl
        transition-all
        duration-300
        hover:bg-black/50
        hover:scale-105
    "
    >
      {muted ? (
        <VolumeX className="h-6 w-6 text-white" />
      ) : (
        <Volume2 className="h-6 w-6 text-white" />
      )}
    </button>

    )}

    </section>
  );
}