"use client";

import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Department } from "@/lib/types/admin/department/department.types";
import { getAllDepartments } from "@/lib/types/admin/department/department.service";

export default function LandingPageGallerie() {
  const { data, isLoading, isError } = useQuery<Department[]>({
    queryKey: ["departments", "public"],
    queryFn: () => getAllDepartments({ activeOnly: true }),
  });

  const departments = data ?? [];

  return (
    <div className="relative z-10 bg-teal-900 py-8 md:py-16">
      <div className="bg-white rounded-3xl mx-4 md:mx-8 lg:mx-12 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 px-6 py-2 rounded-full">
              <span className="text-gray-600 text-xs font-medium">Départements</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-teal-700 text-2xl md:text-4xl lg:text-4xl font-light max-w-4xl mx-auto leading-tight">
              Tools to help you share the Gospel{" "}
              <span className="text-green-400 italic font-script" style={{ fontFamily: "cursive" }}>
                anywhere
              </span>{" "}
              in the world.
            </h2>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-20 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Chargement des départements…
            </div>
          ) : isError ? (
            <div className="py-20 text-center text-red-500">
              Erreur lors du chargement des départements.
            </div>
          ) : (
            <Carousel opts={{ align: "start" }} className="w-full mx-auto">
              <CarouselContent className="-ml-4">
                {departments.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 w-full lg:basis-1/3">
                    <Link href={`/departments/${item.id}`} className="group">
                      <div className="bg-gray-100 rounded-2xl p-8 mb-4 aspect-square flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-2"></div>
                <div className="flex space-x-2">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </div>
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
}
