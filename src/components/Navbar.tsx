"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";

export default function Navbar() {
  const { t, locale, toggle } = useLocale();

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
              {t("nav.home")}
            </Link>
          </li>
          <li>
            <Link href="/candidats" className="transition-colors hover:text-elyz-blue">
              {t("nav.candidates")}
            </Link>
          </li>
          <li>
            <Link href="/sujets" className="transition-colors hover:text-elyz-blue">
              {t("nav.topics")}
            </Link>
          </li>
          <li>
            <Link href="/sondages" className="transition-colors hover:text-elyz-blue">
              {t("nav.polls")}
            </Link>
          </li>
          <li>
            <Link href="/agenda" className="transition-colors hover:text-elyz-blue">
              {t("nav.agenda")}
            </Link>
          </li>
          <li>
            <Link href="/jeux" className="transition-colors hover:text-elyz-blue">
              {t("nav.games")}
            </Link>
          </li>
          <li>
            <Link href="/veille" className="transition-colors hover:text-elyz-blue">
              {t("nav.media")}
            </Link>
          </li>
          <li>
            <button
              onClick={toggle}
              className="rounded-md border border-zinc-300 px-2 py-0.5 text-xs font-semibold transition-colors hover:bg-zinc-100"
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
