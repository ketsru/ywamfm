import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

interface FormationHeroProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export default function FormationHero({ searchTerm, onSearchChange }: FormationHeroProps) {
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
          Espace formation
        </span>

        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Nos formations
        </h1>

        <p className="mt-4 max-w-xl text-sm text-white/80 md:text-base">
          Découvrez nos programmes et rejoignez la prochaine promotion.
        </p>

        {onSearchChange && (
          <div className="relative mt-8 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchTerm ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher une école, une promotion, un lieu..."
              className="rounded-xl border-0 bg-white/95 pl-10 text-slate-900 shadow-lg focus-visible:ring-2 focus-visible:ring-[#1E2A5A]"
            />
          </div>
        )}
      </div>
    </div>
  );
}