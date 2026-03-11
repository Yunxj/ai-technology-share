export interface RdDynamicsItem {
  icon: "file" | "chat" | "calendar";
  title: string;
  metadata: string;
  href?: string;
}

export interface RdDynamicsConfig {
  title: string;
  ctaText: string;
  ctaHref?: string;
  items: RdDynamicsItem[];
  chartData?: { value: number }[];
}
