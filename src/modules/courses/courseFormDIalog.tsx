// createCategoryDialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";

export function CreateCourseDialog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                + Ajouter un cours
            </Button>

            <CrudDialog
                title="Ajouter un cours"
                description="Créer un nouveau cours dans le système."
                open={open}
                onOpenChange={setOpen}
            >
                Form role
            </CrudDialog>
        </>
    );
}