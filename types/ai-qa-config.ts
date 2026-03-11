export interface AiQaItem {
  title: string;
  answerCount: number;
  daysAgo: number;
  href?: string;
}

export interface AiQaConfig {
  title: string;
  ctaText: string;
  ctaHref: string;
  items: AiQaItem[];
}
