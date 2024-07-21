"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function getSession(role: string) {
  try {
    const sessionKey = {
      SUPERADMIN: "superadmin-session-token",
      ADMIN: "admin-session-token",
      TEACHER: "teacher-session-token",
      USER: "user-session-token",
    }[role];

    if (!sessionKey) {
      return redirect("/login");
    }

    const tokenValue = cookies().get(sessionKey)?.value;

    if (!tokenValue) {
      return redirect("/login");
    }

    const decodedToken = jwt.decode(tokenValue);

    if (!decodedToken || typeof decodedToken === "string") {
      return redirect("/login");
    }

    const { id, email } = decodedToken as JwtPayload;

    if (!id || !email) {
      return redirect("/login");
    }

    if (role === "ADMIN") {
      const existingAdmin = await prisma.school.findUnique({
        where: { id },
      });
      if (!existingAdmin || existingAdmin.email !== email) {
        return redirect("/login");
      }
      if (!existingAdmin.isActive) {
        return redirect("/login");
      }
      return {
        success: true,
        data: {
          id: existingAdmin.id,
          name: existingAdmin.name,
          email: existingAdmin.email,
          image: existingAdmin.image,
          role: role,
        },
      };
    }

    // Add more role-based logic here if needed

    return { id, role };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Error in getSession:", error);
    return redirect("/login");
  }
}
