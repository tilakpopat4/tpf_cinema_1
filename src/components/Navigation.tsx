import Link from "next/link";

export default function Navigation() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-serif font-bold tracking-wider text-accent-gold">
              TPF<span className="text-white">CINEMAS</span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-accent-gold transition-colors text-white">
              Home
            </Link>
            <Link href="/browse" className="text-sm font-medium hover:text-accent-gold transition-colors text-gray-300">
              Films
            </Link>
            <Link href="/series" className="text-sm font-medium hover:text-accent-gold transition-colors text-gray-300">
              Series
            </Link>
            <Link href="/my-list" className="text-sm font-medium hover:text-accent-gold transition-colors text-gray-300">
              My List
            </Link>
            <Link href="/filmmakers" className="text-sm font-medium hover:text-accent-gold transition-colors text-gray-300">
              For Filmmakers
            </Link>
          </div>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors hidden md:block">
              Sign In
            </Link>
            <Link href="/profile" className="flex items-center justify-center w-9 h-9 rounded-full bg-accent-gold text-black font-bold text-sm hover:scale-105 transition-transform" title="My Profile">
              T
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
