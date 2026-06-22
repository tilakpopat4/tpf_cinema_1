"use client";

import React, { useRef, useEffect, useState } from "react";
import { Plyr, APITypes } from "plyr-react";
import "plyr-react/plyr.css";

interface VideoPlayerProps {
  url: string;
  poster?: string;
  title?: string;
  director?: string;
  synopsis?: string;
}

import { getDirectImageUrl, extractYouTubeId } from "@/lib/utils";

export default function VideoPlayer({ url, poster, title, director, synopsis }: VideoPlayerProps) {
  const ref = useRef<APITypes>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We use a small interval to wait until the Plyr instance is fully initialized by plyr-react
    const interval = setInterval(() => {
      if (ref.current && ref.current.plyr) {
        clearInterval(interval);
        const player = ref.current.plyr;

        const handlePlay = () => {
          setIsPaused(false);
          setHasStarted(true);
        };

        const handlePause = () => {
          setIsPaused(true);
        };

        // Hook into native Plyr events
        player.on('play', handlePlay);
        player.on('pause', handlePause);

        // Check initial state
        if (player.playing) {
          handlePlay();
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (ref.current && ref.current.plyr) {
        ref.current.plyr.off('play', () => setIsPaused(false));
        ref.current.plyr.off('pause', () => setIsPaused(true));
      }
    };
  }, []);

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const videoSrc = isYouTube ? (extractYouTubeId(url) || url) : url;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black" ref={containerRef}>
      
      {/* Dedicated wrapper for Plyr to prevent React DOM insertion conflicts */}
      <div className="absolute inset-0 z-0 [&>.plyr]:h-full [&>.plyr]:w-full [&_.plyr__video-wrapper]:h-full [&_.plyr__video-wrapper]:w-full">
        <Plyr
          ref={ref}
          source={{
            type: "video",
            sources: isYouTube
              ? [
                  {
                    src: videoSrc,
                    provider: "youtube"
                  }
                ]
              : [
                  {
                    src: url, // Mock 4K source
                    type: "video/mp4",
                    size: 2160,
                  },
                  {
                    src: url, // Mock 1080p source
                    type: "video/mp4",
                    size: 1080,
                  },
                  {
                    src: url, // Mock 720p source
                    type: "video/mp4",
                    size: 720,
                  },
                ],
            poster: getDirectImageUrl(poster),
          }}
          options={{
            controls: [
              "play-large", 
              "play", 
              "progress", 
              "current-time", 
              "duration", 
              "mute", 
              "volume", 
              "captions", 
              "settings", 
              "pip", 
              "airplay", 
              "fullscreen", 
            ],
            settings: ['quality', 'speed', 'loop'],
            quality: { default: 1080, options: [2160, 1080, 720] },
            hideControls: true, 
            keyboard: { focused: true, global: true },
          }}
        />
      </div>

      {/* Netflix-style Pause Overlay 
          Always rendered but visually hidden via opacity to avoid React DOM insertion conflicts with Plyr */}
      <div 
        className={`absolute inset-0 z-40 pointer-events-none transition-opacity duration-700 ease-in-out ${hasStarted && isPaused ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Subtle dark gradient on the left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent w-full md:w-3/4 h-full"></div>
        
        {/* Metadata content */}
        <div className="absolute top-1/4 left-8 md:left-16 max-w-xl text-white transform transition-transform duration-700 ease-out translate-y-0">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-3 drop-shadow-lg leading-tight">{title}</h1>
          {director && <p className="text-xl md:text-2xl text-accent-gold font-medium mb-4 drop-shadow-md">Directed by {director}</p>}
          {synopsis && <p className="text-sm md:text-base text-gray-200 line-clamp-3 drop-shadow-md opacity-80 leading-relaxed">{synopsis}</p>}
        </div>
      </div>

    </div>
  );
}
