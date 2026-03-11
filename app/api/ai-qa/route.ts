import { NextRequest } from "next/server";
import { getAiQaConfig, saveAiQaConfig } from "@/lib/config";
import { requireAdmin } from "@/lib/auth";
import type { AiQaConfig } from "@/types/ai-qa-config";

export async function GET() {
  const config = await getAiQaConfig();
  return Response.json(config);
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  let body: AiQaConfig;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title || !body.ctaText || !body.ctaHref) {
    return Response.json(
      { error: "title, ctaText, ctaHref required" },
      { status: 400 }
    );
  }

  if (!Array.isArray(body.items)) {
    return Response.json({ error: "items must be array" }, { status: 400 });
  }

  await saveAiQaConfig(body);
  return Response.json(body);
}
