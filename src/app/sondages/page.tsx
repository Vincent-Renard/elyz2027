import PollBarChart from "@/components/PollBarChart";
import EvolutionChart from "@/components/EvolutionChart";
import Link from "next/link";

export default function SondagesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Sondages <span className="text-elyz-blue">2027</span>
        </h1>
        <p className="mt-2 text-zinc-500">
          Intentions de vote pour le premier tour de l&apos;élection
          présidentielle.
        </p>
      </div>

      <p className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        Les sondages mesurent un rapport de force à un instant donné. Ils ne
        sont pas prédictifs du résultat final. Consultez les détails et marges
        d&apos;erreur sur les sites des instituts. Données collectées depuis{" "}
        <Link
          href="https://fr.wikipedia.org/wiki/Liste_de_sondages_sur_l%27%C3%A9lection_pr%C3%A9sidentielle_fran%C3%A7aise_de_2027"
          className="underline underline-offset-2 hover:text-elyz-blue"
        >
          Wikipédia
        </Link>
        .
      </p>

      <div className="mb-10">
        <EvolutionChart />
      </div>

      <PollBarChart />
    </div>
  );
}
