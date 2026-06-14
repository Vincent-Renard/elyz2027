import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="flex w-full flex-col items-center bg-gradient-to-b from-blue-50 to-white px-4 py-24">
        <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Élection Présidentielle{" "}
          <span className="text-elyz-blue">2027</span>
        </h1>
        <p className="mt-4 max-w-xl text-center text-lg text-zinc-500">
          Suivez toute l&apos;actualité, les candidats, les sondages et les
          analyses de la campagne présidentielle française.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/candidats"
            className="rounded-lg bg-elyz-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Voir les candidats
          </Link>
          <Link
            href="/actualites"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Dernières actualités
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Candidats</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Profil et programme des principaux candidats déclarés à
            l&apos;élection.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Actualités</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Articles et analyses de l&apos;actualité présidentielle en continu.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Sondages</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Intentions de vote et tendances de l&apos;opinion publique.
          </p>
        </div>
      </section>
    </div>
  );
}
