"use server";

import prisma from "@/lib/db";
import { addGlassSchema } from "@/lib/schemas/repairing-schema";
import { z } from "zod";

export const addGlass = async (values: z.infer<typeof addGlassSchema>) => {
  try {
    const validData = addGlassSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }

    console.log(validData.data.variations);

    // Create the repair service first
    const service = await prisma.repairServices.create({
      data: {
        name: validData.data.name,
        price: validData.data.price,
        type: "glass",
      },
    });

    // Create variants and associate them with the created service
    if (validData.data.variations) {
      await prisma.variant.createMany({
        data: validData.data.variations.map((item: string) => ({
          name: item,
          price: 0,
          repairServicesId: service.id,
        })),
      });
    }

    return { success: "Service added" };
  } catch (error) {
    console.error(error); // Log the error for better debugging
    return { error: "Internal server error" };
  }
};

export async function getALLGlass() {
  try {
    const services = await prisma.repairServices.findMany({
      where: { type: "glass" },
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
