import { getProductBySlug } from "@/actions/product";
import { UserNavbar } from "@/app/user-navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft, Badge, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { AddToCart } from "./add-to-cart";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params)?.slug;
  const product = await getProductBySlug(slug);
  console.log(product);

  if (!product) {
    return null;
  }

  return (
    <>
      <UserNavbar className="sticky top-0 z-50" />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href={"/#products"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          {product.image && (
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <Badge className="mr-2">{product.category.name}</Badge>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                {/* <span className="ml-1 text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span> */}
              </div>
            </div>
            <p className="text-2xl font-bold mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <AddToCart phone={product} />

            <Separator className="my-6" />

            {/* Specifications */}
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* <div>
                <p className="font-medium">Display</p>
                <p className="text-sm text-gray-600">{product.display}</p>
              </div> */}
              <div>
                <p className="font-medium">Storage</p>
                <p className="text-sm text-gray-600">{product.storage}</p>
              </div>
              {/* <div>
                <p className="font-medium">Chip</p>
                <p className="text-sm text-gray-600">{product.chip}</p>
              </div> */}
              {/* <div>
                <p className="font-medium">Back Camera</p>
                <p className="text-sm text-gray-600">{product.backCamera}</p>
              </div> */}
              {/* <div>
                <p className="font-medium">Front Camera</p>
                <p className="text-sm text-gray-600">{product.frontCamera}</p>
              </div> */}
              {/* <div>
                <p className="font-medium">Battery</p>
                <p className="text-sm text-gray-600">{product.battery}</p>
              </div> */}
            </div>

            <Separator className="my-6" />

            {/* Repair Services */}
            {/* <h2 className="text-xl font-semibold mb-4">Repair Services</h2>
          <Accordion type="single" collapsible className="w-full">
            {product.repairServices.map((service: any, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full">
                    <span>{service.name}</span>
                    <span>${service.price}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start">
                    <PenTool className="w-4 h-4 mr-2 mt-1" />
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <PenTool className="w-4 h-4 mr-2 mt-1" />
                    <p className="text-sm text-gray-600 font-bold">
                      {service.estimatedTime}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion> */}
          </div>
        </div>
      </div>
    </>
  );
}
