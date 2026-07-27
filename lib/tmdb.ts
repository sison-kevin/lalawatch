const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const options = {
    header: {
        Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    }
}

async function fetchFromTMDB(endpoint: string) {
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function getTrending() {
  return fetchFromTMDB("/trending/movie/day");
}

export async function getPopular() {
  return fetchFromTMDB("/movie/popular");
}

export async function getTopRated() {
  return fetchFromTMDB("/movie/top_rated");
}

export async function getMovie(id: number) {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getSearch(query: string) {
  return fetchFromTMDB(
    `/search/movie&query=${encodeURIComponent(query)}`
  );
}

export async function getGenres() {
  return fetchFromTMDB("/genre/movie/list");
}

export async function getSimilar(id: number) {
  return fetchFromTMDB(`/movie/${id}/similar`);
}

export async function getVideos(id: number) {
  return fetchFromTMDB(`/movie/${id}/videos`);
}