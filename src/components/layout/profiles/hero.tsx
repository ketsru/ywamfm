"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import YwamFondements from "./jem/fondements"
import { ChangePassword } from "./change_password"

type TabKey = "info" | "password" | "important"

export default function ProfileHero() {
    const [activeTab, setActiveTab] = useState<TabKey>("info")

    return (
        <>
            {/* Cover */}
            <div className="lg:rounded-t-md shadow-xs h-56 bg-[url('/assets/images/0af7741991985e2b530c8f62135c3eea.jpg')] bg-cover bg-center bg-no-repeat" />

            {/* Avatar */}
            <div className="ml-6 sm:ml-12 -mt-16 sm:-mt-20">
                <Image
                    src="/assets/images/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white h-24 w-24 sm:h-32 sm:w-32"
                />
            </div>

            {/* Tabs */}
            <div className="mt-0 px-2">
                <div className="flex gap-2 overflow-x-auto sm:overflow-visible sm:justify-center">
                    <TabButton
                        active={activeTab === "info"}
                        onClick={() => setActiveTab("info")}
                    >
                        Informations personnelles
                    </TabButton>

                    <TabButton
                        active={activeTab === "password"}
                        onClick={() => setActiveTab("password")}
                    >
                        Modifier mot de passe
                    </TabButton>

                    <TabButton
                        active={activeTab === "important"}
                        onClick={() => setActiveTab("important")}
                    >
                        Important à connaître
                    </TabButton>
                </div>
            </div>

            {/* Content */}
            <div className="mt-6 px-0">
                {activeTab === "info" && (
                    <div className="space-y-2 px-4 lg:px-0">
                        <h2 className="text-lg font-semibold">
                            Informations personnelles
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Nom, prénom, email, téléphone, adresse…
                        </p>
                    </div>
                )}

                {activeTab === "password" && (
                    <div className="space-y-2 px-4 lg:px-0">
                        <h2 className="text-lg font-semibold">
                            Modifier le mot de passe
                        </h2>
                        <div>
                            <ChangePassword />
                        </div>
                    </div>
                )}

                {activeTab === "important" && (
                    <div className="space-y-2 px-4 lg:px-0">
                        <h2 className="text-lg font-semibold">
                            Valeurs fondamentales de Jeunesse En Mission
                        </h2>
                        <div>
                            <YwamFondements />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

/* ----------------------- */
/* Reusable Tab Button     */
/* ----------------------- */
function TabButton({
    active,
    children,
    onClick,
}: {
    active: boolean
    children: React.ReactNode
    onClick: () => void
}) {
    return (
        <Button
            variant={active ? "default" : "outline"}
            onClick={onClick}
            className={cn(
                "whitespace-nowrap transition-all",
                active && "shadow-sm"
            )}
        >
            {children}
        </Button>
    )
}
