"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { mockUsers } from "@/components/data/admin/mock-users";
import { CreateUserDialog } from "./userFormDialog";

export function UserDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={mockUsers}
      filterColumn="name"
      actions={<CreateUserDialog />}
    />
  );
}