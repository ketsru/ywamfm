"use client"

import { useState } from "react"
import { toast, Toaster } from "sonner"
import { Camera, Copy, CheckCircle, AlertCircle } from "lucide-react"

import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { AccountStatus } from "@/lib/types/users/user/user.types"
import { ImageUploader } from "@/modules/shared/imageUploader"
import { UserService } from "@/lib/types/users/user/user.service"
import { cn } from "@/lib/utils"

const MAX_AVATAR_SIZE = 5 * 1024 * 1024 // 5 Mo

interface ProfileIdentityCardProps {
    className?: string
}

export function ProfileIdentityCard({ className }: ProfileIdentityCardProps) {
    const { user, loading, refresh } = useCurrentUser()
    const [avatarOpen, setAvatarOpen] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File | undefined>()
    const [uploading, setUploading] = useState(false)

    // ── Chargement ────────────────────────────────────────────────────────
    if (loading) {
        return (
            <Card className={cn("p-4 sm:p-6 animate-pulse", className)} aria-busy="true">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted shrink-0" />
                    <div className="space-y-2 flex-1">
                        <div className="h-5 w-40 bg-muted rounded" />
                        <div className="h-4 w-56 bg-muted rounded" />
                    </div>
                </div>
            </Card>
        )
    }

    // ── Erreur ────────────────────────────────────────────────────────────
    if (!user) {
        return (
            <Card className={cn("p-4 sm:p-6 flex items-center gap-3", className)}>
                <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                <p className="text-sm text-muted-foreground">Profil indisponible.</p>
                <Button variant="outline" size="sm" onClick={() => refresh()} className="ml-auto">
                    Réessayer
                </Button>
            </Card>
        )
    }

    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Utilisateur"
    const initials = [user.firstName?.[0], user.lastName?.[0]]
        .filter(Boolean).join("").toUpperCase() || "?"

    const statusBadge = (() => {
        switch (user.status) {
            case AccountStatus.ACTIVE:
                return { color: "border-green-300 text-green-700", label: "Compte actif" }
            case AccountStatus.SUSPENDED:
                return { color: "border-red-300 text-red-600", label: "Compte suspendu" }
            case AccountStatus.PENDING_VALIDATION:
                return { color: "border-amber-300 text-amber-700", label: "En attente de validation" }
            default:
                return { color: "border-gray-300 text-gray-600", label: "Statut inconnu" }
        }
    })()

    const handleAvatarSave = async () => {
        if (!avatarFile) return

        if (avatarFile.size > MAX_AVATAR_SIZE) {
            toast.error("L'image ne doit pas dépasser 5 Mo")
            return
        }
        if (!avatarFile.type.startsWith("image/")) {
            toast.error("Le fichier doit être une image")
            return
        }

        setUploading(true)
        try {
            await UserService.updateMyAvatar(avatarFile)
            await refresh()
            toast.success("Photo de profil mise à jour")
            setAvatarOpen(false)
            setAvatarFile(undefined)
        } catch {
            toast.error("Erreur lors de la mise à jour de la photo. Réessayez.")
        } finally {
            setUploading(false)
        }
    }

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(user.email)
            toast.success("Email copié")
        } catch {
            toast.error("Impossible de copier l'email")
        }
    }

    return (
        <Card className={cn("p-4 sm:p-6 shadow-md", className)}>
            <Toaster position="bottom-right" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Avatar */}
                <div className="relative group shrink-0">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={fullName}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-background shadow-md bg-muted"
                        />
                    ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 border-4 border-background shadow-md flex items-center justify-center">
                            <span className="text-xl sm:text-2xl font-bold text-primary">{initials}</span>
                        </div>
                    )}

                    <Dialog open={avatarOpen} onOpenChange={setAvatarOpen}>
                        <DialogTrigger asChild>
                            <button
                                className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center justify-center outline-none"
                                aria-label="Changer la photo de profil"
                            >
                                <Camera className="w-5 h-5 text-white" />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Changer la photo de profil</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-2">
                                <ImageUploader
                                    value={avatarFile}
                                    onChange={(f) =>
                                        setAvatarFile(
                                            f === undefined ? undefined
                                            : Array.isArray(f) ? f[0]
                                            : f
                                        )
                                    }
                                    existingUrls={user.avatarUrl || undefined}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Formats acceptés : JPG, PNG. Taille maximale : 5 Mo.
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setAvatarOpen(false)
                                            setAvatarFile(undefined)
                                        }}
                                        disabled={uploading}
                                    >
                                        Annuler
                                    </Button>
                                    <Button onClick={handleAvatarSave} disabled={!avatarFile || uploading}>
                                        {uploading ? "Enregistrement..." : "Enregistrer"}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Identité */}
                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold truncate">{fullName}</h1>
                        {user.roleName && (
                            <Badge className="bg-primary/10 text-primary border-0 font-medium">
                                {user.roleName}
                            </Badge>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group/email"
                    >
                        {user.email}
                        <Copy className="w-3.5 h-3.5 opacity-0 group-hover/email:opacity-100 transition-opacity" />
                    </button>

                    <div className="flex flex-wrap gap-2 pt-1">
                        <Badge variant="outline" className={statusBadge.color}>
                            {statusBadge.label}
                        </Badge>
                        {user.verified && (
                            <Badge variant="outline" className="border-blue-300 text-blue-700">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Email vérifié
                            </Badge>
                        )}
                        {user.profileCompleted && (
                            <Badge variant="outline" className="border-purple-300 text-purple-700">
                                Profil complété
                            </Badge>
                        )}
                        {user.deletionRequested && (
                            <Badge variant="outline" className="border-red-300 text-red-600">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Suppression demandée
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}