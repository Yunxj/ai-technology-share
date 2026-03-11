"use client";

import Link from "next/link";
import { Zap, FileText, MessageSquare, CalendarCheck } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import type { RdDynamicsConfig } from "@/types/rd-dynamics-config";

const ICON_MAP = {
  file: FileText,
  chat: MessageSquare,
  calendar: CalendarCheck,
} as const;

interface RdDynamicsSectionProps {
  config: RdDynamicsConfig;
}

export default function RdDynamicsSection({ config }: RdDynamicsSectionProps) {
  const rawData = config.chartData ?? [
    { value: 20 },
    { value: 45 },
    { value: 35 },
    { value: 60 },
    { value: 48 },
    { value: 75 },
  ];
  const chartData = rawData.map((d, i) => ({ ...d, name: String(i) }));

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primaryPurple" />
          {config.title}
        </h3>
        <Link
          href={config.ctaHref ?? "/kb"}
          className="text-sm px-3 py-1.5 rounded-lg bg-violet-100 text-primaryPurple font-medium hover:bg-violet-200 transition-colors"
        >
          {config.ctaText}
        </Link>
      </div>
      <div className="space-y-4">
        {(config.items ?? []).map((item, i) => {
          const IconComp = ICON_MAP[item.icon] ?? FileText;
          return (
            <div key={i} className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                <IconComp className="w-4 h-4 text-primaryPurple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 text-sm">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.metadata}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 h-16 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 2, right: 2, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" hide />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip contentStyle={{ display: "none" }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={false}
              strokeOpacity={0.7}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
