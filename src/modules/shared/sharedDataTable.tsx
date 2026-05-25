"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    useReactTable,
    type ColumnDef,
    } from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SharedDataTableToolbar } from "./sharedDataTableToolbar"
import { SharedDataTablePagination } from "./sharedDataTablePagination"


/* ========================= TYPES ============================== */
type DataTableProps<TData> = {
    columns: ColumnDef<TData, unknown>[]
    data: TData[]
    filterColumn?: string
    actions?: React.ReactNode // Custom action buttons (Create, Export, etc.)
    isLoading?:   boolean,
    onFilterClick?: () => void 
    activeFiltersCount?: number 
}

/* ====================== COMPONENT ============================== */
export function SharedDataTable<TData>({
    columns,
    data,
    filterColumn = "name",
    actions,
    isLoading = false,
    onFilterClick,
    activeFiltersCount,
}: DataTableProps<TData>) {
    /* ------------------------------------------------------------
        STATE MANAGEMENT
        Table states are controlled for better scalability.
    ------------------------------------------------------------ */

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    /* ------------------------------------------------------------
        TABLE INSTANCE
        useReactTable is memo-optimized internally,
        so no need for extra useMemo here.
    ------------------------------------------------------------ */

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    /* ======================= RENDER ========================== */

    if (isLoading) return <div>Chargement...</div>;

    return (
        <div className="w-full space-y-4">
            {/* --------------------------------------------------------
                TOOLBAR
                Handles search, filters and custom actions.
            -------------------------------------------------------- */}
            <SharedDataTableToolbar
                table={table}
                filterColumn={filterColumn}
                extraActions={actions}
                onFilterClick={onFilterClick}           // nouveau
                activeFiltersCount={activeFiltersCount}
            />

            {/* --------------------------------------------------------
            TABLE CONTAINER
            -------------------------------------------------------- */}
            <div className="overflow-hidden rounded-xl border shadow-md">
                <Table className="">
                    {/* ================= HEADER ================= */}
                    <TableHeader className="h-14 bg-neutral-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                            <TableHead
                                key={header.id}
                                className="font-semibold uppercase text-xs"
                            >
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            ))}
                        </TableRow>
                        ))}
                    </TableHeader>

                    {/* ================= BODY ================= */}
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="h-14"
                                >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))
                        ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No data available.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* ================= PAGINATION ================= */}
                <SharedDataTablePagination table={table} />
            </div>

            {/* ========================================================
                TODO LIST (Future Improvements)
            ======================================================== */}

            {/*
                TODO:
                - Add loading skeleton state
                - Add server-side pagination support
                - Add server-side filtering support
                - Add column resizing
                - Add column reordering (drag & drop)
                - Add row click navigation (optional prop)
                - Add export to CSV functionality
                - Add virtualization for large datasets (react-virtual)
            */}
        </div>
    )
}