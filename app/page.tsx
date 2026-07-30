import HeroBanner from "@/components/layout/HeroBanner";
import MovieRow from "@/components/movie/MovieRow";

import {
  getTrending,
  getPopular,
  getTopRated,
  getGenres,
} from "@/lib/tmdb";

export default async function HomePage() {

  const [
    trending,
    popular,
    topRated,
    action,
    comedy,
    drama,
    animation,
  ] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getGenres(28), // Action
    getGenres(35), // Comedy
    getGenres(18), // Drama
    getGenres(16), // Animation
  ]);

  const featuredMovie =
    trending.results[
      Math.floor(Math.random() * trending.results.length)
    ];

  return (
    <main className="min-h-screen bg-black">

      <HeroBanner movie={featuredMovie} />

      <div className="px-10 py-10">

        <MovieRow
          title=" Trending Today"
          movies={trending.results}
        />

        <MovieRow
          title=" Popular"
          movies={popular.results}
        />

        <MovieRow
          title=" Top Rated"
          movies={topRated.results}
        />

        <MovieRow
          title=" Action"
          movies={action.results}
        />

        <MovieRow
          title=" Comedy"
          movies={comedy.results}
        />

        <MovieRow
          title=" Drama"
          movies={drama.results}
        />

        <MovieRow
          title=" Animation"
          movies={animation.results}
        />

      </div>

    </main>
  );
}