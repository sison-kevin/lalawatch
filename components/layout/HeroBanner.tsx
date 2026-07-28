type HeroBannerProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
  };
};

export default function HeroBanner({
  movie,
}: HeroBannerProps) {
  return (
    <section
      className="relative h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative flex h-full items-center px-20">
        <div className="max-w-xl text-white">

          <h1 className="text-6xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-6 text-lg">
            {movie.overview}
          </p>

          <div className="mt-8 flex gap-4">

            <button className="rounded bg-white px-6 py-3 text-black font-semibold">
              ▶ Watch Now
            </button>

            <button className="rounded bg-gray-700 px-6 py-3">
              ℹ More Info
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}