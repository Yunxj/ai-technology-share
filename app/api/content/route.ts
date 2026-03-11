import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { getContent, addContent } from "@/lib/data";
import { requireAdmin } from "@/lib/auth";
import type { ContentItem, ContentType } from "@/types/content";

const VALID_TYPES: ContentType[] = [
  "tips",
  "models",
  "tools",
  "editors",
  "team",
  "dingtalk",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as ContentType | null;

  if (!type || !VALID_TYPES.includes(type)) {
    return Response.json(
      { error: "Invalid or missing type parameter" },
      { status: 400 }
    );
  }

  const items = await getContent(type);
  return Response.json({ items });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  let body: Partial<ContentItem>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = body.type as ContentType;
  if (!type || !VALID_TYPES.includes(type)) {
    return Response.json({ error: "Invalid type" }, { status: 400 });
  }

  if (!body.title || !body.summary) {
    return Response.json({ error: "title and summary required" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const item: ContentItem = {
    id: nanoid(),
    type,
    title: body.title,
    summary: body.summary,
    tags: Array.isArray(body.tags) ? body.tags : [],
    author: body.author,
    shareDate: body.shareDate,
    shareEvent: body.shareEvent,
    updatedAt: now,
    sourceType: body.sourceType ?? "internal",
    externalUrl: body.externalUrl,
    viewCount: body.viewCount ?? 0,
    likeCount: body.likeCount ?? 0,
  };

  await addContent(item);
  return Response.json(item);
}
