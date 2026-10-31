"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Aperture } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md group-hover:bg-amber-600 transition-all">
            <Aperture className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-black">Studio</span>
            <span className="text-amber-500">Space</span>
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className={`relative text-sm font-medium transition-colors py-2 ${isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
                  }`}
              >
                {link.name}
                {/* Active Underline Indicator matching image */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full px-6 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-black"

          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            className="rounded-full px-6 bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20"

          >
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger (Sheet) */}
        <div className="flex md:hidden items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger >
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between">
              {/* Accessibility Title for Radix/Shadcn Sheet */}
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <div>
                {/* Mobile Header Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                    <Aperture className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold">
                    <span className="text-black">Studio</span>
                    <span className="text-amber-500">Space</span>
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isActive = activeHref === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => {
                          setActiveHref(link.href);
                          setIsOpen(false);
                        }}
                        className={`text-base font-medium px-4 py-2.5 rounded-lg transition-colors ${isActive
                          ? "bg-amber-50 text-amber-600 font-semibold"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                          }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-gray-300 text-gray-700"

                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="w-full rounded-full bg-amber-500 hover:bg-amber-600 text-white"

                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}