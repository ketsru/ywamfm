"use client"

import { useEffect, useState } from "react"
import { bibleVerses } from "@/components/data/user/bibleVerses"
import ProfileHero from "@/components/layout/profiles/hero"
import { ProfileIdentityCard } from "@/components/layout/profiles/profileIdentityCard"
import { cn } from "@/lib/utils"

const VERSE_DURATION_MS = 10000

export default function ProfilePage() {
    const [currentVerseIndex, setCurrentVerseIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            // On masque le verset, on le change, puis on le réaffiche
            // pour obtenir un fondu propre plutôt qu'un changement brutal
            setIsVisible(false)
            setTimeout(() => {
                setCurrentVerseIndex((prev) =>
                    prev === bibleVerses.length - 1 ? 0 : prev + 1
                )
                setIsVisible(true)
            }, 300)
        }, VERSE_DURATION_MS)

        return () => clearInterval(interval)
    }, [])

    const verse = bibleVerses[currentVerseIndex]

    return (
        <div className="mt-2 pb-12">
            {/* Banner */}
            <div className="lg:rounded-t-md shadow-xs h-40 sm:h-48 bg-[url('/assets/images/0af7741991985e2b530c8f62135c3eea.jpg')] bg-cover bg-center bg-no-repeat flex items-end relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div
                    className={cn(
                        "relative bg-black/40 backdrop-blur-sm text-white p-4 max-w-md ml-auto mr-4 mb-4 rounded-lg transition-opacity duration-300",
                        isVisible ? "opacity-100" : "opacity-0"
                    )}
                >
                    <p className="text-sm italic leading-relaxed">
                        « {verse.content} »
                    </p>
                    <p className="text-right text-xs mt-2 font-semibold text-white/80">
                        {verse.reference}
                    </p>
                </div>
            </div>

            {/* Carte d'identité — chevauche la bannière et reste visible quel que soit l'onglet actif */}
            <div className="px-4 sm:px-8">
                <ProfileIdentityCard className="-mt-12 sm:-mt-14 relative z-10" />
            </div>

            <ProfileHero />
        </div>
    )
}