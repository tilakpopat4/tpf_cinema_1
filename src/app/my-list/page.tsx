"use client";

import Link from "next/link";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useState, useEffect } from "react";

// Mock database just for rendering UI until Supabase is hooked up
const getMockFilmDetails = (id: string) => ({
  id,
  title: id.includes("echoes") ? "Echoes of the Valley" : `Saved Film ${id}`,
  director: "Independent Filmmaker",
  posterUrl: ""
});

export default function MyList() {
  const { watchlist, isLoaded, toggleWatchlist } = useWatchlist();
  const [films, setFilms] = useState<ReturnType<typeof getMockFilmDetails>[]>([]);

  useEffect(() => {
    if (isLoaded) {
      setFilms(watchlist.map(getMockFilmDetails));
    }
  }, [watchlist, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-primary-bg pt-20 flex justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-accent-gold"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">My List</h1>
          <p className="text-gray-400">Your personal collection of saved films.</p>
        </div>

        {/* Empty State */}
        {films.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-lg bg-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="text-xl font-medium text-white mb-2">Your list is empty</h3>
            <p className="text-gray-400 mb-6">Explore the catalog and save films to watch later.</p>
            <Link href="/browse" className="bg-accent-gold text-black px-6 py-2 rounded font-medium hover:bg-yellow-600 transition-colors">
              Browse Films
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
            {films.map((film) => (
              <div key={film.id} className="group flex flex-col relative">
                <Link href={`/film/${film.id}`} className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3 shadow-lg block">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/80 group-hover:text-accent-gold transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900">
                    Poster for {film.title}
                  </div>
                </Link>
                
                {/* Remove Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWatchlist(film.id);
                  }}
                  className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-red-600/90 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove from list"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <Link href={`/film/${film.id}`}>
                  <h3 className="text-white font-medium text-sm line-clamp-1 group-hover:text-accent-gold transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">Dir. {film.director}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
