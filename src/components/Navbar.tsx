import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-elyz-blue">
            ElyZ
          </span>
          <span className="text-xl font-light text-zinc-500">2027</span>
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          <li>
            <Link href="/" className="transition-colors hover:text-elyz-blue">
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/candidats"
              className="transition-colors hover:text-elyz-blue"
            >
              Candidats
            </Link>
          </li>
          <li>
            <Link
              href="/actualites"
              className="transition-colors hover:text-elyz-blue"
            >
              Actualités
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
