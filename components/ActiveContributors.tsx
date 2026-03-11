import { Crown, User, Share2 } from "lucide-react";
import type { ContributorsConfig } from "@/types/contributors-config";
import type { ContentItem } from "@/types/content";

function getContributorCounts(
  name: string,
  allContent: ContentItem[]
): { shares: number; problems: number; tools: number; total: number } {
  const byAuthor = allContent.filter((item) => item.author === name);
  const shares = byAuthor.filter((c) => c.type === "tips" || c.type === "team").length;
  const problems = byAuthor.filter((c) => c.type === "problems").length;
  const tools = byAuthor.filter((c) => c.type === "tools" || c.type === "editors").length;
  return { shares, problems, tools, total: shares + problems + tools };
}

interface ActiveContributorsProps {
  config: ContributorsConfig;
  allContent?: ContentItem[];
}

export default function ActiveContributors({ config, allContent = [] }: ActiveContributorsProps) {
  const contributorsWithCounts = (config.contributors ?? []).map((c) => ({
    ...c,
    counts: getContributorCounts(c.name, allContent),
  }));
  const sorted = [...contributorsWithCounts].sort(
    (a, b) => b.counts.total - a.counts.total
  );
  const grandTotal = allContent.reduce(
    (acc, c) => {
      if (c.type === "tips" || c.type === "team") acc.shares += 1;
      else if (c.type === "problems") acc.problems += 1;
      else if (c.type === "tools" || c.type === "editors") acc.tools += 1;
      return acc;
    },
    { shares: 0, problems: 0, tools: 0 }
  );

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Crown className="w-5 h-5 text-primary" />
        {config.title}
      </h3>
      <div className="mb-3 px-2 py-2 rounded-lg bg-slate-50 text-sm text-slate-600">
        全站合计：分享 {grandTotal.shares} · 问题 {grandTotal.problems} · 工具 {grandTotal.tools} · 总和{" "}
        {grandTotal.shares + grandTotal.problems + grandTotal.tools}
      </div>
      <div className="space-y-3">
        {sorted.map((c, i) => {
          const counts = c.counts;
          const label = `分享 ${counts.shares} · 问题 ${counts.problems} · 工具 ${counts.tools} · 合计 ${counts.total}`;
          return (
            <div key={c.name} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  i === 0 ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-600"
                }`}
              >
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800">{c.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 flex-wrap">
                  <Share2 className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
