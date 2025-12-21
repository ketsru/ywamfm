"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { bibleVerses } from "@/components/data/user/bibleVerses"

export default function StudentDashboard() {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) =>
        prev === bibleVerses.length - 1 ? 0 : prev + 1
      )
    }, 10000) // change toutes les 5 secondes

    return () => clearInterval(interval)
  }, [])

  const verse = bibleVerses[currentVerseIndex]

  return (
    <div className="relative mt-2">
      {/* Banner */}
      <div className="lg:rounded-t-md shadow-xs h-56 bg-[url('/assets/images/0af7741991985e2b530c8f62135c3eea.jpg')] bg-cover bg-center bg-no-repeat flex items-end">
        <div className="bg-black/50 text-white p-4 max-w-lg ml-auto mr-4 rounded-md transition-all duration-500">
          <p className="text-sm italic">“{verse.content}”</p>
          <p className="text-right text-xs mt-2 font-semibold">
            {verse.reference}
          </p>
        </div>
      </div>

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
    </div>
  )
}
