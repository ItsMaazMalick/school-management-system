"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import prisma from "@/lib/db";
import { addSchoolSchema, AddSchoolSchema } from "@/lib/schemas/school-schema";
import { deleteImage } from "./delete-image";

export async function getSchoolUsingSession() {
  try {
    const session = await getSession("ADMIN");
    if (!session?.success) {
      return redirect("/login");
    }
    if (!session.data.id) {
      return redirect("/login");
    }
    const school = await prisma.school.findUnique({
      where: { id: session.data.id },
      select: {
        id: true,
        name: true,
        email: true,
        targetLine: true,
        image: true,
        contact: true,
        website: true,
        address: true,
        country: true,
        lastPaymentDate: true,
        isActive: true,
        username: true,
      },
    });
    if (!school) {
      return redirect("/login");
    }
    if (!school.isActive) {
      return redirect("/login");
    }
    return school;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return null;
  }
}

export async function updateSchool(
  values: AddSchoolSchema,
  schoolId: string,
  image?: string,
  previousImage?: string
) {
  try {
    if (!schoolId) {
      return redirect("/login");
    }
    const validData = addSchoolSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }
    const existingSchool = await prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!existingSchool) {
      return redirect("/login");
    }
    if (image && previousImage) {
      await deleteImage(previousImage.split("/f/")[1]);
    }
    await prisma.school.update({
      where: {
        id: existingSchool.id,
      },
      data: {
        name: validData.data.name,
        email: validData.data.email,
        targetLine: validData.data.targetLine,
        image: image,
        contact: validData.data.contact,
        website: validData.data.website,
        address: validData.data.address,
        country: validData.data.country,
      },
    });
    return redirect("/admin/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong" };
  }
}

export async function getTransactionsForSchoolUsingSession() {
  try {
    const session = await getSession("ADMIN");
    if (!session?.success) {
      return redirect("/login");
    }
    if (!session.data.id) {
      return redirect("/login");
    }
    const existingAdmin = await prisma.school.findUnique({
      where: { id: session.data.id },
    });
    if (!existingAdmin) {
      return redirect("/login");
    }
    const transactions = await prisma.payment.findMany({
      where: { schoolId: existingAdmin.id },
      orderBy: {
        createdAt: "desc",
      },
    });
    return transactions;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return null;
  }
}
