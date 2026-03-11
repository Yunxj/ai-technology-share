import { NextRequest } from "next/server";
import {
  getContentById,
  updateContent,
  deleteContent,
} from "@/lib/data";
import { requireAdmin } from "@/lib/auth";
import type { ContentItem } from "@/types/content";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await getContentById(id);
  if (!item) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(item);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.message ?? "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: Partial<ContentItem>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const updated = await updateContent(id, body);
  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
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
  const ok = await deleteContent(id);
  if (!ok) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ success: true });
}
