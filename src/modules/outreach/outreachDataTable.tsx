"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { CreateOutreachDialog } from "./outreachFormDialog";
import { mockRegisterOutreaches } from "@/components/data/admin/mock-register-outreach";

export function OutreachDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={mockRegisterOutreaches}
      filterColumn="name"
      actions={<CreateOutreachDialog />}
    />
  );
}