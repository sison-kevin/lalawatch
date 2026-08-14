import HeroBanner from "@/components/layout/HeroBanner";
import MovieRow from "@/components/movie/MovieRow";

import {
  getTrending,
  getPopular,
  getTopRated,
  getGenres,
  getTrendingTV,
  getPopularTV,
  getTopRatedTV,
  getMovieVideos,
} from "@/lib/tmdb";

export default async function HomePage() {

  const [
    trending,
    trendingTV,
    popular,
    popularTV,
    topRated,
    topRatedTV,
    action,
    comedy,
    drama,
    animation,
  ] = await Promise.all([
    getTrending(),
    getTrendingTV(),
    getPopular(),
    getPopularTV(),
    getTopRated(),
    getTopRatedTV(),
    getGenres(28),
    getGenres(35),
    getGenres(18),
    getGenres(16),
  ]);

  // Pick a random featured movie
  const featuredMovie =
    trending.results[
      Math.floor(Math.random() * trending.results.length)
    ];

    console.log(featuredMovie);
  // Fetch the trailer for that movie
  const videos = await getMovieVideos(featuredMovie.id);


console.log(videos);

  return (
    <main className="min-h-screen bg-black">

      <HeroBanner
        movie={featuredMovie}
        videos={videos.results}
      />

      <div className="px-10 py-10">

        <MovieRow
          title="Trending Today"
          movies={trending.results}
          type="movie"
        />

        <MovieRow
          title="Trending TV Shows Today"
          movies={trendingTV.results}
          type="tv"
        />

        <MovieRow
          title="Popular"
          movies={popular.results}
          type="movie"
        />

        <MovieRow
          title="Popular TV Shows"
          movies={popularTV.results}
          type="tv"
        />

        <MovieRow
          title="Top Rated"
          movies={topRated.results}
          type="movie"
        />

        <MovieRow
          title="Top Rated TV Shows"
          movies={topRatedTV.results}
          type="tv"
        />

        <MovieRow
          title="Action"
          movies={action.results}
          type="movie"
        />

        <MovieRow
          title="Comedy"
          movies={comedy.results}
          type="movie"
        />

        <MovieRow
          title="Drama"
          movies={drama.results}
          type="movie"
        />

        <MovieRow
          title="Animation"
          movies={animation.results}
          type="movie"
        />

      </div>

    </main>
  );
}