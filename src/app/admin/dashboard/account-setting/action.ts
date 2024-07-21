"use server";

import { getSession } from "@/actions/session";
import prisma from "@/lib/db";
import {
  updateSchoolUserSchema,
  UpdateSchoolUserSchema,
} from "@/lib/schemas/school-schema";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function updateSchoolAdmin(values: UpdateSchoolUserSchema) {
  try {
    const session = await getSession("ADMIN");
    if (!session?.success) {
      return redirect("/login");
    }
    const existingAdmin = await prisma.school.findUnique({
      where: { id: session.data.id },
    });
    if (!existingAdmin) {
      return redirect("/login");
    }

    const validData = updateSchoolUserSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }
    const hashedPassword =
      validData.data.password &&
      (await bcrypt.hash(validData.data.password, 10));
    await prisma.school.update({
      where: { id: existingAdmin.id },
      data: {
        username: validData.data.username,
        password: validData.data.password
          ? hashedPassword
          : existingAdmin.password,
      },
    });
    return redirect("/admin/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong" };
  }
}
