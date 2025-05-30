import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Cannabis } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import * as React from "react";

export function MobileNav() {
  return (
    <nav className="w-full bg-background border-b border-border shadow-sm sticky top-0 z-50 flex lg:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 w-full">
        {/* Left: Mobile Nav Trigger */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-6 text-primary" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
              <SheetHeader className="px-6 pt-6 pb-2">
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <Cannabis className="text-primary size-6 shrink-0" />
                    <span className="font-bold text-lg text-primary tracking-tight">
                      Leaf-R-Us
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-6 pb-6">
                <Link
                  href="#about"
                  className="text-foreground hover:text-primary transition-colors font-medium text-base py-2"
                >
                  About Us
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-foreground hover:text-primary transition-colors font-medium text-base py-2"
                >
                  How it works
                </Link>
                <Link
                  href="#contact"
                  className="text-foreground hover:text-primary transition-colors font-medium text-base py-2"
                >
                  Contact Us
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="ghost" asChild>
                    <Link href="#login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="#signup">Sign Up as Retailer</Link>
                  </Button>
                  <div className="mt-2">
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Center: Logo and Project Name */}
        <div className="flex-1 flex justify-center items-center min-w-0">
          <Link
            href="/"
            className="font-bold text-lg sm:text-xl text-primary tracking-tight hover:opacity-80 transition-opacity truncate flex items-center gap-2"
          >
            <Cannabis className="text-primary size-6 shrink-0" />
            <span className="truncate">Leaf-R-Us</span>
          </Link>
        </div>
        {/* Right: Empty for spacing */}
        <div className="w-8" />
      </div>
    </nav>
  );
}
