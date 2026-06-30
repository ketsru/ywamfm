// createCategoryDialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { RoleForm } from "@/components/layout/forms/access/roleForm";
import { RoleRequestDto } from "@/lib/types/access/role/role.types";

export function CreateRoleDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        + Ajouter un rôle
      </Button>

      <CrudDialog
        title="Ajouter un rôle"
        description="Créer un nouveau rôle dans le système."
        open={open}
        onOpenChange={setOpen}
      >
        <RoleForm onSubmit={function (data: RoleRequestDto): Promise<void> | void {
                  throw new Error("Function not implemented.");
              } } />
      </CrudDialog>
    </>
  );
}