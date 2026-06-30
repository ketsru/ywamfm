
import { BookDataTable } from "@/modules/books/bookDataTable";
import { ArrowUpNarrowWide } from "lucide-react";


export default function Livres () {
    return (
        <>
            <h2 className="md:text-3xl text-xl font-extrabold mt-4 flex gap-2 items-center">
                <ArrowUpNarrowWide size={20} />
                Liste des livres
            </h2>
            <div>
                <BookDataTable />
            </div>
        </>
    )
}