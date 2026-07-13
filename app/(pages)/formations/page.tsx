import TrainingPageContent from "@/components/layout/pages/formation/trainingPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations",
  description: "Les formations que nous offrons.",
};

export default function Training() {
  return <TrainingPageContent />;
}