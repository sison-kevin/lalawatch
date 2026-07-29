"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/movie/MovieCard";

export default function SearchBar() {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

 useEffect(() => {

  if (!debouncedQuery) return;

  async function searchMovies() {

    const response = await fetch(
      `/api/search?query=${debouncedQuery}`
    );

    const data = await response.json();

    setMovies(data.results);

  }

  searchMovies();

}, [debouncedQuery]);

   return (
    <>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-4 text-white"
      />

      {/* Search Results */}
      <div className="mt-10 grid grid-cols-5 gap-6">
        {movies.map((movie: any) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </>
  );
}