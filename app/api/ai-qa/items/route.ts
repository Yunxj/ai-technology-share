import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { getAiQaConfig, saveAiQaConfig } from "@/lib/config";
import { requireAdmin } from "@/lib/auth";
import type { AiQaItem } from "@/types/ai-qa-config";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  let body: Partial<AiQaItem>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title || typeof body.answerCount !== "number" || typeof body.daysAgo !== "number") {
    return Response.json(
      { error: "title, answerCount, daysAgo required" },
      { status: 400 }
    );
  }

  const config = await getAiQaConfig();
  const maxOrder = config.items.reduce(
    (max, i) => Math.max(max, i.sortOrder ?? 0),
    -1
  );

  const item: AiQaItem = {
    id: body.id ?? nanoid(),
    title: body.title,
    answerCount: body.answerCount,
    daysAgo: body.daysAgo,
    href: body.href,
    contentId: body.contentId,
    docSlug: body.docSlug,
    externalId: body.externalId,
    sortOrder: body.sortOrder ?? maxOrder + 1,
  };

  config.items.push(item);
  await saveAiQaConfig(config);
  return Response.json(item);
}
