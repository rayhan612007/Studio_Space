"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-card text-muted-foreground">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-8">

                {/* Top Section: Grid layout */}
                <div className="grid grid-cols-2 gap-x-5 gap-y-9 border-b border-border pb-9 sm:gap-x-8 sm:gap-y-10 sm:pb-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">

                    {/* Brand & Mission Statement (Takes 2 cols on lg) */}
                    <div className="col-span-2 space-y-4 lg:col-span-2">
                        <Link
                            href="/"
                            className="group flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl  transition-all">
                                <Image
                                    src='/logo.png'
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

                        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                            StudioSpace is your ultimate platform to discover, book, and manage professional creative spaces. Empowering creators, photographers, and artists worldwide.
                        </p>

                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 lg:col-span-2">
                        {/* Quick Navigation Links */}
                        <div className="min-w-0 space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                                Quick Links
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link href="/" className="transition-colors hover:text-primary">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/studios" className="transition-colors hover:text-primary">
                                        Explore Studios
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#how-it-works" className="transition-colors hover:text-primary">
                                        How It Works
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#about" className="transition-colors hover:text-primary">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Popular Studio Categories */}
                        <div className="min-w-0 space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                                Categories
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link href="/studios?category=photo" className="transition-colors hover:text-primary">
                                        Photography Studios
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/studios?category=podcast" className="transition-colors hover:text-primary">
                                        Podcast & Audio
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/studios?category=music" className="transition-colors hover:text-primary">
                                        Music Suites
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/studios?category=art" className="transition-colors hover:text-primary">
                                        Art & Craft Workshops
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Legal / Social Links */}
                    <div className="col-span-2 space-y-4 md:col-span-4 lg:col-span-1">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                            Connect With Us
                        </h3>

                        {/* Social Icons (Featuring new X logo) */}
                        <div className="flex items-center gap-3 pt-1">
                            {/* X logo */}
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X"
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.373 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.581 9 4.75V8z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Copyright & Terms Notice */}
                <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:pt-8 sm:text-left">
                    <p>© {new Date().getFullYear()} StudioSpace Inc. All rights reserved.</p>

                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
                        <Link href="/privacy" className="transition-colors hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-foreground">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="transition-colors hover:text-foreground">
                            Cookie Policy
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}