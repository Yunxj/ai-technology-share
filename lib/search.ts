import { getAllContent } from "./data";
import type { ContentItem, ContentType } from "@/types/content";

export async function searchContent(
  keyword: string,
  type?: ContentType
): Promise<ContentItem[]> {
  const all = await getAllContent();
  const k = keyword.toLowerCase().trim();
  if (!k) return all;

  return all.filter((item) => {
    if (type && item.type !== type) return false;
    const searchable = [
      item.title,
      item.summary,
      ...(item.tags || []),
      item.author,
      item.shareEvent,
    ].filter(Boolean);
    return searchable.some((s) =>
      String(s).toLowerCase().includes(k)
    );
  });
}
