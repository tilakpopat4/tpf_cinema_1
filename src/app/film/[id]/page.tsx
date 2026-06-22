import VideoPlayerWrapper from "@/components/VideoPlayerWrapper";
import FilmActions from "@/components/FilmActions";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDirectImageUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function FilmDetail({ params }: { params: { id: string } }) {
  // Fetch specific film by ID
  const { data: film, error } = await supabase
    .from("content")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !film) {
    notFound();
  }

  // Parse cast members safely
  const cast = film.cast_members || [];

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      {/* Video Player Section - Edge to Edge like Netflix */}
      <section className="w-full bg-black h-[50vh] sm:h-[60vh] md:h-[85vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <VideoPlayerWrapper 
            url={film.media_url} 
            poster={film.landscape_poster_url} 
            title={film.title}
            director={film.director_name}
            synopsis={film.synopsis}
          />
        </div>
      </section>

      {/* Metadata Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {film.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-8 font-medium">
              <span className="text-accent-gold">{film.genre}</span>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
              {film.synopsis}
            </p>

            {/* Cast & Crew Roster */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Cast & Crew</h3>
              <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                
                {/* Director */}
                {film.director_name && (
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-accent-gold overflow-hidden mb-2 shadow-lg flex items-center justify-center">
                      {film.director_photo_url ? (
                        <img src={getDirectImageUrl(film.director_photo_url)} alt={film.director_name} className="w-full h-full object-cover" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-white text-sm font-bold text-center whitespace-nowrap">{film.director_name}</p>
                    <p className="text-accent-gold text-xs font-medium text-center">Director</p>
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

            <FilmActions filmId={film.id} />
          </div>

          {/* Sidebar / Director Info */}
          <div className="md:w-1/3 md:border-l border-white/10 md:pl-8">
            <h3 className="text-gray-500 text-sm uppercase tracking-wider font-bold mb-2">Director</h3>
            <p className="text-white font-medium text-lg mb-6">{film.director_name || "Unknown"}</p>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-8">
              <h4 className="text-accent-gold font-serif text-xl mb-2">Support the Filmmaker</h4>
              <p className="text-sm text-gray-400 mb-4">
                Enjoyed the film? Consider leaving a tip to help {film.director_name || "the creator"} fund their next project.
              </p>
              <button className="w-full bg-deep-red hover:bg-red-800 text-white py-2 rounded font-medium transition-colors">
                Tip Filmmaker
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Films (Placeholder for now until we have more content) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10 w-full mb-12">
        <h2 className="text-2xl font-serif font-bold text-white mb-6">More Like This</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Link href="/browse" className="group relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 shadow-lg flex items-center justify-center">
            <span className="text-gray-400 font-bold">Browse All Films &rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
