import { NextRequest, NextResponse } from "next/server";
import { getSearch } from "@/lib/tmdb";

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");

  const page = Number(searchParams.get("page") ?? 1);

  if (!query) {
    return NextResponse.json([]);
  }

  const data = await getSearch(query, page);

  return NextResponse.json(data);

}