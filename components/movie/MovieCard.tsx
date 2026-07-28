type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
};

export default function MovieCard({
  movie,
}: MovieCardProps) {
  return (
    <div className="w-52 cursor-pointer transition-all duration-300 hover:scale-95 hover:shadow-2xl">

      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="
            rounded-xl
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-2xl
            "
      />

      {/* Rating */}
      <p className="mt-2 text-yellow-400">
        ⭐ {movie.vote_average.toFixed(1)}
      </p>

      {/* Title */}
      <h3 className="mt-1 font-semibold">
        {movie.title}
      </h3>

      {/* Year */}
      <p className="text-sm text-gray-400">
        {movie.release_date.slice(0,4)}
      </p>

    </div>
  );
}