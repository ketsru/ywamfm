import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Article } from "@/lib/types/communications/newsletter/blog.types"

export const columns: ColumnDef<Article>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue<Article["image"]>("image")
            return (
                <Image
                src={image.src}
                alt={image.alt}
                width={80}
                height={80}
                className="h-16 w-16 rounded-md object-cover"
                />
            )
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="font-extrabold"
            >
                Titre
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "excerpt",
        header: "Résumé",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate text-muted-foreground">
                {row.getValue("excerpt")}
            </div>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("type")}</div>
        ),
    },
    {
        accessorKey: "episode",
        header: "Épisode",
        cell: ({ row }) => {
            const episode = row.getValue<string>("episode")
            return episode ? (
                <div className="font-medium">{episode}</div>
            ) : (
                <span className="text-muted-foreground">—</span>
            )
        },
    },
    {
        accessorKey: "actionLabel",
        header: "Action",
        cell: ({ row }) => {
            const slug = row.getValue<string>("slug")
            const label = row.getValue<string>("actionLabel")
            return (
                <Link href={`/articles/${slug}`} className="text-blue-600 underline">
                {label}
                </Link>
            )
        },
    },
]
