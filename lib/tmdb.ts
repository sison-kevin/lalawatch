const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const options = {
    header: {
        Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    }
}

async function fetchFromTMDB(endpoint: string) {
  const separator = endpoint.includes("?") ? "&" : "?";

  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;

  console.log("Fetching:", url);

  const response = await fetch(url);

  if (!response.ok) {
    console.error("Status:", response.status);
    console.error("Status Text:", response.statusText);

    const error = await response.text();
    console.error(error);

    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function getTrending() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return response.json();
}

export async function getPopular() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  return response.json();
}

export async function getTopRated() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );

  return response.json();
}

export async function getMovie(id: number) {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getSearch(query: string) {
  return fetchFromTMDB(
    `/search/movie&query=${encodeURIComponent(query)}`
  );
}

export async function getGenres(genreId: number) {
   return fetchFromTMDB(
    `/discover/movie?with_genres=${genreId}`
  );
}

export async function getSimilar(id: number) {
  return fetchFromTMDB(`/movie/${id}/similar`);
}

export async function getVideos(id: number) {
  return fetchFromTMDB(`/movie/${id}/videos`);
}