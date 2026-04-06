// lib/logout.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();

  // Delete the JWT cookie — this is the entire logout operation
  // No database call needed — JWT is stateless
  // Once the cookie is gone, getUser() returns null everywhere
  cookieStore.delete("token");

  // Redirect to login — redirect() throws internally so no return needed
  redirect("/login");
}
