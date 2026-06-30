"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { mockRegisterSchools } from "@/components/data/admin/mock-register-schools";
import { CreateSchoolDialog } from "./schoolFormDialog";

export function SchoolDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={mockRegisterSchools}
      filterColumn="name"
      actions={<CreateSchoolDialog />}
    />
  );
}