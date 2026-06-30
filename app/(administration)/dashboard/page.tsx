"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { bibleVerses } from "@/components/data/user/bibleVerses"

import { Separator } from "@/components/ui/separator";
import { TotalCountryCard } from "@/modules/dashboard/totalCountryCard";
import { TotalDepartmentCard } from "@/modules/dashboard/TotalDepartmentCard";
import { TotalRevenueCard } from "@/modules/dashboard/totalRevenueCard";
import { TotalRefusedContractCard } from "@/modules/dashboard/totalStaffCard";
import { TotalStudentiRegistrationCard } from "@/modules/dashboard/totalStudentiRegistrationCard";
import { TotalUserCard } from "@/modules/dashboard/totalUserCard";
import { LayoutDashboard } from "lucide-react";


export default function DashboardPage() {

    const [currentVerseIndex, setCurrentVerseIndex] = useState(0)
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentVerseIndex((prev) =>
            prev === bibleVerses.length - 1 ? 0 : prev + 1
          )
        }, 10000) // change toutes les 5 secondes
    
        return () => clearInterval(interval)
      }, [])
    
      const verse = bibleVerses[currentVerseIndex]

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="w-full">
                <h2 className="lg:text-3xl md:text-2xl text-xl font-bold pt-4 flex gap-2 items-center">
                    <div className="lg:p-1.5 md:p-1 p.0.5 border rounded-sm">
                        <LayoutDashboard size={20} />
                    </div>
                    Tableau de bord
                </h2>
            </div>

            <div className="w-full h-px bg-muted mb-3" />

            {/* KPI — bandeau pleine largeur */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <TotalUserCard totalUsers={100} />
                <TotalRevenueCard totalRevenue={5000000} />
                <TotalStudentiRegistrationCard totalReservations={200} />
                <TotalDepartmentCard totalCategories={10} />
                <TotalCountryCard totalCountries={5} />
                <TotalRefusedContractCard totalRefusedContracts={50} />
            </div>

            {/* Graphiques — radial + barres côte à côte */}
            {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                <VisitorsRadialChart />
                </div>
                <div className="lg:col-span-2">
                <SalesBarChart />
                </div>
            </div> */}

            {/* Tendance — pleine largeur, plus lisible pour une courbe */}
            {/* <ProductSalesAreaChart /> */}
        </div>
    );
}