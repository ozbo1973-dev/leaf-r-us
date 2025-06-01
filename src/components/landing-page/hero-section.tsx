import Image from "next/image";
import ProductCarousel from "@/components/landing-page/product-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center min-h-[60vh] bg-background overflow-hidden">
      <Image
        src="/images/bg_hero.png"
        alt="Cannabis leaves background"
        fill
        priority
        className="object-cover object-center z-0 opacity-90"
        style={{ filter: "blur(0.5px)" }}
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 py-20 px-4">
        {/* Left: Project Name and Description */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <h1 className="text-primary text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-md">
            Leaf-R-Us Cannabis Marketplace
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl drop-shadow">
            A business-to-business web application that enables licensed
            cannabis sellers from multiple states (initially Ohio, Florida, and
            Vermont) to sell their products to other licensed businesses. The
            platform provides dual functionality for users to operate as either
            buyers or sellers, with robust user management and invitation
            capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-2">
            <Button className="w-full sm:w-auto" size="lg" asChild>
              <Link href="#signup">Sign Up as Retailer</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              size="lg"
              asChild
            >
              <Link href="#learn-more">Request Consulation</Link>
            </Button>
          </div>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          <ProductCarousel />
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90 z-5"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroSection;
