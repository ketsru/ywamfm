"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/* ========================= TYPES ============================== */

type BaseProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    showFooter?: boolean;
    confirmLabel?: React.ReactNode;
    cancelLabel?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    preventOutsideClose?: boolean;
    contentClassName?: string;
    /**
     * Taille du dialog
     * - "sm"  : max-w-sm  (petits formulaires, confirmations)
     * - "md"  : max-w-xl  (défaut)
     * - "lg"  : max-w-2xl (formulaires larges)
     * - "xl"  : max-w-4xl (contenus riches, tableaux)
     * - "full": w-[95vw] max-w-6xl (plein écran large)
     */
    size?: "sm" | "md" | "lg" | "xl" | "full";
};

type ControlledProps = BaseProps & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger?: never;
    defaultOpen?: never;
};

type UncontrolledProps = BaseProps & {
    trigger: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    open?: never;
};

export type CrudDialogProps = ControlledProps | UncontrolledProps;

/* ======================== SIZE MAP ============================== */

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
    sm:   "w-[95vw] sm:max-w-sm",
    md:   "w-[95vw] sm:max-w-xl",
    lg:   "w-[95vw] sm:max-w-2xl",
    xl:   "w-[95vw] sm:max-w-4xl",
    full: "w-[95vw] sm:max-w-5xl 2xl:max-w-6xl",
};

/* ======================== COMPONENT ============================== */

export function CrudDialog(props: CrudDialogProps) {
    const {
        open,
        title,
        description,
        children,
        onOpenChange,
        trigger,
        showFooter = false,
        confirmLabel = "Save",
        cancelLabel = "Cancel",
        onConfirm,
        onCancel,
        preventOutsideClose = false,
        contentClassName,
        size = "md",
    } = props;

    const handleOpenChange = (state: boolean) => {
        if (!state && preventOutsideClose) return;
        onOpenChange?.(state);
    };

    return (
        <Dialog
            open={"open" in props ? open : undefined}
            defaultOpen={"defaultOpen" in props ? props.defaultOpen : undefined}
            onOpenChange={handleOpenChange}
        >
            {"trigger" in props && trigger && (
                <DialogTrigger asChild>{trigger}</DialogTrigger>
            )}

            <DialogContent
                className={`
                    ${sizeClasses[size]}
                    rounded-xl sm:rounded-2xl
                    overflow-hidden
                    max-h-[95vh] sm:max-h-[90vh]
                    p-0
                    ${contentClassName ?? ""}
                `}
            >
                {/* HEADER */}
                <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
                    <DialogTitle className="text-base sm:text-lg lg:text-xl font-semibold leading-snug">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {/* BODY */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto max-h-[calc(95vh-10rem)] sm:max-h-[calc(90vh-10rem)]">
                    {children}
                </div>

                {/* FOOTER */}
                {showFooter && (
                    <DialogFooter className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-muted/20 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => {
                                onCancel?.();
                                onOpenChange?.(false);
                            }}
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            className="w-full sm:w-auto"
                            onClick={() => onConfirm?.()}
                        >
                            {confirmLabel}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}