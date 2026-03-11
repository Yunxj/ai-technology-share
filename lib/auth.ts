import { cookies } from "next/headers";

const ADMIN_TOKEN_KEY = "admin_token";

export function verifyAdmin(token: string | null): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return token === password;
}

export async function getAdminToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_TOKEN_KEY)?.value ?? null;
}

export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN_KEY);
}

export async function requireAdmin(
  request?: Request
): Promise<{ ok: boolean; message?: string }> {
  let token: string | null = null;

  if (request) {
    const authHeader = request.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
  }

  if (!token) {
    token = await getAdminToken();
  }

  if (!verifyAdmin(token)) {
    return { ok: false, message: "Unauthorized" };
  }
  return { ok: true };
}
