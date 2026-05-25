"use client"

import * as React from "react"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Table } from "@tanstack/react-table"

/* ======================== TYPES ================================ */
interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

/* ======================= COMPONENT ============================== */
export function SharedDataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    /* ------------------------------------------------------------
        PAGINATION STATE
    ------------------------------------------------------------ */

    const {
        pageIndex,
        pageSize,
    } = table.getState().pagination

    const totalRows = table.getFilteredRowModel().rows.length
    const pageCount = table.getPageCount()

    const startRow = pageIndex * pageSize + 1
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

    /* ======================== RENDER ============================ */

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 border-t bg-muted/20">

            {/* ======================= LEFT SECTION — PAGE INFO ============================ */}

            <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                    {totalRows === 0 ? 0 : startRow}
                </span>{" "}
                to{" "}
                <span className="font-medium text-foreground">
                    {endRow}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                    {totalRows}
                </span>{" "}
                results
            </div>

            {/*
                TODO (Page Info):
                - Handle server-side total count
                - Add loading state when fetching next page
            */}

            {/* ========================= RIGHT SECTION — CONTROLS ======================== */}

            <div className="flex items-center gap-3">

                {/* Page Size Selector */}
                <Select
                    value={String(pageSize)}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger className="h-8 w-25">
                        <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 30, 50, 100].map((size) => (
                        <SelectItem key={size} value={String(size)}>
                            {size} / page
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/*
                TODO (Page Size):
                - Persist page size in localStorage
                - Allow custom page size options via props
                */}

                {/* First Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Current Page Indicator */}
                <div className="text-sm font-medium px-2">
                    Page {pageIndex + 1} of {pageCount}
                </div>

                {/* Next Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.setPageIndex(pageCount - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>

            {/*
                TODO (Navigation):
                - Add keyboard navigation support
                - Add page number input for direct navigation
                - Add compact mode for mobile
                - Animate page transitions
            */}
        </div>
    )
}