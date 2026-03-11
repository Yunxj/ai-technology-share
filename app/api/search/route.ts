import { NextRequest } from "next/server";
import { searchContent } from "@/lib/search";
import type { ContentType } from "@/types/content";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const type = searchParams.get("type") as ContentType | null;

  const items = await searchContent(q, type ?? undefined);
  return Response.json({ items });
}
