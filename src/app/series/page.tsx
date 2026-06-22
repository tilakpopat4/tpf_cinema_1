import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function SeriesCatalog() {
  const { data: series } = await supabase
    .from("content")
    .select("*")
    .eq("type", "Web Series")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Web Series</h1>
          <p className="text-gray-400">Binge-worthy original series from independent creators.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold">All</button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">Drama</button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">Thriller</button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">Comedy</button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">Docuseries</button>
        </div>

        {/* Series Grid */}
        {series && series.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {series.map((item) => (
              <Link href={`/series/${item.id}`} key={item.id} className="group flex flex-col relative">
                <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-3 shadow-lg block">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/80 group-hover:text-accent-gold transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {item.landscape_poster_url ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.landscape_poster_url}')` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900 text-sm font-bold">
                      No Poster
                    </div>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg group-hover:text-accent-gold transition-colors">
                  {item.title}
                </h3>
                {item.genre && (
                  <p className="text-gray-500 text-sm mt-1">{item.genre}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10 mb-16">
            <h3 className="text-xl font-bold text-white mb-2">No Series Found</h3>
            <p className="text-gray-400">There are no web series available in the database yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
