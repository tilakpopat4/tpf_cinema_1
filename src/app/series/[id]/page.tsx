"use client";

import { useState } from "react";
import VideoPlayerWrapper from "@/components/VideoPlayerWrapper";
import FilmActions from "@/components/FilmActions";

// Mock data for MVP Series UI
const seriesData = {
  id: "shadows-of-the-city",
  title: "Shadows of the City",
  creator: "Riya Singh",
  year: "2026",
  genre: "Thriller / Crime",
  seasons: 1,
  synopsis: "When a prominent tech CEO is found dead under mysterious circumstances, a disgraced detective is forced back into the underbelly of Mumbai's corporate world. What begins as a simple murder investigation quickly unravels into a conspiracy that threatens the entire city.",
  posterUrl: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?q=80&w=2040&auto=format&fit=crop",
  episodes: [
    {
      id: "ep1",
      number: 1,
      title: "The Fall",
      duration: "45m",
      synopsis: "Detective Kabir is pulled out of retirement when the CEO of a major tech firm dies. Initial evidence points to an accident, but Kabir suspects foul play.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
      thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "ep2",
      number: 2,
      title: "Digital Footprints",
      duration: "42m",
      synopsis: "A deep dive into the victim's server logs reveals unauthorized access right before the murder. Kabir teams up with a rogue hacker to trace the IP.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
      thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "ep3",
      number: 3,
      title: "Shell Corporation",
      duration: "48m",
      synopsis: "The trail leads to an abandoned warehouse owned by a shell company. Kabir walks into a trap that tests his limits.",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
      thumbnail: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop",
    }
  ]
};

export default function SeriesDetail() {
  const [activeEpisode, setActiveEpisode] = useState(seriesData.episodes[0]);

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      {/* Video Player Section - Edge to Edge */}
      <section className="w-full bg-black h-[50vh] sm:h-[60vh] md:h-[85vh] relative flex items-center justify-center overflow-hidden">
        
        {/* The Player fills the container */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* We add a key here to force the player to re-mount and reset state when the episode changes */}
          <VideoPlayerWrapper 
            key={activeEpisode.id}
            url={activeEpisode.videoUrl} 
            poster={activeEpisode.thumbnail} 
            title={`Ep ${activeEpisode.number}: ${activeEpisode.title}`}
            director={seriesData.creator}
            synopsis={activeEpisode.synopsis}
          />
        </div>
      </section>

      {/* Metadata Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {seriesData.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-8 font-medium">
              <span>{seriesData.year}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-accent-gold">{seriesData.seasons} Season{seriesData.seasons > 1 ? 's' : ''}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-accent-gold">{seriesData.genre}</span>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
              {seriesData.synopsis}
            </p>

            {/* Cast & Crew Roster */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Cast & Crew</h3>
              <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                
                {/* Director */}
                <div className="flex flex-col items-center min-w-[80px]">
                  <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-accent-gold overflow-hidden mb-2 shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-bold text-center">Riya Singh</p>
                  <p className="text-accent-gold text-xs font-medium text-center">Creator</p>
                </div>

                {/* Actor 1 */}
                <div className="flex flex-col items-center min-w-[80px]">
                  <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-transparent overflow-hidden mb-2 shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-bold text-center">Arjun Kumar</p>
                  <p className="text-gray-500 text-xs font-medium text-center">Cast</p>
                </div>

                {/* Actor 2 */}
                <div className="flex flex-col items-center min-w-[80px]">
                  <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-transparent overflow-hidden mb-2 shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-bold text-center">Neha Gupta</p>
                  <p className="text-gray-500 text-xs font-medium text-center">Cast</p>
                </div>

              </div>
            </div>

            <FilmActions filmId={seriesData.id} />
            
            {/* Episode Selector */}
            <div className="mt-16">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-serif font-bold text-white">Episodes</h2>
                <span className="text-sm font-medium text-gray-400">Season 1</span>
              </div>
              
              <div className="flex flex-col gap-4">
                {seriesData.episodes.map((ep) => (
                  <div 
                    key={ep.id}
                    onClick={() => setActiveEpisode(ep)}
                    className={`group flex flex-col sm:flex-row gap-6 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                      activeEpisode.id === ep.id 
                        ? 'bg-white/10 border-accent-gold/50 shadow-[0_0_15px_rgba(201,168,76,0.1)]' 
                        : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {/* Episode Thumbnail */}
                    <div className="sm:w-64 aspect-video bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 transition-colors ${activeEpisode.id === ep.id ? 'text-accent-gold' : 'text-white/70 group-hover:text-accent-gold'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900">
                        {/* Placeholder image logic would go here */}
                      </div>
                    </div>
                    
                    {/* Episode Details */}
                    <div className="flex flex-col justify-center flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`text-xl font-bold transition-colors ${activeEpisode.id === ep.id ? 'text-accent-gold' : 'text-white group-hover:text-accent-gold'}`}>
                          {ep.number}. {ep.title}
                        </h3>
                        <span className="text-sm font-medium text-gray-500 bg-black/30 px-2 py-1 rounded">{ep.duration}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                        {ep.synopsis}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Sidebar / Creator Info */}
          <div className="md:w-1/3 md:border-l border-white/10 md:pl-8">
            <h3 className="text-gray-500 text-sm uppercase tracking-wider font-bold mb-2">Creator</h3>
            <p className="text-white font-medium text-lg mb-6">{seriesData.creator}</p>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-8">
              <h4 className="text-accent-gold font-serif text-xl mb-2">Support the Creator</h4>
              <p className="text-sm text-gray-400 mb-4">
                Enjoyed this series? Consider leaving a tip to help {seriesData.creator} fund Season 2.
              </p>
              <button className="w-full bg-deep-red hover:bg-red-800 text-white py-2 rounded font-medium transition-colors">
                Tip Creator
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
