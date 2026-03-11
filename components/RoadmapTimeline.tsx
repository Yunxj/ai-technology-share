import { Calendar } from "lucide-react";
import type { RoadmapConfig } from "@/types/roadmap-config";

const STATUS_STYLES: Record<string, string> = {
  计划中: "bg-slate-100 text-slate-600 border-slate-200",
  进行中: "bg-amber-100 text-amber-700 border-amber-200",
  已完成: "bg-green-100 text-green-700 border-green-200",
};

const NODE_STYLES: Record<string, string> = {
  计划中: "bg-slate-300 border-slate-400",
  进行中: "bg-amber-500 border-amber-600",
  已完成: "bg-green-500 border-green-600",
};

interface RoadmapTimelineProps {
  config: RoadmapConfig;
}

export default function RoadmapTimeline({ config }: RoadmapTimelineProps) {
  const sortedItems = [...(config.items ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-fit">
      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-base">
        <Calendar className="w-5 h-5 text-primary" />
        {config.title}
      </h3>
      <div className="relative pl-5">
        {/* 垂直连接线 */}
        <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-slate-200" />
        <div className="space-y-3">
          {sortedItems.map((item) => {
            const nodeClass = NODE_STYLES[item.status] ?? NODE_STYLES["计划中"];
            const badgeClass = STATUS_STYLES[item.status] ?? STATUS_STYLES["计划中"];
            return (
              <div key={item.order} className="relative">
                {/* 节点 - 略大提升可读性 */}
                <div
                  className={`absolute left-0 top-0.5 w-2.5 h-2.5 rounded-full border-2 z-10 ${nodeClass}`}
                />
                <div className="min-w-0 pl-4">
                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                    <span className="font-medium text-slate-800 text-xs">{item.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border shrink-0 ${badgeClass}`}
                    >
                      {item.status}
                    </span>
                    {item.date && (
                      <span className="text-[10px] text-slate-500 shrink-0">{item.date}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
