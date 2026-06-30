// createCategoryDialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CrudDialog } from "@/modules/shared/crudDialog";

export function CreateBlogDialog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                + Ajouter un article
            </Button>

            <CrudDialog
                title="Ajouter un article"
                description="Créer un nouveau article dans le système."
                open={open}
                onOpenChange={setOpen}
            >
                Form Blog
            </CrudDialog>
        </>
    );
}