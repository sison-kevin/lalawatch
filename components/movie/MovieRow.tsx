import MovieCard from "./MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

type MovieRowProps = {
  title: string;
  movies: Movie[];
};

export default function MovieRow({
  title,
  movies,
}: MovieRowProps) {
  return (
    <section className="mt-12">

      {/* Row Title */}
      <h2 className="mb-5 text-3xl font-bold text-white">
        {title}
      </h2>

      {/* Movies */}
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

    </section>
  );
}