import { OrateursDataTable } from "@/components/layout/admin/orateur";
import { ArrowUpNarrowWide } from "lucide-react";


export default function Orateurs () {
    return (
        <>
            <h2 className="md:text-3xl text-xl font-extrabold mt-4 flex gap-2 items-center">
                <ArrowUpNarrowWide size={20} />
                Liste des orateurs
            </h2>
            <div>
                <OrateursDataTable />
            </div>
        </>
    )   
}