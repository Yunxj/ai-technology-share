export interface AiQaItem {
  id: string;
  title: string;
  answerCount: number;
  daysAgo: number;
  href?: string;
  contentId?: string;
  docSlug?: string;
  externalId?: string;
  sortOrder?: number;
}

export interface AiQaConfig {
  title: string;
  ctaText: string;
  ctaHref: string;
  items: AiQaItem[];
  syncSource?: "manual" | "coze" | "doubao";
}
