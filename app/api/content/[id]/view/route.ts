import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getContentById, updateContent } from "@/lib/data";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await getContentById(id);
  if (!item) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const newViewCount = (item.viewCount ?? 0) + 1;
  const updated = await updateContent(id, { viewCount: newViewCount });
  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/dev");

  return Response.json({ viewCount: updated.viewCount });
}
