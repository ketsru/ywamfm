"use client";

import { Separator } from "@/components/ui/separator";
import { TotalCountryCard } from "@/modules/dashboard/totalCountryCard";
import { TotalDepartmentCard } from "@/modules/dashboard/TotalDepartmentCard";
import { TotalRevenueCard } from "@/modules/dashboard/totalRevenueCard";
import { TotalRefusedContractCard } from "@/modules/dashboard/totalStaffCard";
import { TotalStudentiRegistrationCard } from "@/modules/dashboard/totalStudentiRegistrationCard";
import { TotalUserCard } from "@/modules/dashboard/totalUserCard";
import { LayoutDashboard } from "lucide-react";


export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Header */}
            <div>
                <h2 className="flex items-center gap-2 py-4 text-xl font-bold md:text-2xl lg:text-3xl">
                <span className="flex items-center justify-center rounded-sm bg-secondary p-1.5 text-primary">
                    <LayoutDashboard className="size-5" />
                </span>
                Tableau de bord
                </h2>
                <Separator />
            </div>

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