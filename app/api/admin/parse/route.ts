import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { parseWithAI } from "@/lib/ai-parse";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  let body: { content?: string; hint?: "link" | "meeting" | "auto" };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const content = body.content?.trim();
  if (!content) {
    return Response.json({ error: "content required" }, { status: 400 });
  }

  const hint = body.hint ?? "auto";

  try {
    const result = await parseWithAI(content, hint);
    return Response.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Parse failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
