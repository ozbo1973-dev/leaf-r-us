import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-0">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[60vh] bg-background">
        <Image
          src="/images/bg_hero.png"
          alt="Cannabis leaves background"
          fill
          priority
          className="object-cover object-center z-0 opacity-90"
          style={{ filter: "blur(0.5px)" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl text-center gap-8 py-20 px-4">
          <h1 className="text-primary text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-md">
            Leaf-R-Us Cannabis Marketplace
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto drop-shadow">
            A compliant B2B platform empowering licensed cannabis businesses in
            Ohio, Florida, and Vermont to buy and sell products securely and
            efficiently.
          </p>
          <ul className="grid gap-3 text-left text-base sm:text-lg mx-auto w-full max-w-md">
            <li className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-primary" />
              Multi-state, compliant B2B cannabis transactions
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-primary" />
              Dual buyer & seller interfaces for licensed businesses
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-primary" />
              Secure user management & invitation system
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-primary" />
              Built for compliance and future state expansion
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button className="w-full sm:w-auto" size="lg">
              Request Early Access
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              size="lg"
              asChild
            >
              <a href="#learn-more">Learn More</a>
            </Button>
          </div>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90 z-5"
          aria-hidden="true"
        />
      </section>
      {/* User Management Section */}
      <section className="w-full max-w-2xl mx-auto mt-12 bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-2 text-center">
          User Management Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-lg mb-1 text-foreground">
              User Registration
            </h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Business registration with company details</li>
              <li>License verification system</li>
              <li>State-specific registration requirements</li>
              <li>Email verification process</li>
              <li>Admin approval workflow for new businesses</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 text-foreground">
              User Authentication
            </h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Secure login/logout functionality</li>
              <li>Password reset capability</li>
              <li>Multi-factor authentication (MFA) support</li>
              <li>Session management with appropriate timeouts</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 text-foreground">
              User Roles & Permissions
            </h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>
                <span className="font-medium text-foreground">
                  Super Admin:
                </span>{" "}
                Platform administration and oversight
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Business Owner:
                </span>{" "}
                Full business access
              </li>
              <li>
                <span className="font-medium text-foreground">Seller:</span>{" "}
                Manage products & orders
              </li>
              <li>
                <span className="font-medium text-foreground">Buyer:</span>{" "}
                Browse & purchase products
              </li>
              <li>
                <span className="font-medium text-foreground">Sub-User:</span>{" "}
                Limited permissions by role
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 text-foreground">
              User Invitation System
            </h3>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Business owners can invite team members</li>
              <li>Role-based invitation system</li>
              <li>Email invitation workflow</li>
              <li>Invitation acceptance & onboarding</li>
              <li>Permission management for invited users</li>
            </ul>
          </div>
        </div>
      </section>
      <footer className="w-full py-8 flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <span>
          &copy; {new Date().getFullYear()} Leaf-R-Us Cannabis Marketplace
        </span>
        <span>
          For licensed businesses only. All transactions subject to state
          regulations.
        </span>
      </footer>
    </div>
  );
}
