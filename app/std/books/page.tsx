"use client"

import { livresData } from "@/components/data/admin/livre"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Book } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function StudentBooks() {
  return (
    <section className="space-y-6 mt-2 mb-10">
      {/* Banner */}
      <div className="rounded-t-md shadow-xs h-56 bg-[url('/assets/images/0af7741991985e2b530c8f62135c3eea.jpg')] bg-cover bg-center bg-no-repeat" />

      {/* Header */}
      <div className="lg:flex justify-between items-center">
        <h2 className="md:text-3xl text-xl font-extrabold flex gap-2 items-center">
          <Book size={22} />
          Les Livres
        </h2>
      </div>

      {/* Livres */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {livresData.map((livre) => (
          <div
            key={livre.id}
            className="bg-neutral-primary-soft p-6 border border-default rounded-md shadow-xs hover:shadow-xl transition"
          >
            {/* Image */}
            <Image
              src={livre.image}
              alt={livre.titre}
              width={400}
              height={400}
              className="rounded-md w-full h-64 object-cover"
            />

            {/* Infos */}
            <h5 className="mt-6 mb-2 text-xl font-semibold">
              {livre.titre}
            </h5>

            <p className="mb-6 text-sm text-muted-foreground line-clamp-3">
              {livre.resume}
            </p>

            <div className="flex justify-between items-center">
              {/* Dialog lecture */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="group inline-flex items-center gap-2
                               rounded-full px-3 py-2
                               transition-all duration-200"
                  >
                    <ArrowUpRight size={18} />
                    <span
                      className="max-w-0 overflow-hidden whitespace-nowrap
                                 group-hover:max-w-[100px]
                                 transition-all duration-200"
                    >
                      Lire le livre
                    </span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-7xl h-[80vh]">
                  <DialogHeader className="border-b-1">
                    <DialogTitle>{livre.titre}</DialogTitle>
                  </DialogHeader>

                  {/* Viewer du document */}
                  <div className="h-full w-full border rounded-md overflow-hidden">
                    <iframe
                      src={`/assets/books/docs/${livre.content}`}
                      className="w-full h-full"
                    />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Fermer</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Auteur */}
              <div className="flex gap-2 items-center text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {livre.auteur[0]}
                  </AvatarFallback>
                </Avatar>
                <span>{livre.auteur}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
