// evangelisationPageContent.tsx
"use client";

import { useState } from "react";
import OutreachHero from "@/components/layout/pages/outreaches/outreachHero";
import OutreachGrid from "@/components/layout/pages/outreaches/outreachGrid";
import { OutreachCategory } from "@/lib/types/admin/outreach/outreach.types";

export default function EvangelisationPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<OutreachCategory | null>(null);

  return (
    <div className="pb-16">
      <OutreachHero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <OutreachGrid searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}