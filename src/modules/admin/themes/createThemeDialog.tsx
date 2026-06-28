// createCategoryDialog.tsx
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { ThemeForm } from "@/components/layout/forms/metier/themeForm";

export function CreateThemeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        + Ajouter un thème
      </Button>

      <CrudDialog
        title="Ajouter une catégorie"
        description="Créer une nouvelle catégorie dans le système."
        open={open}
        onOpenChange={setOpen}
      >
        <ThemeForm formId={""} onSubmit={function (data: { name: string; description?: string | null | undefined; }): void {
                  throw new Error("Function not implemented.");
              } } />
      </CrudDialog>
    </>
  );
}