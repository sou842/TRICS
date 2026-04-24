import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "trics-session";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  
  if (!session?.value) return null;
  
  try {
    return JSON.parse(session.value) as { role: string; email: string };
  } catch {
    return null;
  }
}

export async function setSession(role: string, email: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify({ role, email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
