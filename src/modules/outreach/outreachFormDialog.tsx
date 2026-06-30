// createCategoryDialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { RegisterOutreachForm } from "@/components/layout/forms/metier/registerOutreachForm";

export function CreateOutreachDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        + Ajouter une école
      </Button>

      <CrudDialog
        title="Ajouter une école"
        description="Créer une nouvelle école dans le système."
        open={open}
        onOpenChange={setOpen}
      >
        <RegisterOutreachForm formId={""} departments={[]} onSubmit={function (data: { departmentId: string; category: "ECOLE" | "INDEPENDANT"; image: string; status: "EN_ATTENTE" | "ANNULEE" | "TERMINEE"; }): void {
                  throw new Error("Function not implemented.");
              } } />
      </CrudDialog>
    </>
  );
}