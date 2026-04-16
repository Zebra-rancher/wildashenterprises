import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-800 mt-32">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-parchment hover:text-gold transition-colors duration-300"
          >
            wildash<span className="text-gold">.</span>
          </Link>
          <p className="text-sm text-parchment-dim mt-1">
            AI consulting &amp; training for real businesses.
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-parchment-dim">
          <Link href="/blog" className="hover:text-parchment transition-colors duration-300">
            Blog
          </Link>
          <Link href="/projects" className="hover:text-parchment transition-colors duration-300">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-parchment transition-colors duration-300">
            Contact
          </Link>
        </nav>

        <p className="text-xs text-stone-700">
          &copy; {new Date().getFullYear()} Wildash Enterprises LLC
        </p>
      </div>
    </footer>
  );
}
