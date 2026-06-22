import VideoPlayerWrapper from "@/components/VideoPlayerWrapper";
import FilmActions from "@/components/FilmActions";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDirectImageUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SeriesDetail({ params }: { params: { id: string } }) {
  // Fetch specific series by ID
  const { data: series, error } = await supabase
    .from("content")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !series) {
    notFound();
  }

  // Parse cast members safely
  const cast = series.cast_members || [];

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      {/* Video Player Section */}
      <section className="w-full bg-black h-[50vh] sm:h-[60vh] md:h-[85vh] relative flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 w-full h-full z-0">
          <VideoPlayerWrapper 
            url={series.media_url} 
            poster={series.landscape_poster_url} 
            title={series.title}
            director={series.director_name}
            synopsis={series.synopsis}
          />
        </div>
      </section>

      {/* Metadata & Episodes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-grow">
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-sm mb-4">
              Web Series
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {series.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-8 font-medium">
              <span className="text-accent-gold">{series.genre}</span>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
              {series.synopsis}
            </p>

            {/* Cast & Crew Roster */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Cast & Crew</h3>
              <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                
                {/* Director */}
                {series.director_name && (
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-accent-gold overflow-hidden mb-2 shadow-lg flex items-center justify-center">
                      {series.director_photo_url ? (
                        <img src={getDirectImageUrl(series.director_photo_url)} alt={series.director_name} className="w-full h-full object-cover" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-white text-sm font-bold text-center whitespace-nowrap">{series.director_name}</p>
                    <p className="text-accent-gold text-xs font-medium text-center">Creator</p>
                  </div>
                )}

                {/* Actors */}
                {cast.map((actor: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-transparent overflow-hidden mb-2 shadow-lg flex items-center justify-center">
                      {actor.photo_url ? (
                        <img src={getDirectImageUrl(actor.photo_url)} alt={actor.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-white text-sm font-bold text-center whitespace-nowrap">{actor.name}</p>
                    <p className="text-gray-500 text-xs font-medium text-center">Cast</p>
                  </div>
                ))}

              </div>
            </div>

            <FilmActions filmId={series.id} />
            
            {/* Episode Selector (Mocked for now since DB schema doesn't have episodes yet) */}
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-white mb-6 border-b border-white/10 pb-4">Episodes</h2>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="w-40 aspect-video bg-gray-800 rounded flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                     {series.landscape_poster_url ? (
                        <img src={getDirectImageUrl(series.landscape_poster_url)} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-500">Ep 1</span>
                      )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white font-bold text-lg">1. Pilot</h4>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">This is the single uploaded media file for this series.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Creator Info */}
          <div className="md:w-1/3 md:border-l border-white/10 md:pl-8">
            <h3 className="text-gray-500 text-sm uppercase tracking-wider font-bold mb-2">Creator</h3>
            <p className="text-white font-medium text-lg mb-6">{series.director_name || "Unknown"}</p>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-8">
              <h4 className="text-accent-gold font-serif text-xl mb-2">Support the Creator</h4>
              <p className="text-sm text-gray-400 mb-4">
                Enjoyed the series? Consider leaving a tip to help {series.director_name || "the creator"} fund their next project.
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
