import Image from "next/image";
import { getMovieDetails } from "@/lib/tmdb";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MoviePage({
  params,
}: Props) {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  return (
    <main className="bg-black text-white">

      {/* HERO */}

      <section className="relative h-[90vh]">

        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="absolute bottom-20 left-20 max-w-xl">

          <h1 className="text-6xl font-bold">
            {movie.title}
          </h1>

          <div className="mt-6 flex gap-4 text-gray-300">

            <span>
              ⭐ {(movie.vote_average ?? 0).toFixed(1)}
            </span>

            <span>
              {movie.release_date}
            </span>

            <span>
              {movie.runtime} min
            </span>

          </div>

          <p className="mt-8 text-lg leading-8 text-gray-300">

            {movie.overview}

          </p>

          <div className="mt-10 flex gap-4">

            <button className="rounded-full bg-white px-10 py-4 text-black">
              ▶ Play
            </button>

            <button className="rounded-full border border-white px-10 py-4">
              + Watchlist
            </button>

          </div>

        </div>

      </section>

      {/* ACTORS */}

      <section className="mx-auto mt-20 max-w-7xl px-8">

        <h2 className="mb-8 text-3xl font-bold">
          Cast
        </h2>

        <div className="grid grid-cols-6 gap-6">

          {movie.credits.cast
            .slice(0, 12)
            .map((actor: any) => (

              <div key={actor.id}>

                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "/no-avatar.png"
                  }
                  alt={actor.name}
                  width={180}
                  height={250}
                  className="rounded-xl"
                />

                <h3 className="mt-3 font-semibold">

                  {actor.name}

                </h3>

                <p className="text-gray-400">

                  {actor.character}

                </p>

              </div>

            ))}

        </div>

      </section>

      {/* SIMILAR */}

      <section className="mx-auto mt-20 max-w-7xl px-8 pb-20">

        <h2 className="mb-8 text-3xl font-bold">

          Similar Movies

        </h2>

        <div className="grid grid-cols-6 gap-6">

          {movie.similar.results
            .slice(0, 12)
            .map((movie: any) => (

              <div key={movie.id}>

                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-xl"
                />

                <h3 className="mt-3">

                  {movie.title}

                </h3>

              </div>

            ))}

        </div>

      </section>

    </main>
  );
}