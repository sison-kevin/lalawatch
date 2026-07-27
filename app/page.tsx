import Image from "next/image";
 import { getTrending } from "@/lib/tmdb";

export default async function Homes() {
  const data = await getTrending();

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
