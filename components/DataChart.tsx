"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Eye, Heart, FileText, User } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const TYPE_LABELS: Record<string, string> = {
  tips: "技巧分享",
  models: "大模型评测",
  tools: "工具",
  editors: "AI 编辑器",
  team: "团队分享",
  dingtalk: "钉钉文档",
  problems: "问题与方案",
};

const COLORS = ["#2563eb", "#7c3aed", "#0ea5e9", "#8b5cf6", "#6366f1", "#3b82f6"];

interface DataChartProps {
  stats: { type: string; count: number }[];
  totalViews?: number;
  totalLikes?: number;
  totalArticles?: number;
  contributorCount?: number;
}

export default function DataChart({
  stats,
  totalViews = 0,
  totalLikes = 0,
  totalArticles = 0,
  contributorCount = 0,
}: DataChartProps) {
  const pathname = usePathname();
  const [liveStats, setLiveStats] = useState<{
    totalViews: number;
    totalLikes: number;
    totalArticles: number;
    contributorCount: number;
  } | null>(null);

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/dev") return;
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setLiveStats(d))
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && (pathname === "/" || pathname === "/dev")) {
        fetch("/api/stats")
          .then((r) => r.json())
          .then((d) => setLiveStats(d))
          .catch(() => {});
      }
    };
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && (pathname === "/" || pathname === "/dev")) {
        fetch("/api/stats")
          .then((r) => r.json())
          .then((d) => setLiveStats(d))
          .catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  const displayViews = liveStats?.totalViews ?? totalViews;
  const displayLikes = liveStats?.totalLikes ?? totalLikes;
  const displayArticles = liveStats?.totalArticles ?? totalArticles;
  const displayContributors = liveStats?.contributorCount ?? contributorCount;

  const chartData = stats.map((s) => ({
    name: TYPE_LABELS[s.type] ?? s.type,
    count: s.count,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <span className="w-2 h-5 rounded bg-primary" />
        AI 提效数据概览
      </h3>
      {/* 4 指标卡片 */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-slate-500 text-sm flex items-center gap-1 mb-0.5">
            <Eye className="w-4 h-4" />
            总浏览量
          </p>
          <p className="text-2xl font-bold text-primary">{displayViews}</p>
        </div>
        <div>
          <p className="text-slate-500 text-sm flex items-center gap-1 mb-0.5">
            <Heart className="w-4 h-4" />
            总点赞数
          </p>
          <p className="text-2xl font-bold text-primary">{displayLikes}</p>
        </div>
        <div>
          <p className="text-slate-500 text-sm flex items-center gap-1 mb-0.5">
            <FileText className="w-4 h-4" />
            总文章数
          </p>
          <p className="text-2xl font-bold text-primary">{displayArticles}</p>
        </div>
        <div>
          <p className="text-slate-500 text-sm flex items-center gap-1 mb-0.5">
            <User className="w-4 h-4" />
            贡献者
          </p>
          <p className="text-2xl font-bold text-primary">{displayContributors}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-slate-500 mb-2">各类型内容数量</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value: number) => [`${value} 条`, "数量"]}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} name="数量" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-2">内容类型占比</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value: number, name: string) => [`${value} 条`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
