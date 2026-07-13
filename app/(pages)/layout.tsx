"use client";

import { ReactNode } from "react";
import LandingPageHeader from "@/components/layout/landing/header";
import Footer from "@/components/layout/landing/footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="relative z-30">
        <LandingPageHeader />
      </header>

      <main className="antialiased w-full">{children}</main>

      <Footer />
    </>
  );
}