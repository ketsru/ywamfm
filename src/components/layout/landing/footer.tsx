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
    label: "Lomé - Togo",
  },
  {
    href: "mailto:jemfmtogo@gmail.com",
    icon: <Mail className="w-4 h-4" />,
    label: "jemfmtogo@gmail.com",
  },
  {
    href: "tel:+22897126287",
    icon: <Phone className="w-4 h-4" />,
    label: "+228 97 12 62 87",
  },
];
export default function Footer() {
  return (
    <footer className="w-full bg-teal-900 p-2 lg:px-0 lg:py-10">
      <div className="max-w-11/12 mx-auto rounded-4xl bg-black/20 lg:p-8 md:p-4 p-2">
        {/* Top Section */}
        <div className="lg:flex items-start justify-between gap-6">
          {/* Brand & Contact */}
          <div className="lg:w-4/12 w-full space-y-4 p-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/logo/ywam.png"
                alt="Logo JEM Mission Pionnière"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <span className="tracking-tighter text-2xl font-extrabold text-white">
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
          <div className="lg:flex items-start justify-between lg:w-8/12 w-full p-4 gap-6">
            {usefullLinkItems.map(({ title, menuItems }, index) => (
              <div key={index}>
                <h4 className="text-white text-base uppercase font-bold lg:mb-4 mb-1 lg:mt-0 mt-5">
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
        </div>

        <hr className="w-full my-5 border-gray-500" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-200 text-sm mb-3 lg:mb-0">
          <Link href="#" aria-label="JEM FM Togo">
            <Facebook className="hover:text-green-500 transition-colors" />
          </Link>
          <p className="lg:mt-0 mt-4">© 2026 jem fm Togo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
