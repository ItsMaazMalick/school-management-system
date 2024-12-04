"use server";

import prisma from "@/lib/db";
import { addRepairingSchema } from "@/lib/schemas/repairing-schema";
import { z } from "zod";

export const addService = async (
  values: z.infer<typeof addRepairingSchema>
) => {
  try {
    const validData = addRepairingSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }
    // const slug = generateSlug(validData.data.name);
    // const existingProductWithSlug = await prisma.product.findUnique({
    //   where: { slug },
    // });
    // if (existingProductWithSlug) {
    //   return { error: "Product already exists" };
    // }
    await prisma.repairServices.create({
      data: {
        name: validData.data.name,
        price: validData.data.price,
        description: validData.data.description,
        estimatedTime: validData.data.estimatedTime,
        type: "basic",
        Product: {
          connect: {
            id: validData.data.product,
          },
        },
      },
    });
    return { success: "Service added" };
  } catch {
    return { error: "Internal server error" };
  }
};

export async function getServicesWithProduct(slug: string) {
  try {
    const product = await prisma.repairProduct.findUnique({
      where: { slug },
      include: {
        RepairServices: {
          where: { type: "basic" },
        },
      },
    });
    return product;
  } catch {
    return null;
  }
}

export async function getALLServices() {
  try {
    const services = await prisma.repairServices.findMany({
      where: { type: "basic" },
      include: {
        Product: {
          select: {
            name: true,
          },
        },
      },
    });
    return services;
  } catch {
    return null;
  }
}
