import { ThemesDataTable } from "@/components/layout/admin/theme";
import { ArrowUpNarrowWide } from "lucide-react";


export default function Themes () {
    return (
        <>
            <h2 className="md:text-3xl text-xl font-extrabold mt-4 flex gap-2 items-center">
                <ArrowUpNarrowWide size={20} />
                Liste des thèmes
            </h2>
            <div>
                <ThemesDataTable />
            </div>
        </>
    )
}