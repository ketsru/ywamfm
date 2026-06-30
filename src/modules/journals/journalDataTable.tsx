"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { mockRoles } from "@/components/data/admin/mock-roles";
import { journalMock } from "@/components/data/students/journal.data";
import { CreateJournalDialog } from "./journalFormDialog";

export function JournalDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={journalMock}
      filterColumn="theme_semaine"
      actions={<CreateJournalDialog />}
    />
  );
}