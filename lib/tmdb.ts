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

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error(`TMDB Error ${response.status}`);
    }

    return response.json();

  } catch (error) {
    console.error("FETCH FAILED:", error);
    throw error;
  }
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



export async function getVideos(
  id: number,
  type: "movie" | "tv"
) {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    console.error(
      `Failed to fetch ${type} videos for ${id}: ${res.status}`
    );

    return {
      results: [],
    };
  }

  return res.json();
}

export async function getMovieVideos(movieId: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

 if (!res.ok) {
  if (res.status === 404) {
    // Movie has no video information
    return {
      results: [],
    };
  }

  console.error(
    `Failed to fetch movie videos for ${movieId}: ${res.status}`
  );

  throw new Error(`Failed to fetch movie videos: ${res.status}`);
}

  return res.json();
}