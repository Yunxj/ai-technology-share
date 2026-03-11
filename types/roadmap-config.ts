export interface RoadmapItem {
  order: number;
  title: string;
  description: string;
  status: "计划中" | "进行中" | "已完成";
  date?: string;
  href?: string;
}

export interface RoadmapConfig {
  title: string;
  items: RoadmapItem[];
}
