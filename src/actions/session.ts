"use server";

import { decryptString } from "@/lib/encryption";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function getSession() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return null;
    }
    const descryptedToken = decryptString(token);
    if (!descryptedToken) {
      return null;
    }
    const result = jwt.verify(
      descryptedToken,
      process.env.TOKEN_SECRET_KEY!
    ) as JwtPayload;
    if (!result) {
      return null;
    }
    return { user: { ...result } };
  } catch {
    return null;
  }
}
