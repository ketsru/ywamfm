// components/layout/pages/formation/trainingPageContent.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FormationHero from "@/components/layout/pages/formation/hero";
import TrainingCourseGrid from "@/components/layout/pages/formation/trainingGrid";
import TestimonyCarousel from "../testimony/testimonyCarousel";
import { getApprovedTestimonies } from "@/lib/types/communications/testimonies/testimony.service";

export default function TrainingPageContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery({
    queryKey: ["testimonies", "public"],
    queryFn: () => getApprovedTestimonies({ page: 0, size: 20 }),
  });

  const testimonies = data?.content ?? [];

  return (
    <div className="pb-16">
      <FormationHero searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TrainingCourseGrid searchTerm={searchTerm} />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TestimonyCarousel testimonies={testimonies} />
      </div>
    </div>
  );
}