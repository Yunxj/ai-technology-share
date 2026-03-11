import { NextRequest } from "next/server";
import { setAdminCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password = body.password?.trim();
  if (!password) {
    return Response.json({ error: "password required" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return Response.json({ error: "Admin not configured" }, { status: 500 });
  }

  if (password !== adminPassword) {
    return Response.json({ error: "密码错误" }, { status: 401 });
  }

  await setAdminCookie(adminPassword);
  return Response.json({ success: true });
}
