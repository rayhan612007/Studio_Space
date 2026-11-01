
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Menu, Aperture, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import Avatarmenu from "./Avatarmenu";
import ThemeToggle from "./Themechnager";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");


  // Testing session (Replace with Better Auth session later)
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;
  const isActiveLink = (href: string) => {
    if (href) {
      return activeHref === href;
    }

  };

  const handleNavigation = (href: string) => {
    setActiveHref(href);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setActiveHref("")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl  transition-all">
            <Image
              src='/logo.png'
              alt="logo"
              height={50}
              width={50} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            <span className="text-black dark:text-white">
              Studio
            </span>
            <span className="text-purple-600">
              Space
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className={`relative py-2 text-sm font-medium transition-colors ${isActive
                  ? "font-semibold text-black dark:text-white"
                  : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {session ? (
            <Avatarmenu user={user} />
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-full border border-gray-200 px-6 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-full bg-amber-500 px-6 text-sm font-medium text-white shadow-md shadow-amber-500/20 transition hover:bg-amber-600"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* Sheet Trigger */}
            <SheetTrigger
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            {/* Mobile Sidebar */}
            <SheetContent
              side="left"
              className="flex w-[300px] flex-col justify-between p-6 sm:w-[350px]"
            >
              <SheetTitle className="sr-only">
                Navigation Menu
              </SheetTitle>

              <div>
                {/* Mobile User */}
                {session ? (
                  <div className="mb-6 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        width={50}
                        height={50}
                        alt={session.user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"
                      />
                    )}

                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {session.user.name}
                      </span>

                      <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/"
                    onClick={() => handleNavigation("/")}
                    className="mb-8 flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white">
                      <Aperture className="h-5 w-5" />
                    </div>

                    <span className="text-lg font-bold">
                      Studio<span className="text-amber-500">Space</span>
                    </span>
                  </Link>
                )}

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = isActiveLink(link.href);

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => handleNavigation(link.href)}
                        className={`rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${isActive
                          ? "bg-amber-50 font-semibold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                          }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Footer Actions */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 dark:border-gray-800">

                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-11 items-center rounded-xl border border-gray-300 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/studios/add"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-11 items-center rounded-xl border border-gray-300 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      Add New Studio
                    </Link>

                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-2 rounded-xl"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-gray-300 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-amber-500 text-sm font-medium text-white hover:bg-amber-600"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
