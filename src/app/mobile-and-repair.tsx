"use client";

import React, { useState } from "react";
import {
  Phone,
  Search,
  ChevronDown,
  PenToolIcon as Tool,
  Plus,
  Smartphone,
  Layers,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";

// Mock data for mobile phones
const phones = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    brand: "Apple",
    price: 999,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    price: 799,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Google Pixel 6",
    brand: "Google",
    price: 699,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "OnePlus 9 Pro",
    brand: "OnePlus",
    price: 969,
    image: "/placeholder.svg?height=300&width=300",
  },
];

// Mock data for repair services
const repairServices = [
  {
    id: 101,
    name: "Screen Replacement",
    price: 129,
    image: "/screen-replacement-icon.svg",
  },
  {
    id: 102,
    name: "Battery Replacement",
    price: 79,
    image: "/battery-replacement-icon.svg",
  },
  {
    id: 103,
    name: "Camera Repair",
    price: 99,
    image: "/camera-repair-icon.svg",
  },
  {
    id: 104,
    name: "Water Damage Repair",
    price: 199,
    image: "/water-damage-repair-icon.svg",
  },
];

// Mock data for back glass
const backGlassServices = [
  {
    id: 201,
    name: "iPhone 12 Back Glass",
    price: 89,
    image: "/back-glass-icon.svg",
  },
  {
    id: 202,
    name: "Samsung S21 Back Glass",
    price: 79,
    image: "/back-glass-icon.svg",
  },
  {
    id: 203,
    name: "Google Pixel 5 Back Glass",
    price: 69,
    image: "/back-glass-icon.svg",
  },
];

// Mock data for mobile screens
const mobileScreens = [
  {
    id: 301,
    name: "iPhone 13 Pro OLED Screen",
    price: 299,
    image: "/screen-icon.svg",
  },
  {
    id: 302,
    name: "Samsung Galaxy S21 AMOLED Screen",
    price: 249,
    image: "/screen-icon.svg",
  },
  {
    id: 303,
    name: "Google Pixel 6 OLED Screen",
    price: 219,
    image: "/screen-icon.svg",
  },
];

export default function MobilePhonesAndServicesPage({
  products,
  repairingProducts,
  glass,
  screens,
}: any) {
  const [phoneSearchTerm, setPhoneSearchTerm] = useState("");
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [backGlassSearchTerm, setBackGlassSearchTerm] = useState("");
  const [screenSearchTerm, setScreenSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const { addItem } = useCartStore();

  const filteredPhones = phones.filter(
    (phone) =>
      phone.name.toLowerCase().includes(phoneSearchTerm.toLowerCase()) &&
      (selectedBrands.length === 0 || selectedBrands.includes(phone.brand))
  );

  const filteredServices = repairServices.filter((service: any) =>
    service.name.toLowerCase().includes(serviceSearchTerm.toLowerCase())
  );

  const filteredBackGlass = backGlassServices.filter((service: any) =>
    service.name.toLowerCase().includes(backGlassSearchTerm.toLowerCase())
  );

  const filteredScreens = mobileScreens.filter((screen: any) =>
    screen.name.toLowerCase().includes(screenSearchTerm.toLowerCase())
  );

  const brands = Array.from(new Set(phones?.map((p) => p.brand)));

  const handleAddToCart = (
    item:
      | (typeof phones)[0]
      | (typeof repairServices)[0]
      | (typeof backGlassServices)[0]
      | (typeof mobileScreens)[0],
    type: "mobile" | "repair" | "backglass" | "screen"
  ) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      type: type,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Mobile Phones & Services
      </h1>

      <Tabs defaultValue="phones" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-primary-300">
          <TabsTrigger value="phones">Mobile Phones</TabsTrigger>
          <TabsTrigger value="services">Repair Services</TabsTrigger>
          <TabsTrigger value="backglass">Back Glass</TabsTrigger>
          <TabsTrigger value="screens">Mobile Screens</TabsTrigger>
        </TabsList>

        <TabsContent value="phones">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search phones..."
              value={phoneSearchTerm}
              onChange={(e) => setPhoneSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((phone: any) => (
              <Card
                key={phone.id}
                className="flex flex-col shadow-lg transition-transform transform hover:scale-105"
              >
                <CardHeader>
                  <Image
                    src={phone.image}
                    alt={phone.name}
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-contain rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="mb-2">{phone.name}</CardTitle>
                  <p className="text-sm text-gray-500 mb-2">{phone.brand}</p>
                  <Badge variant="default" className="mb-2">
                    <Smartphone className="mr-1 h-3 w-3" />
                    Mobile Phone
                  </Badge>
                  <p className="text-lg font-bold">${phone.price}</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4">
                  <Button variant={"secondary"} asChild>
                    <Link href={`/product/${phone.slug}`}>View Detail</Link>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleAddToCart(phone, "mobile")}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <Phone className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No phones found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you&apos;re
                looking for.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="services">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search repair services..."
              value={serviceSearchTerm}
              onChange={(e) => setServiceSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {repairingProducts?.map((service: any) => (
              <Card
                key={service.id}
                className="flex flex-col shadow-lg transition-transform transform hover:scale-105"
              >
                <CardHeader>
                  <Image
                    src={"/repair-service.png"}
                    alt={service.name}
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-contain rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="mb-2">{service.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    <Tool className="mr-1 h-3 w-3" />
                    Repair Service
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full" asChild>
                    <Link href={`/product/${service.slug}/repairing`}>
                      View Services
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Tool className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No repair services found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="backglass">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search back glass services..."
              value={backGlassSearchTerm}
              onChange={(e) => setBackGlassSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {glass?.map((gl: any) => (
              <Card
                key={gl.id}
                className="flex flex-col shadow-lg transition-transform transform hover:scale-105"
              >
                <CardHeader>
                  <Image
                    src={"/repair-service.png"}
                    alt={gl.name}
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-contain rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="mb-2">{gl.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    <Layers className="mr-1 h-3 w-3" />
                    Back Glass
                  </Badge>
                  <p className="text-lg font-bold">${gl.price}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleAddToCart(gl, "backglass")}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {glass.length === 0 && (
            <div className="text-center py-12">
              <Layers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No back glass services found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="screens">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search mobile screens..."
              value={screenSearchTerm}
              onChange={(e) => setScreenSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {screens?.map((screen: any) => (
              <Card
                key={screen.id}
                className="flex flex-col shadow-lg transition-transform transform hover:scale-105"
              >
                <CardHeader>
                  <Image
                    src={"/repair-service.png"}
                    alt={screen.name}
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-contain rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="mb-2">{screen.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    <Monitor className="mr-1 h-3 w-3" />
                    Mobile Screen
                  </Badge>
                  <p className="text-lg font-bold">${screen.price}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleAddToCart(screen, "screen")}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {screens.length === 0 && (
            <div className="text-center py-12">
              <Monitor className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No mobile screens found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
