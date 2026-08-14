import MovieCard from "./MovieCard";
import { getVideos } from "@/lib/tmdb";
import MovieRowScroller from "./MovieRowScroller";

type MovieRowProps = {
  title: string;
  movies: any[];
  type?: "movie" | "tv";
};

export default async function MovieRow({
  title,
  movies,
  type = "movie",
}: MovieRowProps) {

  const moviesWithVideos = await Promise.all(
    movies.map(async (movie) => {

      try {
        const videos = await getVideos(
          movie.id,
          type
        );

        const trailer =
          videos.results?.find(
            (video: any) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.key
          ) ||
          videos.results?.find(
            (video: any) =>
              video.site === "YouTube" &&
              video.type === "Teaser" &&
              video.key
          ) ||
          videos.results?.find(
            (video: any) =>
              video.site === "YouTube" &&
              video.type === "Clip" &&
              video.key
          ) ||
          videos.results?.find(
            (video: any) =>
              video.site === "YouTube" &&
              video.type === "Featurette" &&
              video.key
          );

        return {
          ...movie,
          trailerKey: trailer?.key || null,
        };

      } catch (error) {

        console.error(
          `Could not get videos for ${type} ${movie.id}`,
          error
        );

        return {
          ...movie,
          trailerKey: null,
        };
      }
    })
  );

  return (
    <section className="mb-12">

      <h2 className="mb-5 text-2xl font-bold text-white">
        {title}
      </h2>

      <MovieRowScroller>
        {moviesWithVideos.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            trailerKey={movie.trailerKey}
          />
        ))}
      </MovieRowScroller>

    </section>
  );
}