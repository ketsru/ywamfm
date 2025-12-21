"use client"

import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut } from "lucide-react"

export default function StudentHeader() {
  const handleLogout = () => {
    // TODO: logique de déconnexion
    // ex:
    // localStorage.removeItem("token")
    // router.push("/login")
    console.log("Déconnexion")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Profil */}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/std/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Déconnexion */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
