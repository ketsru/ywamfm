"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OutreachCategory, OUTREACH_CATEGORY_LABELS } from "@/lib/types/admin/outreach/outreach.types";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523803326055-13445f07c1de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

interface OutreachHeroProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: OutreachCategory | null;
  onCategoryChange?: (category: OutreachCategory | null) => void;
}

const CATEGORY_OPTIONS = Object.values(OutreachCategory);

export default function OutreachHero({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: OutreachHeroProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-b-3xl">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.65)), url('${HERO_IMAGE}')`,
        }}
      />

      <div className="flex min-h-[38vh] flex-col items-center justify-center px-4 py-16 text-center text-white">
        <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Engagement missionnaire
        </span>

        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Nos évangélisations
        </h1>

        <p className="mt-4 max-w-xl text-sm text-white/80 md:text-base">
          Rejoignez une mission et participez à l&apos;annonce de l&apos;Évangile sur le terrain.
        </p>

        {onSearchChange && (
          <div className="relative mt-8 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchTerm ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher une mission, un département..."
              className="rounded-xl border-0 bg-white/95 pl-10 text-slate-900 shadow-lg focus-visible:ring-2 focus-visible:ring-[#1E2A5A]"
            />
          </div>
        )}

        {onCategoryChange && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onCategoryChange(null)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                !selectedCategory
                  ? "border-white bg-white text-[#1E2A5A]"
                  : "border-white/40 text-white/80 hover:border-white hover:text-white"
              )}
            >
              Toutes
            </button>
            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  selectedCategory === category
                    ? "border-white bg-white text-[#1E2A5A]"
                    : "border-white/40 text-white/80 hover:border-white hover:text-white"
                )}
              >
                {OUTREACH_CATEGORY_LABELS[category]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}