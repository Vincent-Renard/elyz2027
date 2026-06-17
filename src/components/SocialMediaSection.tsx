"use client";

import type { SocialMedia } from "@/data/candidates";
import { useLocale } from "@/lib/locale";

const platforms: {
  key: keyof SocialMedia;
  label: string;
  icon: string;
  color: string;
}[] = [
  { key: "twitter", label: "X (Twitter)", icon: "𝕏", color: "#000" },
  { key: "bluesky", label: "Bluesky", icon: "🦋", color: "#1185fe" },
  { key: "instagram", label: "Instagram", icon: "📸", color: "#e4405f" },
  { key: "facebook", label: "Facebook", icon: "📘", color: "#1877f2" },
  { key: "youtube", label: "YouTube", icon: "▶️", color: "#ff0000" },
  { key: "tiktok", label: "TikTok", icon: "🎵", color: "#000" },
  { key: "telegram", label: "Telegram", icon: "✈️", color: "#0088cc" },
  { key: "threads", label: "Threads", icon: "🧵", color: "#000" },
  { key: "linkedin", label: "LinkedIn", icon: "💼", color: "#0a66c2" },
];

export default function SocialMediaSection({ socialMedia }: { socialMedia?: SocialMedia | null }) {
  const { t } = useLocale();

  if (!socialMedia) return null;

  const links = platforms
    .map((p) => ({ ...p, url: socialMedia[p.key] }))
    .filter((p) => p.url);

  if (links.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        {t("candidate.socialMedia")}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((p) => (
          <a
            key={p.key}
            href={p.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm"
            style={{
              borderColor: `${p.color}30`,
              backgroundColor: `${p.color}08`,
              color: p.color,
            }}
            title={p.label}
          >
            <span className="text-sm">{p.icon}</span>
            {p.label}
            <svg className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
