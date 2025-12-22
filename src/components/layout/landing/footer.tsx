import { usefullLinkItems } from "@/components/data/navigation/footer-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const contactInfo = [
  {
    href: "#",
    icon: <MapPin className="w-4 h-4" />,
    label: "Nukafu, Lomé - Togo",
  },
  {
    href: "mailto:nature.marche@gmail.com",
    icon: <Mail className="w-4 h-4" />,
    label: "nature.marche@gmail.com",
  },
  {
    href: "tel:+22897126287",
    icon: <Phone className="w-4 h-4" />,
    label: "+228 97 12 62 87",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-teal-900 mt-5 p-4 lg:px-0 lg:py-10 z-50">
      <div className="max-w-11/12 mx-auto rounded-4xl bg-black/20 lg:p-8 md:p-4 p-5">
        {/* Top Section */}
        <div className="lg:flex items-start justify-between gap-6">
          {/* Brand & Contact */}
          <div className="lg:w-3/12 w-full space-y-4 p-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/logo/ywam.png"
                alt="Logo JEM Mission Pionnière"
                width={50}
                height={50}
                className="rounded-full object-cover border"
              />
              <span className="tracking-tighter text-3xl font-extrabold text-white">
                JEM Mission Pionnière
              </span>
            </Link>

            <ul className="text-gray-50 text-sm space-y-2 font-semibold">
              {contactInfo.map(({ href, icon, label }, i) => (
                <li key={i}>
                  <Link href={href} className="flex items-center gap-2">
                    {icon}
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="lg:flex items-start justify-between lg:w-6/12 w-full p-4 gap-6">
            {usefullLinkItems.map(({ title, menuItems }, index) => (
              <div key={index}>
                <h4 className="text-white text-base uppercase font-bold mb-4">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {menuItems.map(({ label, href }, item) => (
                    <li key={item}>
                      <Link
                        href={href}
                        className="text-sm text-gray-50 hover:text-green-500 transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:w-3/12 w-full p-4 text-gray-50">
            <h2 className="text-base font-bold uppercase mb-1">Mise à jour</h2>
            <p className="text-sm">
              Restez informé de nos nouveautés, conseils santé et produits.
            </p>

            <div className="mt-4 space-y-4">
              <Input
                placeholder="Votre email..."
                type="email"
                className="rounded-full"
              />
              <Button className="w-full rounded-full">Soumettre</Button>
            </div>
          </div>
        </div>

        <hr className="w-full my-5 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-200 text-sm gap-4">
          <Link href="#" aria-label="Facebook Nature Marché">
            <Facebook className="hover:text-green-500 transition-colors" />
          </Link>
          <p>© 2025 Nature Marché. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
