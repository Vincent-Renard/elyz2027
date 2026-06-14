import Timeline from "@/components/Timeline";
import { candidates } from "@/data/candidates";

export default function Home() {
  const declared = candidates.filter((c) => c.status === "declared").length;
  const designated = candidates.filter((c) => c.status === "designated").length;
  const primary = candidates.filter((c) => c.status === "primary").length;
  const possible = candidates.filter((c) => c.status === "possible").length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Frise présidentielle <span className="text-elyz-blue">2027</span>
        </h1>
        <p className="mt-2 text-zinc-500">
          Chronologie des candidatures et événements clés de l&apos;élection.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
          <span className="text-2xl font-bold text-elyz-blue">{declared + designated}</span>
          <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
            Déclarés
          </p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
          <span className="text-2xl font-bold text-amber-600">{primary}</span>
          <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
            Primaire
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-center">
          <span className="text-2xl font-bold text-zinc-500">{possible}</span>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Possibles
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-center">
          <span className="text-2xl font-bold text-zinc-800">{candidates.length}</span>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Total
          </p>
        </div>
      </div>

      <Timeline />
    </div>
  );
}
