import SearchBar from "@/components/search/SearchBar";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl p-10">

        <h1 className="mb-8 text-4xl font-bold">
          Search
        </h1>

        <SearchBar />

      </div>

    </main>
  );
}