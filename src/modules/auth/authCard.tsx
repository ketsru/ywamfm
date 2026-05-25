// "@/components/layout/auth/AuthCard.tsx"
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
    /** Titre principal de la carte */
    title: string;

    /** Description sous le titre */
    description?: string;

    /** Contenu central (souvent ton formulaire) */
    children: React.ReactNode;

    /** Libellé du bouton principal */
    primaryLabel: string;

    /**
     * Gestionnaire du bouton principal (souvent "submit").
     * - Si tu as une balise <form> autour de children, passe onSubmit ici.
     * - Si ton formulaire est contrôlé à l'intérieur, tu peux appeler formRef.current?.requestSubmit() depuis ici.
     */
    onPrimary?: (e?: React.FormEvent | React.MouseEvent) => void | Promise<void>;

    /** Désactive le bouton principal (ex. loading) */
    primaryDisabled?: boolean;

    /** Bouton d’action secondaire (ex. "Inscription" / "Connexion") */
    actionLabel?: string;
    onAction?: () => void;

    /** Classes supplémentaires pour le Card wrapper */
    cardClassName?: string;

    /** Afficher/masquer le footer (si tu n’as pas de CTA principal) */
    hideFooter?: boolean;
};

export function AuthCard({
    title,
    description,
    children,
    primaryLabel,
    onPrimary,
    primaryDisabled,
    actionLabel,
    onAction,
    cardClassName,
    hideFooter,
}: AuthCardProps) {
    return (
        <Card className={`w-full max-w-4xl mx-auto mt-10 md:mt-5 shadow-none border border-gray-200 ${cardClassName ?? ""}`}>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                {description ? (
                    <CardDescription>{description}</CardDescription>
                ) : null}

                    {actionLabel && onAction ? (
                    <CardAction>
                        <Button
                            onClick={onAction}
                            variant="link"
                            className="text-lg font-bold hover:text-[#fbbf24] cursor-pointer"
                        >
                            {actionLabel}
                        </Button>
                    </CardAction>
                ) : null}
            </CardHeader>

            <CardContent>{children}</CardContent>

            {hideFooter ? null : (
                <CardFooter className="flex-col gap-2">
                    {/* <Button
                        type="submit"
                        className="w-full h-11"
                        onClick={onPrimary}
                        disabled={primaryDisabled}
                    >
                        {primaryLabel}
                    </Button> */}
                    
                    <Button
                        type="button"
                        className="w-full h-11 cursor-pointer"
                        onClick={onPrimary}
                        disabled={primaryDisabled}
                    >
                        {primaryLabel}
                    </Button>

                </CardFooter>
            )}
        </Card>
    );
}