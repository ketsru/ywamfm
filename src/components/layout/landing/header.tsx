"use client";
import { useState } from 'react';
import { ChevronDown, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from 'next/link';
import { UserService } from "@/lib/types/users/user/user.service";
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { authService } from '@/lib/types/access/auth/auth.service';
import { ENV } from '@/lib/config/env';

// ── Sous-composant : navigation auth (desktop) ──────────────────

function AuthNav() {
    const { user, loading, refresh } = useCurrentUser();

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch {
            // Même si l'appel serveur échoue, on déconnecte localement :
            // l'utilisateur ne doit jamais rester "coincé" connecté côté UI.
        } finally {
            ENV.TOKEN_CLEARER();
            await refresh();
        }
    };

  if (loading) {
    return <Skeleton className="h-9 w-32 rounded-full" />;
  }

  if (!user) {
    return (
      <Button asChild variant="accent" className="rounded-full px-6">
        <Link href="/login">Se connecter</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 rounded-full pl-2 pr-3">
          <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#1E2A5A] text-white">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.firstName} width={28} height={28} className="object-cover" />
            ) : (
              <UserIcon className="h-4 w-4" />
            )}
          </div>
          <span className="max-w-[100px] truncate text-sm font-medium">{user.firstName}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Mon espace</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── Sous-composant : navigation auth (mobile) ───────────────────

function AuthNavMobile({ onNavigate }: { onNavigate: () => void }) {
    const { user, loading, refresh } = useCurrentUser();

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch {
            // Même si l'appel serveur échoue, on déconnecte localement :
            // l'utilisateur ne doit jamais rester "coincé" connecté côté UI.
        } finally {
            ENV.TOKEN_CLEARER();
            await refresh();
        }
    };

    if (loading) {
        return <Skeleton className="h-10 w-full rounded-full" />;
    }

    if (!user) {
        return (
            <Button asChild variant="accent" className="w-full rounded-full">
                <Link href="/login" onClick={onNavigate}>Se connecter</Link>
            </Button>
        );
    }

    return (
        <div className="space-y-2">
            <Link
                href="/dashboard"
                onClick={onNavigate}
                className="flex items-center gap-2 text-foreground font-medium"
            >
                <UserIcon className="h-4 w-4" />
                Mon espace ({user.firstName})
            </Link>
            <Button variant="outline" className="w-full rounded-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
            </Button>
        </div>
    );
}

// ── Composant principal ──────────────────────────────────────

export default function LandingPageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="
      sticky top-4 md:top-6
      mx-auto
      w-[calc(100%-2rem)]
      md:w-[calc(100%-4rem)]
      lg:w-[calc(100%-6rem)]
      z-50
      bg-background
      rounded-full
      shadow-none
    ">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/logo/ywam.png"
            alt="Logo JEM Mission Pionnière"
            width={32}
            height={32}
          />
          <span className="font-accent text-xl md:text-2xl text-primary font-extrabold">YWAM</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/about" className="text-foreground hover:text-primary hover:bg-accent text-sm py-1.5 px-2.5 rounded-md transition-colors">A propos</Link>
          <Link href="/projects" className="text-foreground hover:text-primary hover:bg-accent text-sm py-1.5 px-2.5 rounded-md transition-colors">Nos réalisations</Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-foreground hover:text-primary">
                <span>Ressources</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-fit space-y-2">
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href="/formations">Nos formations</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href="/evangelisation">Nos phases pratiques</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/blogs" className="text-foreground hover:text-primary hover:bg-accent text-sm py-1.5 px-2.5 rounded-md transition-colors">Blogs</Link>
        </div>

        {/* Right Side Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-foreground hover:text-primary">
                <span>Etre impliqué</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/become-our-partner">Devenir partenaire</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/become-staff">Rejoindre le personnel</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact-us">Nous contacter</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AuthNav />
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <Link href="/about" onClick={closeMenu} className="block text-foreground font-medium">
              A propos
            </Link>
            <Link href="/projects" onClick={closeMenu} className="block text-foreground font-medium">
              Nos projets
            </Link>

            <Accordion type="single" collapsible>
              <AccordionItem value="ressources">
                <AccordionTrigger>Ressources</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-4">
                  <Link href="/formations" onClick={closeMenu} className="block text-muted-foreground">Nos formations</Link>
                  <Link href="/evangelisation" onClick={closeMenu} className="block text-muted-foreground">Nos phases pratiques</Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="get-involved">
                <AccordionTrigger>Etre impliqué</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-4">
                  <Link href="/become-our-partner" onClick={closeMenu} className="block text-muted-foreground">Devenir partenaire</Link>
                  <Link href="/become-staff" onClick={closeMenu} className="block text-muted-foreground">Rejoindre le personnel</Link>
                  <Link href="/contact-us" onClick={closeMenu} className="block text-muted-foreground">Nous contacter</Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link href="/blogs" onClick={closeMenu} className="block text-foreground font-medium">
              Blogs
            </Link>

            <div className="pt-2">
              <AuthNavMobile onNavigate={closeMenu} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}