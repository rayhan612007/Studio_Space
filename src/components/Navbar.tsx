
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Menu, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import Avatarmenu from "./Avatarmenu";
import ThemeToggle from "./Themechnager";
import { authClient } from "@/app/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHref === href;
    }
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavigation = (href: string) => {
    setActiveHref(href);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setActiveHref("")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl  transition-all">
            <Image
              src="/logo.png"
              alt=""
              height={40}
              width={40}
              className="h-10 w-10 object-contain"
            />
          </div>

          <span className="text-xl font-bold tracking-tight">
            <span className="text-foreground">
              Studio
            </span>
            <span className="text-primary">
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
                  ? "font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {user ? (
            <Avatarmenu
              user={{
                email: user.email,
                name: user.name,
                image: user.image ?? "",
              }}
            />
          ) : (
            <>
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                variant="outline"
                className="px-5"
              >
                Login
              </Button>

              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                className="px-5"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          {user ? (
            <Avatarmenu
              user={{
                email: user.email,
                name: user.name,
                image: user.image ?? "",
              }}
            />
          ) : null}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* Sheet Trigger */}
            <SheetTrigger
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition hover:bg-muted"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            {/* Mobile Sidebar */}
            <SheetContent
              side="left"
              className="flex max-h-[100dvh] min-h-0 w-[300px] flex-col justify-start gap-6 overflow-y-auto overscroll-contain p-6 sm:w-[350px]"
            >
              <SheetTitle className="sr-only">
                Navigation Menu
              </SheetTitle>

              <div>
                <Link
                  href="/"
                  onClick={() => handleNavigation("/")}
                  className="mb-6 flex items-center gap-3"
                >
                  <Image
                    src="/logo.png"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <span className="text-xl font-bold tracking-tight">
                    Studio<span className="text-primary">Space</span>
                  </span>
                </Link>

                {/* Mobile User */}
                {session ? (
                  <div className="mb-6 flex items-center gap-3 rounded-xl bg-muted p-3">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      {session.user.image && (
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name}
                          
                        />
                      )}
                      <AvatarFallback className="text-sm font-semibold text-primary">
                        {session.user.name.trim().charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {session.user.name}
                      </span>

                      <span className="truncate text-xs text-muted-foreground">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = isActiveLink(link.href);

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => handleNavigation(link.href)}
                        className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                {user ? (
                  <nav
                    aria-label="Account navigation"
                    className="mt-4 flex flex-col gap-2 border-t border-border pt-4"
                  >
                    {[
                      { name: "Dashboard", href: "/dashboard" },
                      { name: "Add New Studio", href: "/add-studio" },
                      { name: "My Studio Listings", href: "/my-listings" },
                      { name: "My Bookings", href: "/my-bookings" },
                    ].map((link) => {
                      const isActive =
                        pathname === link.href ||
                        pathname.startsWith(`${link.href}/`);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => setIsOpen(false)}
                          className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                            isActive
                              ? "bg-primary/10 font-semibold text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </nav>
                ) : null}
              </div>

              {/* Mobile Footer Actions */}
              <div className="flex flex-col gap-3 border-t border-border pt-6">

                {user ? (
                  <>
                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-2 rounded-xl"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      render={<Link href="/login" />}
                      nativeButton={false}
                      onClick={() => setIsOpen(false)}
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>

                    <Button
                      render={<Link href="/register" />}
                      nativeButton={false}
                      onClick={() => setIsOpen(false)}
                      className="w-full"
                    >
                      Register
                    </Button>
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
