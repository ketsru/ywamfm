// modules/shared/entityActionsCell.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ConfirmDeleteDialog } from "./deleteConfirmationDialog";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ActionItem<T> {
    /** Libellé affiché */
    label: string;
    /** Icône Lucide */
    icon: React.ReactNode;
    /** Handler appelé avec l'entité */
    onSelect: (entity: T) => void | Promise<void>;
    /** Style destructif (rouge) */
    destructive?: boolean;
    /** Séparateur AU-DESSUS de cet item */
    separator?: boolean;
    /** Masquer cet item selon l'état de l'entité */
    hidden?: (entity: T) => boolean;
    /** Demander confirmation avant d'exécuter (ex: delete, disable) */
    confirm?: {
        title: (entity: T) => string;
        description: (entity: T) => string;
        itemName: (entity: T) => string;
    };
}

interface EntityActionsCellProps<T extends { id: string }> {
    entity: T;
    actions: ActionItem<T>[];
    menuWidth?: string;
}

// ─── Composant ───────────────────────────────────────────────────────────────

export function EntityActionsCell<T extends { id: string }>({
    entity,
    actions,
    menuWidth = "w-48",
}: EntityActionsCellProps<T>) {
    const [loading,        setLoading]        = useState(false);
    const [confirmAction,  setConfirmAction]  = useState<ActionItem<T> | null>(null);

    const handleSelect = async (action: ActionItem<T>) => {
        if (action.confirm) {
            setConfirmAction(action);
            return;
        }
        try {
            setLoading(true);
            await action.onSelect(entity);
        } catch (err) {
            console.error(`[EntityActionsCell] "${action.label}" failed:`, err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!confirmAction) return;
        try {
            setLoading(true);
            await confirmAction.onSelect(entity);
            setConfirmAction(null);
        } catch (err) {
            console.error(`[EntityActionsCell] confirmed "${confirmAction.label}" failed:`, err);
        } finally {
            setLoading(false);
        }
    };

    const visibleActions = actions.filter((a) => !a.hidden?.(entity));

    return (
        <div className="flex justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Actions"
                        disabled={loading}
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className={menuWidth}>
                    {visibleActions.map((action, i) => (
                        <span key={i}>
                            {action.separator && <DropdownMenuSeparator />}
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();
                                    handleSelect(action);
                                }}
                                className={
                                    action.destructive
                                        ? "text-destructive focus:text-destructive"
                                        : undefined
                                }
                            >
                                {action.icon}
                                {action.label}
                            </DropdownMenuItem>
                        </span>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog de confirmation (delete, disable, etc.) */}
            {confirmAction?.confirm && (
                <ConfirmDeleteDialog
                    open={!!confirmAction}
                    onOpenChange={(open) => { if (!open) setConfirmAction(null); }}
                    onConfirm={handleConfirm}
                    title={confirmAction.confirm.title(entity)}
                    description={confirmAction.confirm.description(entity)}
                    itemName={confirmAction.confirm.itemName(entity)}
                    loading={loading}
                />
            )}
        </div>
    );
}