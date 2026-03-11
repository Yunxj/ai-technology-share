import { NextRequest } from "next/server";
import { getAiQaConfig, saveAiQaConfig } from "@/lib/config";
import { requireAdmin } from "@/lib/auth";
import type { AiQaItem } from "@/types/ai-qa-config";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: Partial<AiQaItem>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const config = await getAiQaConfig();
  const idx = config.items.findIndex((i) => i.id === id);
  if (idx < 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const existing = config.items[idx];
  const updated: AiQaItem = {
    ...existing,
    ...body,
    id: existing.id,
  };

  if (typeof updated.title !== "string" || typeof updated.answerCount !== "number" || typeof updated.daysAgo !== "number") {
    return Response.json(
      { error: "title, answerCount, daysAgo required" },
      { status: 400 }
    );
  }

  config.items[idx] = updated;
  await saveAiQaConfig(config);
  return Response.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const config = await getAiQaConfig();
  const idx = config.items.findIndex((i) => i.id === id);
  if (idx < 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  config.items.splice(idx, 1);
  await saveAiQaConfig(config);
  return Response.json({ success: true });
}
