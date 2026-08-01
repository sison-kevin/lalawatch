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
        />

        <MovieRow
          title="Trending TV Shows Today"
          movies={trendingTV.results}
        />

        <MovieRow
          title="Popular"
          movies={popular.results}
        />

        <MovieRow
          title="Popular TV Shows"
          movies={popularTV.results}
        />

        <MovieRow
          title="Top Rated"
          movies={topRated.results}
        />

        <MovieRow
          title="Top Rated TV Shows"
          movies={topRatedTV.results}
        />

        <MovieRow
          title="Action"
          movies={action.results}
        />

        <MovieRow
          title="Comedy"
          movies={comedy.results}
        />

        <MovieRow
          title="Drama"
          movies={drama.results}
        />

        <MovieRow
          title="Animation"
          movies={animation.results}
        />

      </div>

    </main>
  );
}