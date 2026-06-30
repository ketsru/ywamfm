// createCategoryDialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ThemeForm } from "@/components/layout/forms/metier/themeForm";
import { RegisterSchoolForm } from "@/components/layout/forms/metier/registerSchoolForm";

export function CreateSchoolDialog() {
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
        <RegisterSchoolForm formId={""} departments={[]} onSubmit={function (data: { departmentId: string; name: string; type: "EN_PRESENTIELLE" | "EN_LIGNE"; category: "PAYANTE" | "GRATUITE"; status: "EN_ATTENTE" | "EN_COURS" | "ANNULEE" | "TERMINEE"; duration: number; price?: number | null | undefined; }): void {
                  throw new Error("Function not implemented.");
              } } />
      </CrudDialog>
    </>
  );
}