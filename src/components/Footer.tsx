import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-serif font-bold tracking-wider text-accent-gold mb-4 block">
              TPF<span className="text-white">CINEMAS</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              India&apos;s filmmaker-first streaming platform. Every story deserves a screen. Built lean, launched bold.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/browse" className="hover:text-accent-gold">Browse Films</Link></li>
              <li><Link href="/filmmakers" className="hover:text-accent-gold">Submit a Film</Link></li>
              <li><Link href="/about" className="hover:text-accent-gold">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/terms" className="hover:text-accent-gold">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-accent-gold">Privacy Policy</Link></li>
              <li><a href="mailto:submit@tpfcinemas.in" className="hover:text-accent-gold">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Tilak Popat Films. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
