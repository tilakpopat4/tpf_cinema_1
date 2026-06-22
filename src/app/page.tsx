import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        {/* Placeholder for Hero Image/Video */}
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <span className="text-gray-600">Hero Artwork Placeholder</span>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-deep-red text-white text-xs font-bold uppercase tracking-wider rounded-sm mb-4">
            Featured Premiere
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            The Indie Filmmaker&apos;s Dream
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 drop-shadow-md">
            Watch groundbreaking short films, documentaries, and features from emerging Indian talent. Zero algorithms. Just pure cinema.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
            <button className="bg-accent-gold hover:bg-yellow-600 text-black px-8 py-3 rounded-md font-bold text-lg transition-transform hover:scale-105">
              Watch Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-8 py-3 rounded-md font-bold text-lg transition-colors">
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* Genre Row Placeholder */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-white">New Arrivals</h2>
          <Link href="/browse" className="text-sm text-accent-gold hover:text-white transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="group relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-sm">Short Film Title {i}</h3>
                <p className="text-gray-300 text-xs">Dir. Filmmaker Name</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                Poster {i}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Submit Call to Action */}
      <section className="my-12 py-16 bg-gradient-to-r from-deep-red/20 to-black border-y border-deep-red/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Are you a filmmaker?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            TPF Cinemas is built for you. No entry fees, no gatekeepers. Apply by email, get reviewed, get screened.
          </p>
          <Link href="/filmmakers" className="inline-block bg-white text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition-colors">
            Learn How to Submit
          </Link>
        </div>
      </section>
    </div>
  );
}
