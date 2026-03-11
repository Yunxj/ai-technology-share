import { NextRequest } from "next/server";
import { getSiteConfig, saveSiteConfig } from "@/lib/config";
import { requireAdmin } from "@/lib/auth";
import type { SiteConfig } from "@/types/config";

export async function GET() {
  const config = await getSiteConfig();
  return Response.json(config);
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json(
      { error: auth.message ?? "Unauthorized" },
      { status: 401 }
    );
  }

  let body: SiteConfig;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.logoText || !body.badge || !body.footer) {
    return Response.json(
      { error: "name, logoText, badge, and footer are required" },
      { status: 400 }
    );
  }

  if (
    !body.footer.copyright ||
    !Array.isArray(body.footer.links)
  ) {
    return Response.json(
      { error: "footer.copyright and footer.links are required" },
      { status: 400 }
    );
  }

  await saveSiteConfig(body);
  return Response.json(body);
}
