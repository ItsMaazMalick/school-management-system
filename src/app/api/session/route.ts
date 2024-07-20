import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/actions.ts/session";

export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get("role");

  try {
    const session = await getSession("ADMIN");
    console.log(session);
    const tokenValue = req.cookies.get(
      `${
        role === "SUPERADMIN"
          ? "superadmin"
          : role === "ADMIN"
          ? "admin"
          : role === "TEACHER"
          ? "teacher"
          : role === "USER"
          ? "user"
          : ""
      }-session-token`
    )?.value;

    console.log(tokenValue);
    if (!tokenValue) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = jwt.decode(tokenValue);

    if (!decodedToken || typeof decodedToken === "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenId = (decodedToken as jwt.JwtPayload).id;

    if (!tokenId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (role === "ADMIN") {
      const existingAdmin = await prisma.school.findUnique({
        where: { id: tokenId },
      });
      if (!existingAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const isValidEmail =
        existingAdmin.email === (decodedToken as jwt.JwtPayload).email;
      if (!isValidEmail) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({
        admin: {
          id: existingAdmin.id,
          name: existingAdmin.name,
          email: existingAdmin.email,
        },
      });
    }

    return NextResponse.json({ id: tokenId });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
