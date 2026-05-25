import Image from "next/image";
import { PublishSchool } from "@/types/admin/publish_school";
import { publishSchoolMock } from "@/components/data/admin/publish_school";


type TrainingCardProps = {
  school?: PublishSchool;
};

const TrainingCard = ({ school }: TrainingCardProps) => {
  if (!school) {
    return (
      <div className="border rounded-xl p-4 animate-pulse bg-gray-100 h-[160px]" />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-3xl bg-white h-fit mb-6 flex gap-6">
      
        {/* Image */}
        <div className="relative w-[200px] h-cover p-4">
          <Image
            src={school.image || "/assets/images/default-training.jpg"}
            alt={school.description || "Formation"}
            width={300}
            height={200}
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Contenu */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {school.promotion_id.replaceAll("-", " ").toUpperCase()}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              📍 {school.lieu}
            </p>

            <p className="text-sm mt-2 text-gray-700 line-clamp-2">
              {school.description}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              📅 {school.debut} → {school.fin}
            </p>
          </div>

          {/* Status */}
          <div className="mt-3">
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full font-medium
                ${
                  school.status === "Terminée"
                    ? "bg-blue-100 text-blue-700"
                    : school.status === "En attente"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {school.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function TrainingsPage() {
  return (
    <div className="relative z-10 bg-teal-800 py-8 md:py-16">
      {publishSchoolMock.map((school) => (
        <TrainingCard key={school.id} school={school} />
      ))}
    </div>
  );
}
