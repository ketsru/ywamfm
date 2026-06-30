"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { mockRoles } from "@/components/data/admin/mock-roles";
import { CreateRoleDialog } from "./roleFormDialog";

export function RoleDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={mockRoles}
      filterColumn="name"
      actions={<CreateRoleDialog />}
    />
  );
}