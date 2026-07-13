"use client"

import { useMemo, useState } from "react"
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function getStrength(password: string) {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 1) return { label: "Faible", color: "bg-red-500", width: "25%" }
    if (score <= 2) return { label: "Moyen", color: "bg-amber-500", width: "50%" }
    if (score <= 3) return { label: "Bon", color: "bg-lime-500", width: "75%" }
    return { label: "Excellent", color: "bg-green-600", width: "100%" }
}

export function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [visibility, setVisibility] = useState({ old: false, new: false, confirm: false })

    const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword
    const isValid = oldPassword.length > 0 && newPassword.length >= 8 && passwordsMatch
    const strength = useMemo(() => getStrength(newPassword), [newPassword])

    const toggle = (field: keyof typeof visibility) =>
        setVisibility((v) => ({ ...v, [field]: !v[field] }))

    return (
        <div className="grid w-full max-w-xl gap-6 mb-8">
            {/* Ancien mot de passe */}
            <InputGroup>
                <InputGroupAddon><Lock className="h-4 w-4" /></InputGroupAddon>
                <InputGroupInput
                    type={visibility.old ? "text" : "password"}
                    placeholder="Ancien mot de passe"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <InputGroupAddon
                    className="cursor-pointer"
                    onClick={() => toggle("old")}
                    aria-label={visibility.old ? "Masquer" : "Afficher"}
                >
                    {visibility.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </InputGroupAddon>
            </InputGroup>

            {/* Nouveau mot de passe */}
            <div className="space-y-2">
                <InputGroup>
                    <InputGroupAddon><Lock className="h-4 w-4" /></InputGroupAddon>
                    <InputGroupInput
                        type={visibility.new ? "text" : "password"}
                        placeholder="Nouveau mot de passe (min. 8 caractères)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputGroupAddon className="cursor-pointer" onClick={() => toggle("new")}>
                        {visibility.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </InputGroupAddon>
                </InputGroup>

                {newPassword.length > 0 && (
                    <div className="space-y-1">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-300", strength.color)}
                                style={{ width: strength.width }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Force du mot de passe : <span className="font-medium">{strength.label}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Confirmation */}
            <InputGroup>
                <InputGroupAddon><Lock className="h-4 w-4" /></InputGroupAddon>
                <InputGroupInput
                    type={visibility.confirm ? "text" : "password"}
                    placeholder="Confirmer le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className={cn(
                        confirmPassword.length > 0 && !passwordsMatch &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                />
                <InputGroupAddon
                    className="cursor-pointer"
                    onClick={() => confirmPassword.length === 0 && toggle("confirm")}
                >
                    {passwordsMatch ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : visibility.confirm ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </InputGroupAddon>
            </InputGroup>

            {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-sm text-red-600" role="alert">
                    Les mots de passe ne correspondent pas
                </p>
            )}

            <Button disabled={!isValid} className="self-start h-11">
                Mettre à jour le mot de passe
            </Button>
        </div>
    )
}