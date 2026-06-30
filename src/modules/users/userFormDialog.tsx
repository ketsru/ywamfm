// createCategoryDialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";
import { RegisterOutreachForm } from "@/components/layout/forms/metier/registerOutreachForm";
import { UserForm } from "@/components/layout/forms/access/userForm";
import { UserRequestDto } from "@/lib/types/users/user/user.types";

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        + Ajouter un utilisateur
      </Button>

      <CrudDialog
        title="Ajouter un utilisateur"
        description="Créer un nouveau utilisateur dans le système."
        open={open}
        onOpenChange={setOpen}
      >
        <UserForm roles={[]} onSubmit={function (data: UserRequestDto): Promise<void> | void {
          throw new Error("Function not implemented.");
        } } />
      </CrudDialog>
    </>
  );
}