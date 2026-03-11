export type ContentType =
  | "tips"
  | "models"
  | "tools"
  | "editors"
  | "team"
  | "dingtalk";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  summary: string;
  tags: string[];
  author?: string;
  shareDate?: string;
  shareEvent?: string;
  updatedAt: string;
  sourceType: "internal" | "dingtalk";
  externalUrl?: string;
  viewCount?: number;
  likeCount?: number;
}
