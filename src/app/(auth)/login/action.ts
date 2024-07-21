"use server";

import prisma from "@/lib/db";
import { loginSchema, LoginSchema } from "@/lib/schemas/login-schema";
import jwt from "jsonwebtoken";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function login(values: LoginSchema) {
  try {
    const validData = loginSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }
    //OK: FOR ADMIN
    if (validData.data.role === "ADMIN") {
      const existingUser = await prisma.school.findUnique({
        where: { username: validData.data.username },
      });
      if (!existingUser) {
        return { error: "Invalid username or password" };
      }
      const passwordMatch = await bcrypt.compare(
        validData.data.password,
        existingUser.password
      );
      if (!passwordMatch) {
        return { error: "Invalid username of password" };
      }
      if (!existingUser.isActive) {
        return { error: "Please wait your request is pending" };
      }
      const tokenData = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        image: existingUser.image,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!);
      cookies().set("admin-session-token", token, {
        httpOnly: true,
        secure: true,
      });
      redirect("/admin/dashboard");
    }
    return { error: "Other role coming soon..." };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Something went wrong" };
  }
}
