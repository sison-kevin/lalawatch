import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

type Props = {
  movie: any;
  index?: number;
};

export default function SearchMovieCard({
  movie,
  index,
}: Props) {
  const title = movie.title || movie.name;

  const year =
    movie.release_date?.split("-")[0] ||
    movie.first_air_date?.split("-")[0] ||
    "N/A";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  return (
    <Link
      href={`/${
        movie.media_type === "tv" ? "tv" : "movie"
      }/${movie.id}`}
      className="group"
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800">

        <div className="relative aspect-[2/3]">

          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />

        </div>
      </div>

      {/* Movie Info */}

      <div className="mt-3">

        <h3 className="line-clamp-2 text-lg font-semibold text-white group-hover:text-red-500">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">

          <span className="flex items-center gap-1 text-red-500">
            <Star
              size={14}
              fill="currentColor"
            />
            {rating}
          </span>

          <span>•</span>

          <span>{year}</span>

          <span>•</span>

          <span>
            {movie.media_type === "tv"
              ? "TV Show"
              : "Movie"}
          </span>

        </div>

      </div>

    </Link>
  );
}