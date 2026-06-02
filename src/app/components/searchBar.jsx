"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBarInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");



  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/allRooms?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/allRooms");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 my-6 max-w-md">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by room name or floor..."
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-green-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white text-sm rounded-full hover:bg-green-700"
      >
        Search
      </button>
    </form>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="my-6 h-10 w-full max-w-md bg-gray-100 rounded-full animate-pulse" />}>
      <SearchBarInner />
    </Suspense>
  );
}