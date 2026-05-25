import { DepartmentDataTable } from "@/modules/admin/departments/departmentDataTable";
import { ArrowUpNarrowWide } from "lucide-react";


export default function Departments () {
    return (
        <>
            <h2 className="md:text-3xl text-xl font-extrabold mt-4 flex gap-2 items-center">
                <ArrowUpNarrowWide size={20} />
                Liste des départements
            </h2>
            <div>
                <DepartmentDataTable />
            </div>
        </>
    )
}