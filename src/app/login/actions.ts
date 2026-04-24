"use server";

import { setSession } from "@/lib/auth-utils";

export async function loginAction(role: string, email: string) {
  await setSession(role, email);
  return { success: true };
}

export async function logoutAction() {
  const { clearSession } = await import("@/lib/auth-utils");
  await clearSession();
  return { success: true };
}
