import { Menu, Cannabis } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/nav/mobile-nav";

export function Navbar() {
  return (
    <>
      {/* Desktop/Large Navbar */}
      <nav className="w-full bg-background border-b border-border shadow-sm sticky top-0 z-50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Left: Logo and Project Name */}
          <div className="flex items-center gap-2 min-w-0">
            <Cannabis
              className="text-primary size-6 shrink-0"
              aria-hidden="true"
            />
            <Link
              href="/"
              className="font-bold text-lg sm:text-xl text-primary tracking-tight hover:opacity-80 transition-opacity truncate"
            >
              Leaf-R-Us
            </Link>
          </div>
          {/* Middle: Navigation Links (hidden on md and below) */}
          <div className="flex items-center gap-6">
            <Link
              href="#about"
              className="text-foreground hover:text-primary transition-colors font-medium text-base"
            >
              About Us
            </Link>
            <Link
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors font-medium text-base"
            >
              How it works
            </Link>
            <Link
              href="#contact"
              className="text-foreground hover:text-primary transition-colors font-medium text-base"
            >
              Contact Us
            </Link>
          </div>
          {/* Right: Auth Buttons and Mode Toggle (hidden on sm) */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="px-4" asChild>
              <Link href="/admin/login">Log In</Link>
            </Button>
            <Button className="px-4" asChild>
              <Link href="/admin/login">Sign Up as Retailer</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </nav>
      {/* Mobile/Tablet Navbar */}
      <MobileNav />
    </>
  );
}
