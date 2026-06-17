"use client";

import type { CampaignTeam } from "@/data/candidates";
import { useLocale } from "@/lib/locale";

export default function CampaignTeamSection({ team }: { team?: CampaignTeam | null }) {
  const { t } = useLocale();

  if (!team) return null;
  const { director, coDirectors, spokesperson, advisors } = team;
  if (!director && !coDirectors?.length && !spokesperson && !advisors?.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        Équipe de campagne
      </h2>
      <div className="mt-3 space-y-3">
        {director && (
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              Directeur de campagne
            </span>
            <p className="mt-0.5 text-sm font-medium text-zinc-800">{director}</p>
          </div>
        )}
        {coDirectors && coDirectors.length > 0 && (
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              Co-directeurs
            </span>
            <p className="mt-0.5 text-sm font-medium text-zinc-800">
              {coDirectors.join(" · ")}
            </p>
          </div>
        )}
        {spokesperson && (
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              Porte-parole
            </span>
            <p className="mt-0.5 text-sm font-medium text-zinc-800">{spokesperson}</p>
          </div>
        )}
        {advisors && advisors.length > 0 && (
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              Conseillers
            </span>
            <p className="mt-0.5 text-sm font-medium text-zinc-800">
              {advisors.join(" · ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
