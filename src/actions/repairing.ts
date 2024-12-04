"use server";

import prisma from "@/lib/db";
import { addRepairingProductSchema } from "@/lib/schemas/category-schema";
import { generateSlug } from "@/lib/slug";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addRepairingProduct = async (
  values: z.infer<typeof addRepairingProductSchema>
) => {
  try {
    const validData = addRepairingProductSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }
    const slug = generateSlug(validData.data.name);
    const existingProductWithSlug = await prisma.repairProduct.findUnique({
      where: { slug },
    });
    if (existingProductWithSlug) {
      return { error: "Product already exists" };
    }
    await prisma.repairProduct.create({
      data: {
        name: validData.data.name,
        slug,
      },
    });
    revalidatePath("/dashboard/add-repairing");
    return { success: "Product added" };
  } catch {
    return { error: "Internal server error" };
  }
};

export const getAllRepairingProducts = async () => {
  try {
    const products = await prisma.repairProduct.findMany();
    return products;
  } catch {
    return null;
  }
};

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return product;
  } catch {
    return null;
  }
}

export async function getRepairingProductBySlug(slug: string) {
  try {
    const product = await prisma.repairProduct.findUnique({
      where: { slug },
      include: { RepairServices: true },
    });
    return product;
  } catch {
    return null;
  }
}
