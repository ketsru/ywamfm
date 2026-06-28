"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { themesData } from "@/components/data/admin/theme";
import { CreateThemeDialog } from "./createThemeDialog";

export function ThemeDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={themesData}
      filterColumn="name"
      actions={<CreateThemeDialog />}
    />
  );
}