"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/movie/MovieCard";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Reset page whenever a new search is made
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  // Fetch movies
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([]);
      setTotalPages(1);
      return;
    }

    async function searchMovies() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?query=${encodeURIComponent(
            debouncedQuery
          )}&page=${page}`
        );

        const data = await response.json();

        console.log(data);

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    searchMovies();
  }, [debouncedQuery, page]);

  return (
    <>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-4 text-white outline-none"
      />

      {/* Search Results */}
      <div className="mt-10">
        {loading ? (
          <p className="text-center text-gray-400">
            Searching...
          </p>
        ) : debouncedQuery && movies.length === 0 ? (
          <p className="text-center text-gray-500">
            No movies found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {movies.map((movie: any) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {movies.length > 0 && (
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded bg-zinc-800 px-4 py-2 text-white disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-white">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded bg-zinc-800 px-4 py-2 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}