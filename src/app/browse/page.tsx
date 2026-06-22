import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Browse() {
  const genres = ["All", "Short Film", "Feature", "Documentary", "Drama", "Thriller", "Comedy", "Experimental"];
  
  // Fetch only Films
  const { data: films } = await supabase
    .from("content")
    .select("*")
    .eq("type", "Film")
    .order("created_at", { ascending: false });
  
  return (
    <div className="flex flex-col min-h-screen bg-primary-bg pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Films Catalog</h1>
            <p className="text-gray-400">Discover independent cinema from across India.</p>
          </div>
          <div className="w-full md:w-72">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search films, directors..." 
                className="w-full bg-white/5 border border-white/10 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:border-accent-gold transition-colors"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar border-b border-white/10">
          {genres.map((genre, index) => (
            <button 
              key={genre}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0 
                  ? "bg-accent-gold text-black" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Grid */}
        {films && films.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
            {films.map((film) => (
              <Link href={`/film/${film.id}`} key={film.id} className="group flex flex-col">
                <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-3 shadow-lg">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/80 group-hover:text-accent-gold transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {film.portrait_poster_url ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${film.portrait_poster_url}')` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                      No Poster
                    </div>
                  )}
                </div>
                <h3 className="text-white font-medium text-sm line-clamp-1 group-hover:text-accent-gold transition-colors">
                  {film.title}
                </h3>
                {film.director_name && (
                  <p className="text-gray-500 text-xs mt-1">Dir. {film.director_name}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10 mb-16">
            <h3 className="text-xl font-bold text-white mb-2">No Films Found</h3>
            <p className="text-gray-400">There are no films available in the database yet.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
