import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      type: string;
      id: string;
    }>;
  }
) {
  try {
    const { type, id } = await context.params;

    const API_KEY = process.env.TMDB_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        {
          error: "TMDB_API_KEY is missing",
        },
        {
          status: 500,
        }
      );
    }

    if (type !== "movie" && type !== "tv") {
      return NextResponse.json(
        {
          error: "Invalid media type",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "TMDB videos request failed:",
        response.status,
        response.statusText
      );

      return NextResponse.json(
        {
          results: [],
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    const videos = data.results || [];

    const trailer =
      videos.find(
        (video: any) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official === true
      ) ||
      videos.find(
        (video: any) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      ) ||
      videos.find(
        (video: any) =>
          video.site === "YouTube" &&
          video.type === "Teaser"
      ) ||
      videos.find(
        (video: any) =>
          video.site === "YouTube" &&
          video.type === "Clip"
      ) ||
      videos.find(
        (video: any) =>
          video.site === "YouTube" &&
          video.type === "Featurette"
      );

    return NextResponse.json({
      trailer: trailer?.key || null,
    });

  } catch (error) {

    console.error("Video API error:", error);

    return NextResponse.json(
      {
        trailer: null,
      },
      {
        status: 500,
      }
    );
  }
}