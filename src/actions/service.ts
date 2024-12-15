"use server";

import { Service } from "@/app/(frontend)/dashboard/add-repairing/add-repairing-form";
import prisma from "@/lib/db";
import { addRepairingSchema } from "@/lib/schemas/repairing-schema";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addService = async ({
  productId,
  services,
}: {
  productId: string;
  services: {
    productId: string;
    service: { name: string; type: string };
    price: number;
  }[]; // serviceId and price from the front end
}) => {
  try {
    // Prepare data to insert into the database
    const existingProduct = await prisma.repairProduct.findUnique({
      where: { id: productId },
    });
    if (!existingProduct) {
      return { error: "No product found" };
    }

    await prisma.repairServices.createMany({
      data: services.map((service) => ({
        name: service.service.name,
        price: service.price,
        type:
          service.service.type === "screen"
            ? "screen"
            : service.service.type === "battery"
            ? "battery"
            : service.service.type === "charging"
            ? "charging"
            : "service",
        repairProductId: productId,
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

export async function getALLRepairingBrandsWithProduct() {
  try {
    const brandsWithProducts = await prisma.repairBrand.findMany({
      include: {
        repairCategories: {
          include: {
            repairProducts: {
              include: {
                repairServices: true,
              },
            },
          },
        },
      },
    });
    return brandsWithProducts;
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
