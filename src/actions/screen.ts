"use server";

import prisma from "@/lib/db";
import { addScreenSchema } from "@/lib/schemas/repairing-schema";
import { z } from "zod";

export const addScreen = async (values: z.infer<typeof addScreenSchema>) => {
  try {
    const validData = addScreenSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }

    // Create the repair service first
    await prisma.repairServices.create({
      data: {
        name: validData.data.name,
        price: validData.data.price,
        type: "screen",
      },
    });

    return { success: "Service added" };
  } catch (error) {
    console.error(error); // Log the error for better debugging
    return { error: "Internal server error" };
  }
};

export async function getALLScreens() {
  try {
    const services = await prisma.repairServices.findMany({
      where: { type: "screen" },
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
