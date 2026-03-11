import { NextRequest } from "next/server";
import { getAiQaConfig, saveAiQaConfig } from "@/lib/config";
import { requireAdmin } from "@/lib/auth";
import { fetchExternalQaStats } from "@/lib/ai-qa-sync";
import type { AiQaConfig } from "@/types/ai-qa-config";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  const config = await getAiQaConfig();
  const source = config.syncSource ?? "manual";

  if (source === "manual") {
    return Response.json({
      message: "syncSource 为 manual，跳过外部同步",
      updated: 0,
    });
  }

  const itemsWithExternal = config.items.filter((i) => i.externalId);
  let updated = 0;

  for (const item of itemsWithExternal) {
    const stats = await fetchExternalQaStats(item.externalId!, source);
    if (stats) {
      item.answerCount = stats.answerCount;
      item.daysAgo = stats.daysAgo;
      updated++;
    }
  }

  if (updated > 0) {
    await saveAiQaConfig(config);
  }

  return Response.json({
    message: `同步完成，更新 ${updated} 条`,
    updated,
  });
}
