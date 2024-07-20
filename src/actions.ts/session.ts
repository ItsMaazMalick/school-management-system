"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/db";

export async function getSession(role: string) {
  try {
    const sessionKey = {
      SUPERADMIN: "superadmin-session-token",
      ADMIN: "admin-session-token",
      TEACHER: "teacher-session-token",
      USER: "user-session-token",
    }[role];

    if (!sessionKey) {
      return null;
    }

    const tokenValue = cookies().get(sessionKey)?.value;

    if (!tokenValue) {
      return null;
    }

    const decodedToken = jwt.decode(tokenValue);

    if (!decodedToken || typeof decodedToken === "string") {
      return null;
    }

    const { id, email } = decodedToken as JwtPayload;

    if (!id) {
      return null;
    }

    if (role === "ADMIN") {
      const existingAdmin = await prisma.school.findUnique({
        where: { id },
      });
      if (!existingAdmin || existingAdmin.email !== email) {
        return null;
      }
      return {
        success: true,
        data: {
          id: existingAdmin.id,
          name: existingAdmin.name,
          email: existingAdmin.email,
          role: role,
        },
      };
    }

    // Add more role-based logic here if needed

    return { id, role };
  } catch (error) {
    console.error("Error in getSession:", error);
    return null;
  }
}
