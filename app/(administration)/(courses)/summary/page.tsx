
import { RapportDataTable } from "@/modules/rapports/rapportDataTable";
import { BookOpenCheck } from "lucide-react";

export default function Raports () {
    return (
        <>
            <div className="w-full">
                <h2 className="lg:text-3xl md:text-2xl text-xl font-bold py-4 flex gap-2 items-center">
                    <div className="lg:p-1.5 md:p-1 p.0.5 border rounded-sm">
                        <BookOpenCheck size={20} />
                    </div>
                    Gestion des rapports
                </h2>
            </div>

            <div className="w-full h-px bg-muted mb-3" />

            <div>
                <RapportDataTable />
            </div>
        </>
    )
}