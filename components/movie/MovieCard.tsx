import Image from "next/image";
import { Star } from "lucide-react";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const title = movie.title || movie.name || "Untitled";

  const year =
    movie.release_date?.split("-")[0] ||
    movie.first_air_date?.split("-")[0] ||
    "N/A";

  return (
    <div className="group min-w-[400px] cursor-pointer">

      {/* Image */}
      <div className="relative h-[225px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 group-hover:scale-[1.03] group-hover:border-zinc-700 group-hover:shadow-2xl group-hover:shadow-black/50">

        <Image
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="line-clamp-1 text-xl font-semibold text-white">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-3 text-sm text-zinc-400">
          <span className="flex items-center gap-1 text-red-500">
            <Star size={14} fill="currentColor" />
            {movie.vote_average.toFixed(1)}
          </span>

          <span>•</span>

          <span>{year}</span>

          <span>•</span>

          <span>{movie.title ? "Movie" : "Series"}</span>
        </div>
      </div>
    </div>
  );
}
