"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { UserService } from "@/lib/types/users/user/user.service"
import { UserUpdateSelfRequest } from "@/lib/types/users/user/user.types"
import { SelfProfileForm } from "@/components/layout/forms/access/selfProfileForm"

export function UpdateProfileDialog() {
    const { user, refresh } = useCurrentUser()
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<UserUpdateSelfRequest | null>(null)
    const [formValid, setFormValid] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | undefined>()

    if (!user) return null

    const handleSubmit = async () => {
        if (!formData || !formValid) return

        setSubmitting(true)
        setError(undefined)
        try {
            await UserService.updateMe(formData)
            await refresh()
            toast.success("Profil mis à jour")
            setOpen(false)
        } catch {
            setError("Impossible de mettre à jour le profil. Réessayez.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                    <Pencil className="h-3.5 w-3.5" />
                    Modifier
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Modifier mes informations</DialogTitle>
                </DialogHeader>

                <SelfProfileForm
                    defaultValues={user}
                    onChange={(data, isValid) => {
                        setFormData(data)
                        setFormValid(isValid)
                    }}
                    error={error}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} disabled={!formValid || submitting}>
                        {submitting ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}