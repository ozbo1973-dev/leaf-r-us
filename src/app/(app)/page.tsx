import HeroSection from "@/components/landing-page/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-0">
      {/* Hero Section */}
      <HeroSection />
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
