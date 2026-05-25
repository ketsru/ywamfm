import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Providers } from "./providers";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "YWAM FM TOGO",
    template: "%s | YWAM FM TOGO"
  },
  description: "Plateforme de formation de Jeunesse en Mission Mission Frontière Togo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${montserrat.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}