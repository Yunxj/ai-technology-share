import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getContentById, updateContent } from "@/lib/data";
import { checkLikeRateLimit } from "@/lib/ratelimit";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ip = getClientIp(request);
    const identifier = `${ip}:${id}`;

    const allowed = await checkLikeRateLimit(identifier);
    if (!allowed) {
      return Response.json(
        { error: "操作过于频繁，请稍后再试" },
        { status: 429 }
      );
    }

    const item = await getContentById(id);
    if (!item) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const newLikeCount = (item.likeCount ?? 0) + 1;
    const updated = await updateContent(id, { likeCount: newLikeCount });
    if (!updated) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/dev");

    return Response.json({ likeCount: updated.likeCount });
  } catch (err) {
    console.error("[like] Failed:", err);
    return Response.json(
      {
        error:
          "点赞失败，请稍后重试。若为 EdgeOne/Vercel 等静态部署，数据写入可能不支持，需配置可写存储。",
      },
      { status: 500 }
    );
  }
}
