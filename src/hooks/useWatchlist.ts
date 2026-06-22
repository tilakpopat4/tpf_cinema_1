"use client";

import { useState, useEffect } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const stored = localStorage.getItem("tpf_watchlist");
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleWatchlist = (filmId: string) => {
    setWatchlist((prev) => {
      const isSaved = prev.includes(filmId);
      const updated = isSaved ? prev.filter(id => id !== filmId) : [...prev, filmId];
      
      // Save back to local storage
      localStorage.setItem("tpf_watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isInWatchlist = (filmId: string) => {
    return watchlist.includes(filmId);
  };

  return {
    watchlist,
    toggleWatchlist,
    isInWatchlist,
    isLoaded
  };
}
