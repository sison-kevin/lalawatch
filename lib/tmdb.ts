const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

const options = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    accept: "application/json",
  },
};

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

export async function getSearch(
  query: string,
  page = 1
) {
  return fetchFromTMDB(
    `/search/multi?query=${encodeURIComponent(query)}&page=${page}`
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

export async function getTrendingTV() {
  return fetchFromTMDB("/trending/tv/day");
}

export async function getPopularTV() {
  return fetchFromTMDB("/tv/popular");
}

export async function getTopRatedTV() {
  return fetchFromTMDB("/tv/top_rated");
}

export async function getMovieDetails(id: number) {
  return fetchFromTMDB(
    `/movie/${id}?append_to_response=credits,similar,videos`
  );
}

export async function getTVShow(id: number) {
  return fetchFromTMDB(
    `/tv/${id}?append_to_response=credits,videos,similar`
  );
}