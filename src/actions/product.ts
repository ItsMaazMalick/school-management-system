"use server";

import prisma from "@/lib/db";
import { addProductSchema } from "@/lib/schemas/product-schema";
import { generateSlug } from "@/lib/slug";
import { z } from "zod";

export const addProduct = async (
  values: z.infer<typeof addProductSchema>,
  image: string
) => {
  try {
    const validData = addProductSchema.safeParse(values);
    if (!validData.success || !image) {
      return { error: "Invalid data provided" };
    }
    const slug = generateSlug(validData.data.name);
    const existingProductWithSlug = await prisma.product.findUnique({
      where: { slug },
    });
    if (existingProductWithSlug) {
      return { error: "Product already exists" };
    }
    await prisma.product.create({
      data: {
        name: validData.data.name,
        slug,
        price: validData.data.price,
        image,
        description: validData.data.description,
        storage: validData.data.storage,
        category: {
          connect: {
            id: validData.data.category,
          },
        },
      },
    });
    return { success: "Product added" };
  } catch {
    return { error: "Internal server error" };
  }
};

export const getAllProductWithCategoryName = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
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
