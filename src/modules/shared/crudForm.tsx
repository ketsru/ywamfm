"use client"

import * as React from "react"
import {
    useForm,
    type DefaultValues,
    type FieldValues,
    type SubmitHandler,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ZodType } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ============================================================
   TYPES
============================================================ */

interface CrudFormProps<T extends FieldValues> {
    schema: ZodType<T>
    defaultValues?: DefaultValues<T>
    onSubmit: (values: T) => Promise<void>
    children: (form: ReturnType<typeof useForm<T>>) => React.ReactNode
    submitLabel?: string
    resetAfterSubmit?: boolean
    disabled?: boolean
    /**
     * Layout des champs enfants
     * - "single" : une colonne (défaut)
     * - "double" : deux colonnes à partir de sm
     */
    layout?: "single" | "double"
}

/* ============================================================
   COMPONENT
============================================================ */

export function CrudForm<T extends FieldValues>({
    schema,
    defaultValues,
    onSubmit,
    children,
    submitLabel = "Save",
    resetAfterSubmit = false,
    disabled = false,
    layout = "single",
}: CrudFormProps<T>) {

    const form = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onChange",
    })

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting, isValid },
    } = form

    const onFormSubmit: SubmitHandler<T> = async (values) => {
        try {
            await onSubmit(values)
            if (resetAfterSubmit) reset()
        } catch (error) {
            console.error("Form submission error:", error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex flex-col gap-4 sm:gap-5"
        >
            {/* FIELDS */}
            <div className={
                layout === "double"
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                    : "flex flex-col gap-4 sm:gap-5"
            }>
                {children(form)}
            </div>

            {/* SUBMIT */}
            <Button
                type="submit"
                className="w-full h-10 sm:h-11 rounded-xl mt-1 gap-2"
                disabled={isSubmitting || !isValid || disabled}
            >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Traitement..." : submitLabel}
            </Button>
        </form>
    )
}