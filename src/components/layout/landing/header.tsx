"use client";
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from 'next/link';

export default function LandingPageHeader () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="
                sticky top-4 md:top-6
                mx-auto
                w-[calc(100%-2rem)]
                md:w-[calc(100%-4rem)]
                lg:w-[calc(100%-6rem)]
                z-50
                bg-white
                rounded-full
                shadow-lg
            ">
                <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Image 
                            src="/assets/logo/ywam.png"
                            alt="Logo JEM Mission Pionnière"
                            width={32}
                            height={32}
                        />
                        <span className="text-xl md:text-2xl font-bold text-gray-800">FM</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/about" className="text-gray-700 hover:text-teal-600 hover:bg-gray-100 text-sm py-1.5 px-2.5 rounded-md transition-colors">A propos</Link>
                        <Link href="/projects" className="text-gray-700 hover:text-teal-600 hover:bg-gray-100 text-sm py-1.5 px-2.5 rounded-md transition-colors">Nos projets</Link>
                        
                        {/* Equipment Dropdown */}
                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost"
                                        className="flex items-center gap-1 text-gray-700 hover:text-teal-600"
                                    >
                                        <span>Equipment</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="#">Audio Equipment</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href="#">Recording Gear</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href="#">Streaming Setup</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Resources Dropdown */}
                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button  variant="ghost"
                                        className="flex items-center gap-1 text-gray-700 hover:text-green-600"
                                    >
                                        <span>Ressources</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="#">Nos formations</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href="#">Documentation</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href="#">Support</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <Link href="/blog" className="text-gray-700 hover:text-teal-600 hover:bg-gray-100 text-sm py-1.5 px-2.5 rounded-md transition-colors">Nos nouvelles</Link>
                    </div>

                    {/* Right Side Navigation */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Get Involved Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-1 text-gray-700 hover:text-green-600"
                            >
                                <span>Get Involved</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                            align="end"
                            className="w-48"
                            >
                            <DropdownMenuItem asChild>
                                <a href="#">Volunteer</a>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <a href="/become-our-partner">Devenir partenaire</a>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <a href="/become-staff">Rejoindre le personel</a>
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition-colors">
                            Give
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button variant="outline"
                        className="lg:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-200">
                        <div className="px-4 py-4 space-y-4">
                            <Link href="#" className="block text-gray-700 font-medium">
                                A propos
                            </Link>

                            <Link href="#" className="block text-gray-700 font-medium">
                                Nos projets
                            </Link>

                            <Accordion type="single" collapsible>
                                <AccordionItem value="equipment">
                                    <AccordionTrigger>Equipment</AccordionTrigger>
                                    <AccordionContent className="space-y-2 pl-4">
                                        <Link href="#" className="block text-gray-600">Audio Equipment</Link>
                                        <Link href="#" className="block text-gray-600">Recording Gear</Link>
                                        <Link href="#" className="block text-gray-600">Streaming Setup</Link>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Resources */}
                                <AccordionItem value="resources">
                                    <AccordionTrigger>Resources</AccordionTrigger>
                                    <AccordionContent className="space-y-2 pl-4">
                                        <Link href="#" className="block text-gray-600">Training Materials</Link>
                                        <Link href="#" className="block text-gray-600">Documentation</Link>
                                        <Link href="#" className="block text-gray-600">Support</Link>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Get Involved */}
                                <AccordionItem value="get-involved">
                                    <AccordionTrigger>Get Involved</AccordionTrigger>
                                    <AccordionContent className="space-y-2 pl-4">
                                        <Link href="#" className="block text-gray-600">Volunteer</Link>
                                        <Link href="#" className="block text-gray-600">Partner With Us</Link>
                                        <Link href="#" className="block text-gray-600">Join Team</Link>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <Link href="#" className="block text-gray-700 font-medium">
                                Podcast & Stories
                            </Link>

                            <Button className="w-full bg-teal-700 text-white rounded-full mt-4">
                                Give
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}