"use client"

import {
    Globe, Shield, User as UserIcon, AlertCircle,
} from "lucide-react"

import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdateProfileDialog } from "./updateProfileDialog"

// ── Helpers ──────────────────────────────────────────────────────────────

function formatDate(value?: string | null, withTime = false) {
    if (!value) return undefined
    return new Date(value).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    })
}

// ── Sub-components ───────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="flex items-center justify-between gap-4 py-2.5 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground shrink-0">{label}</span>
            <span className="text-sm font-medium text-right truncate">
                {value ?? <span className="text-muted-foreground font-normal">—</span>}
            </span>
        </div>
    )
}

function SectionCard({
    icon,
    title,
    action,
    children,
}: {
    icon: React.ReactNode
    title: string
    action?: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {icon}
                    {title}
                </CardTitle>
                {action}
            </CardHeader>
            <CardContent className="pt-0">{children}</CardContent>
        </Card>
    )
}

// ── Main ─────────────────────────────────────────────────────────────────

export function ProfileView() {
    const { user, loading, refresh } = useCurrentUser()

    // ── Chargement ────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse" aria-busy="true">
                {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="h-3 w-32 bg-muted rounded" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[...Array(4)].map((_, r) => (
                                <div key={r} className="h-4 w-full bg-muted rounded" />
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    // ── Erreur ────────────────────────────────────────────────────────────
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    Impossible de charger vos informations.
                </p>
                <Button variant="outline" size="sm" onClick={() => refresh()}>
                    Réessayer
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SectionCard
                    icon={<UserIcon className="w-4 h-4" />}
                    title="Informations personnelles"
                    action={<UpdateProfileDialog />}
                >
                    <InfoRow label="Prénom" value={user.firstName} />
                    <InfoRow label="Nom" value={user.lastName} />
                    <InfoRow label="Email" value={user.email} />
                    <InfoRow label="Email confirmé le" value={formatDate(user.emailConfirmedAt, true)} />
                    {user.scheduledDeletionDate && (
                        <InfoRow
                            label="Suppression prévue le"
                            value={formatDate(user.scheduledDeletionDate)}
                        />
                    )}
                </SectionCard>

                <SectionCard icon={<Shield className="w-4 h-4" />} title="Compte">
                    <InfoRow label="Rôle" value={user.roleName} />
                    {user.roleKey && <InfoRow label="Clé du rôle" value={user.roleKey} />}
                    <InfoRow label="Membre depuis" value={formatDate(user.createdAt)} />
                    <InfoRow label="Dernière mise à jour" value={formatDate(user.updatedAt, true)} />
                    <InfoRow label="Dernière connexion" value={formatDate(user.lastLoginAt, true)} />
                </SectionCard>
            </div>

            {user.profile && (
                <SectionCard icon={<Globe className="w-4 h-4" />} title="Profil">
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                        <InfoRow label="Date de naissance" value={formatDate(user.profile.birthDate)} />
                        <InfoRow label="Situation familiale" value={user.profile.maritalStatus} />
                        <InfoRow label="Téléphone" value={user.profile.phone} />
                        <InfoRow label="Adresse" value={user.profile.address} />
                        <InfoRow label="Pays" value={user.profile.country} />
                        <InfoRow label="Indicatif pays" value={user.profile.countryCode} />
                    </div>
                </SectionCard>
            )}

            {user.permissions && user.permissions.length > 0 && (
                <SectionCard
                    icon={<Shield className="w-4 h-4" />}
                    title={`Permissions (${user.permissions.length})`}
                >
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pt-1">
                        {user.permissions.map((p) => (
                            <Badge
                                key={p}
                                variant="outline"
                                className="text-xs font-mono text-muted-foreground"
                            >
                                {p}
                            </Badge>
                        ))}
                    </div>
                </SectionCard>
            )}
        </div>
    )
}