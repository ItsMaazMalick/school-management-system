"use server";

import { Service } from "@/app/(frontend)/dashboard/add-repairing/add-repairing-form";
import prisma from "@/lib/db";
import { addRepairingSchema } from "@/lib/schemas/repairing-schema";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addService = async ({
  productName,
  services,
}: {
  productName: string;
  services: {
    brandName: string;
    categoryName: string;
    service: { name: string; type: string };
    price: number;
  }[]; // serviceId and price from the front end
}) => {
  try {
    // Prepare data to insert into the database

    // Insert multiple records into the 'repairServices' table
    await prisma.repairServices.createMany({
      data: services.map((service) => ({
        productName: productName,
        brandName: service.brandName,
        categoryName: service.categoryName,
        name: service.service.name, // Store the serviceId to link the service
        price: service.price, // Store the price
        type:
          service.service.type === "screen"
            ? "screen"
            : service.service.type === "battery"
            ? "battery"
            : service.service.type === "charging"
            ? "charging"
            : "service",
      })),
    });

    return redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return { error: "Internal server error" };
  }
};

// export async function getServicesWithProduct(slug: string) {
//   try {
//     const product = await prisma.repairProduct.findUnique({
//       where: { slug },
//       include: {
//         RepairServices: {
//           where: { type: "basic" },
//         },
//       },
//     });
//     return product;
//   } catch {
//     return null;
//   }
// }

export async function getALLServices() {
  try {
    const services = await prisma.repairServices.findMany();
    return services;
  } catch {
    return null;
  }
}

export const deleteService = async (id: string) => {
  try {
    await prisma.repairServices.delete({
      where: { type: "service", id },
    });
    return { success: "Record deleted successfully" };
  } catch {
    return { error: "Internal server error" };
  }
};
