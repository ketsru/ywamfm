"use client"

import { useState } from "react"
import { UserRound, KeyRound, BookOpenText } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import YwamFondements from "./jem/fondements"
import { ChangePassword } from "./change_password"
import { ProfileView } from "./profileView"

type TabKey = "info" | "password" | "important"

export default function ProfileHero() {
    const [activeTab, setActiveTab] = useState<TabKey>("info")

    return (
        <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabKey)}
            className="mt-6"
        >
            <div className="px-2 sm:px-0 sm:flex sm:justify-center sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2">
                <TabsList className="w-full sm:w-auto overflow-x-auto">
                    <TabsTrigger value="info" className="gap-1.5">
                        <UserRound className="h-4 w-4" />
                        <span className="hidden xs:inline">Informations personnelles</span>
                        <span className="xs:hidden">Infos</span>
                    </TabsTrigger>
                    <TabsTrigger value="password" className="gap-1.5">
                        <KeyRound className="h-4 w-4" />
                        Mot de passe
                    </TabsTrigger>
                    <TabsTrigger value="important" className="gap-1.5">
                        <BookOpenText className="h-4 w-4" />
                        Important à connaître
                    </TabsTrigger>
                </TabsList>
            </div>

            <div className="mt-6 px-4 lg:px-0">
                <TabsContent value="info" className="space-y-2">
                    <ProfileView />
                </TabsContent>

                <TabsContent value="password" className="space-y-2">
                    <h2 className="text-lg font-semibold">Modifier le mot de passe</h2>
                    <ChangePassword />
                </TabsContent>

                <TabsContent value="important" className="space-y-2">
                    <h2 className="text-lg font-semibold">
                        Valeurs fondamentales de Jeunesse En Mission
                    </h2>
                    <YwamFondements />
                </TabsContent>
            </div>
        </Tabs>
    )
}