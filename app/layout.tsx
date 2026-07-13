import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Inter, Dancing_Script } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";

// Titres H1–H6 (charte YWAM Frontier Missions Togo)
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

// Texte courant, UI, formulaires
const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Accent de marque — usage rare (citations, hero), classe utilitaire `.font-accent`
const dancingScript = Dancing_Script({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YWAM FM TOGO",
    template: "%s | YWAM FM TOGO",
  },
  description:
    "Plateforme de formation de Jeunesse en Mission Frontière Togo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${poppins.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}