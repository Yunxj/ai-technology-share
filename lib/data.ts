import { promises as fs } from "fs";
import path from "path";
import type { ContentItem, ContentType } from "@/types/content";

const TYPE_TO_FILE: Record<ContentType, string> = {
  tips: "tips.json",
  models: "models.json",
  tools: "tools.json",
  editors: "editors.json",
  team: "team.json",
  dingtalk: "dingtalk.json",
};

const DATA_DIR = path.join(process.cwd(), "data");

async function getDataPath(type: ContentType): Promise<string> {
  return path.join(DATA_DIR, TYPE_TO_FILE[type]);
}

export async function getContent(type: ContentType): Promise<ContentItem[]> {
  const filePath = await getDataPath(type);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getAllContent(): Promise<ContentItem[]> {
  const types: ContentType[] = [
    "tips",
    "models",
    "tools",
    "editors",
    "team",
    "dingtalk",
  ];
  const results = await Promise.all(types.map((t) => getContent(t)));
  return results.flat();
}

export async function getContentById(
  id: string
): Promise<ContentItem | null> {
  const all = await getAllContent();
  return all.find((item) => item.id === id) ?? null;
}

export async function saveContent(
  type: ContentType,
  items: ContentItem[]
): Promise<void> {
  const filePath = await getDataPath(type);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}

export async function addContent(item: ContentItem): Promise<ContentItem> {
  const items = await getContent(item.type);
  items.unshift(item);
  await saveContent(item.type, items);
  return item;
}

export async function updateContent(
  id: string,
  updates: Partial<ContentItem>
): Promise<ContentItem | null> {
  const all = await getAllContent();
  const index = all.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const item = all[index];
  const updated = { ...item, ...updates, id: item.id, type: item.type };
  const items = await getContent(item.type);
  const typeIndex = items.findIndex((i) => i.id === id);
  items[typeIndex] = updated;
  await saveContent(item.type, items);
  return updated;
}

export async function deleteContent(id: string): Promise<boolean> {
  const all = await getAllContent();
  const item = all.find((i) => i.id === id);
  if (!item) return false;

  const items = await getContent(item.type);
  const filtered = items.filter((i) => i.id !== id);
  await saveContent(item.type, filtered);
  return true;
}
