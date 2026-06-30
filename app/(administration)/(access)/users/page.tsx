
import { UserDataTable } from "@/modules/users/userDataTable";
import { User2 } from "lucide-react";


export default function UserPage () {
    return (
        <>
            <div className="w-full">
                <h2 className="lg:text-3xl md:text-2xl text-xl font-bold py-4 flex gap-2 items-center">
                    <div className="lg:p-1.5 md:p-1 p.0.5 border rounded-sm">
                        <User2 size={20} />
                    </div>
                    Gestion des utilisateurs
                </h2>
            </div>

            <div className="w-full h-px bg-muted mb-3" />

            <div>
                <UserDataTable />
            </div>
        </>
    )
}