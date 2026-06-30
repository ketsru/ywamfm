// createCategoryDialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";

export function CreateJournalDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        + Ajouter un journal
      </Button>

      <CrudDialog
        title="Ajouter un journal"
        description="Créer un nouveau journal dans le système."
        open={open}
        onOpenChange={setOpen}
      >
        Form Journal
      </CrudDialog>
    </>
  );
}