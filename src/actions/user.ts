"use server";

import prisma from "@/lib/db";
import { encryptString } from "@/lib/encryption";
import { loginSchema } from "@/lib/schemas/login-schema";
import { signupSchema } from "@/lib/schemas/signup-schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signup(values: z.infer<typeof signupSchema>) {
  try {
    const validData = signupSchema.safeParse(values);
    if (!validData.success) {
      return { error: "INvalid data provided" };
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: validData.data.email },
    });
    if (existingUser) {
      return { error: "User already exists" };
    }
    const hashPassword = await bcrypt.hash(validData.data.password, 10);
    await prisma.user.create({
      data: {
        name: validData.data.name,
        email: validData.data.email,
        password: hashPassword,
      },
    });
    return { success: "Account created kindly check your email address" };
  } catch {
    return { error: "Internal server error" };
  }
}

export async function login(values: z.infer<typeof loginSchema>) {
  try {
    const validData = loginSchema.safeParse(values);
    if (!validData.success) {
      return { error: "Invalid data provided" };
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: validData.data.email },
    });
    if (!existingUser) {
      return { error: "Invalid credentials" };
    }
    const isValidPassword = await bcrypt.compare(
      validData.data.password,
      existingUser.password
    );
    if (!isValidPassword) {
      return { error: "Invalid credentials" };
    }
    const tokenData = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "1d",
    });
    const encryptedToken = encryptString(token);
    (await cookies()).set("token", encryptedToken, {
      secure: true,
      httpOnly: true,
    });
    return redirect("/dashboard");
    return { success: "Logged in" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "Internal server error" };
  }
}
