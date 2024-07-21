"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  //   cookies().set("admin-session-token", "");
  cookies().delete("admin-session-token");
  redirect("/login");
}
