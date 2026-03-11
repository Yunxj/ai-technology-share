export type ContentType =
  | "tips"
  | "models"
  | "tools"
  | "editors"
  | "team"
  | "dingtalk"
  | "problems";

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
  internalHref?: string;
  viewCount?: number;
  likeCount?: number;
  pinned?: boolean;
}
