import EvangelisationPageContent from "@/components/layout/pages/outreaches/evangelisationPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evangélisation",
  description: "Nos campagnes d'évangélisation",
};

export default function Evangelisation() {
  return <EvangelisationPageContent />;
}