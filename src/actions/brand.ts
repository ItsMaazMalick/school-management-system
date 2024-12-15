"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addBrand({ name }: { name: string }) {
  try {
    await prisma.repairBrand.create({
      data: {
        name,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Brand Created successfully" };
  } catch {
    return { error: "Error creating brand" };
  }
}

export async function addBrandCategory({
  brandId,
  name,
}: {
  brandId: string;
  name: string;
}) {
  try {
    const existingBrand = await prisma.repairBrand.findUnique({
      where: { id: brandId },
    });
    if (!existingBrand) {
      return { error: "Invalid brand id" };
    }
    await prisma.repairCategory.create({
      data: {
        name,
        repairBrand: {
          connect: {
            id: brandId,
          },
        },
      },
    });
    revalidatePath("/dashboard");
    return { success: "Category Created successfully" };
  } catch {
    return { error: "Error creating category" };
  }
}

export async function addBrandProduct({
  categoryId,
  name,
}: {
  categoryId: string;
  name: string;
}) {
  try {
    const existingCategory = await prisma.repairCategory.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory) {
      return { error: "Invalid category id" };
    }
    await prisma.repairProduct.create({
      data: {
        name,
        repairCategory: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    revalidatePath("/dashboard");
    return { success: "Product Created successfully" };
  } catch {
    return { error: "Error creating category" };
  }
}
