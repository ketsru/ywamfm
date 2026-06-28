"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";
import { ThemeActionsCell } from "./themeActionCell";


export const columns: ColumnDef<ThemeResponseDto>[] = [ 
    {
        accessorKey: "name",
        header: "Thème",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="font-medium truncate">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "stockQuantity",
        header: "Stock",
        cell: ({ row }) => {
        const qty = row.getValue("stockQuantity") as number;
        const isLow  = qty > 0 && qty <= 5;
        const isEmpty = qty === 0;

        return (
            <Badge
                variant={isEmpty ? "destructive" : isLow ? "outline" : "secondary"}
                className={
                    isLow && !isEmpty
                    ? "border-amber-400 text-amber-600 dark:text-amber-400"
                    : ""
                }
            >
                {isEmpty ? "Rupture" : `${qty} unité${qty > 1 ? "s" : ""}`}
            </Badge>
        );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ThemeActionsCell category={row.original} />,
    },
]