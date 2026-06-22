export default function FilmmakerHub() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Subtle background pattern or image would go here */}
          <div className="w-full h-full bg-deep-red/10"></div>
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Apply by Email.<br/><span className="text-accent-gold">Get Screened.</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            No agents. No submission fees. No gatekeepers. Just a direct line to audiences who love independent cinema.
          </p>
          <a href="mailto:submit@tpfcinemas.in" className="inline-block bg-accent-gold hover:bg-yellow-600 text-black px-10 py-4 rounded-md font-bold text-lg transition-transform hover:scale-105 shadow-lg">
            Submit Your Film Now
          </a>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 w-full">
        <h2 className="text-3xl font-serif font-bold text-white mb-10 text-center">Submission Guidelines</h2>
        
        <div className="space-y-8">
          {/* Rule 1 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex gap-6 items-start">
            <div className="bg-deep-red/20 text-deep-red w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Technical Requirements</h3>
              <p className="text-gray-400">
                We accept MP4 or MOV formats. H.264 codec minimum, but 4K is preferred. 
                Audio must be clear and watchable. We focus on story, but basic technical watchability is required.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex gap-6 items-start">
            <div className="bg-accent-gold/20 text-accent-gold w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Duration & Language</h3>
              <p className="text-gray-400">
                <strong>Shorts:</strong> 3-40 minutes. <strong>Features:</strong> 60+ minutes. 
                We accept films in any Indian language or English. English subtitles are <em>strictly required</em> for non-Hindi/English films.
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex gap-6 items-start">
            <div className="bg-blue-500/20 text-blue-400 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Originality & Rights</h3>
              <p className="text-gray-400">
                The work must be 100% yours. No un-licensed music or stock footage. 
                You retain 100% of your rights; TPF Cinemas only asks for a non-exclusive streaming license.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-black py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-white mb-10 text-center">How the Process Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">1. Email Link</h4>
              <p className="text-sm text-gray-400">Send a Google Drive or WeTransfer link along with a brief synopsis to submit@tpfcinemas.in</p>
            </div>
            
            <div className="p-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">2. Curation</h4>
              <p className="text-sm text-gray-400">Our team reviews all submissions. You&apos;ll receive an acknowledgement within 48 hours and a decision within 3 weeks.</p>
            </div>
            
            <div className="p-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">3. Premiere</h4>
              <p className="text-sm text-gray-400">If selected, we handle the hosting. Your film gets a dedicated page, and you get a direct line to viewers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
