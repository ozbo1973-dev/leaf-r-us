import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    image: "/images/product_example1.jpg",
    name: "Premium OG Kush Flower",
    description:
      "Top-shelf, lab-tested OG Kush flower. Available in bulk for licensed retailers in Ohio.",
    state: "Ohio",
  },
  {
    image: "/images/product_example2.jpg",
    name: "Vermont Maple Edibles",
    description:
      "Handcrafted cannabis-infused maple edibles. Popular with Vermont buyers.",
    state: "Vermont",
  },
  {
    image: "/images/product_example3.jpg",
    name: "Florida Citrus Vape Cartridge",
    description:
      "High-potency vape cartridges with natural citrus terpenes. Licensed for Florida distribution.",
    state: "Florida",
  },
  {
    image: "/images/product_example4.jpg",
    name: "Multi-State Concentrate Pack",
    description:
      "Assorted concentrates available for compliant sale in all supported states.",
    state: "Multi-State",
  },
];

function ProductCarousel() {
  return (
    <Carousel className="w-full max-w-xs md:max-w-sm lg:max-w-md">
      <CarouselContent>
        {products.map((product, idx) => (
          <CarouselItem className="pl-2 md:pl-4" key={idx}>
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-card flex flex-col items-center justify-center shadow p-2">
              <div className="relative w-full h-40 sm:h-48 md:h-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4 w-full text-center">
                <h3 className="font-semibold text-lg text-primary truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 mb-1 line-clamp-2">
                  {product.description}
                </p>
                <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1">
                  {product.state}
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-6" />
      <CarouselNext className="-right-6" />
    </Carousel>
  );
}

export default ProductCarousel;
