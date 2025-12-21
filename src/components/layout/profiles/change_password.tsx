"use client"

import { useState } from "react"
import {
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
} from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const passwordsMatch =
        newPassword.length > 0 &&
        newPassword === confirmPassword

    const isValid =
        oldPassword.length > 0 &&
        newPassword.length >= 8 &&
        passwordsMatch

    const type = showPassword ? "text" : "password"

    return (
        <div className="grid w-full max-w-xl gap-6 mb-8">
            {/* Ancien mot de passe */}
            <InputGroup>
                <InputGroupAddon>
                    <Lock className="h-4 w-4" />
                </InputGroupAddon>
                <InputGroupInput
                    type={type}
                    placeholder="Ancien mot de passe"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <InputGroupAddon
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </InputGroupAddon>
            </InputGroup>

            {/* Nouveau mot de passe */}
            <InputGroup>
                <InputGroupAddon>
                    <Lock className="h-4 w-4" />
                </InputGroupAddon>
                <InputGroupInput
                    type={type}
                    placeholder="Nouveau mot de passe (min. 8 caractères)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </InputGroup>

            {/* Confirmation */}
            <InputGroup>
                <InputGroupAddon>
                    <Lock className="h-4 w-4" />
                </InputGroupAddon>
                <InputGroupInput
                    type={type}
                    placeholder="Confirmer le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={cn(
                        confirmPassword.length > 0 &&
                        !passwordsMatch &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                />
                {passwordsMatch && (
                    <InputGroupAddon>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </InputGroupAddon>
                )}
            </InputGroup>

            {/* Message erreur */}
            {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-sm text-red-600">
                    Les mots de passe ne correspondent pas
                </p>
            )}

            {/* Submit */}
            <Button disabled={!isValid} className="self-start h-11">
                Mettre à jour le mot de passe
            </Button>
        </div>
    )
}
