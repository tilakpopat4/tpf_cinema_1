import Link from "next/link";

export default function Profile() {
  // Mock Data
  const user = {
    name: "Tilak Popat",
    email: "tilak@tpfcinemas.in",
    memberSince: "January 2026",
    initials: "TP",
  };

  const watchHistory = [
    { id: "echoes-of-the-valley", title: "Echoes of the Valley", director: "Aarav Sharma", progress: 85 },
    { id: "2", title: "Midnight in Mumbai", director: "Riya Singh", progress: 100 },
    { id: "3", title: "The Last Train", director: "Vikram Das", progress: 30 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">My Account</h1>
          <p className="text-gray-400">Manage your profile, subscription, and watch history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile & Subscription */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Account Details Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center space-x-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-accent-gold flex items-center justify-center text-2xl font-bold text-black shadow-lg">
                  {user.initials}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-500">Member Since</span>
                  <span className="text-white font-medium">{user.memberSince}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-500">Password</span>
                  <button className="text-accent-gold hover:text-white transition-colors text-sm font-medium">Reset</button>
                </div>
              </div>

              <button className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white py-3 rounded-md font-medium transition-colors mb-4">
                Edit Profile
              </button>
              
              <button className="w-full text-red-500/80 hover:text-red-500 font-medium text-sm transition-colors text-center py-2">
                Sign Out
              </button>
            </div>
          </div>

          {/* Right Column: Watch History */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Continue Watching</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              {watchHistory.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">You haven&apos;t watched any films yet.</p>
                  <Link href="/browse" className="text-accent-gold hover:text-white mt-4 inline-block transition-colors">
                    Start exploring
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {watchHistory.map((film) => (
                    <Link href={`/film/${film.id}`} key={film.id} className="group flex gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 relative overflow-hidden">
                      {/* Thumbnail Placeholder */}
                      <div className="w-40 aspect-video bg-gray-800 rounded-md flex-shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/50 group-hover:text-accent-gold transition-colors" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {/* Progress Bar overlay on thumbnail */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                          <div 
                            className="h-full bg-accent-gold" 
                            style={{ width: `${film.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-white group-hover:text-accent-gold transition-colors mb-1">{film.title}</h3>
                        <p className="text-sm text-gray-400">Dir. {film.director}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {film.progress === 100 ? 'Completed' : `${film.progress}% watched`}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
