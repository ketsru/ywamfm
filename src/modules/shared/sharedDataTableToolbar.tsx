"use client"

import * as React from "react"
import {
  FileDown,
  LayoutDashboard,
  PlusCircle,
  SearchIcon,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox";

import { Table } from "@tanstack/react-table"
import * as XLSX from "xlsx"

/* ================= TYPES =================== */

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  filterColumn?: string
  extraActions?: React.ReactNode
  onCreate?: () => void
  viewMode?: "table" | "grid"
  onViewModeChange?: (mode: "table" | "grid") => void
  filterDialog?: React.ReactNode
  onFilterClick?: () => void 
  activeFiltersCount?: number
}

/* ======================= COMPONENT ============================== */

export function SharedDataTableToolbar<TData>({
  table,
  filterColumn = "name",
  extraActions,
  onCreate,
  viewMode = "table",
  onViewModeChange,
  filterDialog,
  onFilterClick,
  activeFiltersCount = 0,
}: DataTableToolbarProps<TData>) {

  /* ------------------------------------------------------------
     LOCAL SEARCH STATE (Manual Trigger Mode)
     The search will only apply when the user clicks the button.
  ------------------------------------------------------------ */
  const [searchInput, setSearchInput] = React.useState("")
  const currentFilter =
    (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""

  /* ------------------------------------------------------------
     APPLY SEARCH
     Only updates table filter when button is clicked.
  ------------------------------------------------------------ */
  const applySearch = React.useCallback(() => {
    table.getColumn(filterColumn)?.setFilterValue(searchInput)
  }, [searchInput, table, filterColumn])

  /* ------------------------------------------------------------
     RESET FILTERS
  ------------------------------------------------------------ */
  const resetFilters = React.useCallback(() => {
    setSearchInput("")
    table.resetColumnFilters()
    table.resetSorting()
    table.resetGlobalFilter()
  }, [table])

  /* ------------------------------------------------------------
     EXPORT TO EXCEL
     Exports currently filtered rows.
  ------------------------------------------------------------ */
  const exportExcel = React.useCallback(() => {
    const rows = table
      .getFilteredRowModel()
      .rows.map((row) => row.original)

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

    XLSX.writeFile(workbook, "export.xlsx")
  }, [table])


  /* ====================== RENDER =============================== */

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-0">
      {/* ======================= LEFT SECTION — SEARCH =============================== */}

      <div className="flex items-center gap-2 w-full max-w-md">

        <Input
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-10 max-w-sm"
        />

        {/* Apply Search Button */}
        <Button
          onClick={applySearch}
          disabled={!searchInput.trim()}
          className="h-10"
        >
          <SearchIcon size="icon" />
          <span className="md:block hidden"> 
            Rechercher
          </span>
        </Button>

        {/* Reset Button */}
        {(currentFilter || searchInput) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={resetFilters}
            className="border border-primary hover:border-[#fbbf24] hover:text-[#fbbf24] rounded-full hover:shadow-2xl text-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* 
        TODO (Search Section):
        - Add "Enter key" support to trigger search
        - Add loading state if using server-side filtering
        - Add debounce option as optional prop
      */}

      {/* ========================== RIGHT SECTION — ACTIONS ============================ */}

      <div className="flex items-center gap-2 flex-wrap">
        {/* View Mode Switch */}
        {onViewModeChange && (
          <div className="flex gap-1">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("table")}
            >
              Table
            </Button>

            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
            >
              Grid
            </Button>
          </div>
        )}

        {/* 
          TODO (View Mode):
          - Persist selected mode in localStorage
          - Add icon-based toggle instead of text buttons
        */}

        {/* Export Button */}
        <Button size="lg" onClick={exportExcel}
          className="bg-gray-50 border border-primary cursor-pointer"
        >
          <FileDown className="h-6 w-6 text-foreground" />
        </Button>

        {/* 
          TODO (Export):
          - Allow CSV export
          - Allow selecting export format
          - Allow exporting only selected rows
        */}

        {/* Column Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg"
              className="bg-gray-50 border border-primary cursor-pointer"
            >
              <LayoutDashboard className="h-6 w-6 text-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <div className="space-y-2 px-2 py-3">
              {table.getAllLeafColumns().map((column) => (
                <div
                  key={column.id}
                  className="flex items-center space-x-2 space-y-2"
                >
                  <Checkbox
                    id={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={() => column.toggleVisibility()}
                    className="w-5 h-5 rounded-xs"
                  />
                  <label
                    htmlFor={column.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {column.columnDef.header as string}
                  </label>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 
          TODO (Columns):
          - Add "Show All / Hide All" option
          - Persist visibility settings per user
        */}

        {/* Filter Dialog */}
        {/* {onFilterClick && (
          <FilterDialogTrigger
            activeFiltersCount={activeFiltersCount}
            onClick={onFilterClick}
          />
        )}
        {filterDialog} */}

        {/* Extra Custom Actions */}
        {extraActions}

        {/* Create Button */}
        {onCreate && (
          <Button size="default" onClick={onCreate} className="cursor-pointer">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create
          </Button>
        )}

        {/* 
          TODO (Create Action):
          - Allow custom label via prop
          - Allow permission-based visibility
        */}
      </div>
    </div>
  )
}