"use client";

import { useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";

interface FilmActionsProps {
  filmId: string;
}

export default function FilmActions({ filmId }: FilmActionsProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fallback to false if the hook hasn't loaded local storage yet
  const saved = isInWatchlist(filmId);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      {/* Watchlist Button */}
      <button 
        onClick={() => toggleWatchlist(filmId)}
        className={`${saved ? 'bg-accent-gold text-black hover:bg-yellow-600' : 'bg-white/10 text-white hover:bg-white/20'} px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2`}
      >
        {saved ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        )}
        {saved ? 'Saved to List' : 'Watchlist'}
      </button>

      {/* Like Button */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className={`${isLiked ? 'text-red-500 bg-red-500/10' : 'bg-white/10 text-white hover:bg-white/20'} px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center`}
        title="Like"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${isLiked ? 'scale-110 fill-current' : 'hover:scale-110'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isLiked ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" fill="currentColor" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          )}
        </svg>
      </button>

      {/* Share Button */}
      <button 
        onClick={handleShare}
        className={`${copied ? 'bg-green-600/20 text-green-400' : 'bg-white/10 text-white hover:bg-white/20'} px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        {copied ? 'Link Copied!' : 'Share'}
      </button>
    </div>
  );
}
