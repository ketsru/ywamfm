import TrainingCourseDetails from "@/components/layout/pages/formation/trainingCourseDetails";
import { getActivePublicSchoolById } from "@/lib/types/admin/publish-school/public-school.service";
import type { Metadata } from "next";

interface TrainingDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TrainingDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const school = await getActivePublicSchoolById(id);
    return {
      title: `${school.schoolName} — ${school.promotionName}`,
      description: school.description ?? `Formation ${school.schoolName}, promotion ${school.promotionName}.`,
    };
  } catch {
    return { title: "Formation introuvable" };
  }
}

export default async function TrainingDetailsPage({ params }: TrainingDetailsPageProps) {
  const { id } = await params;
  return <TrainingCourseDetails id={id} />;
}