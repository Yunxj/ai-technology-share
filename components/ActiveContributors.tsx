import { Crown, User, PenSquare } from "lucide-react";
import type { ContributorsConfig } from "@/types/contributors-config";

interface ActiveContributorsProps {
  config: ContributorsConfig;
}

export default function ActiveContributors({ config }: ActiveContributorsProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Crown className="w-5 h-5 text-primary" />
        {config.title}
      </h3>
      <div className="space-y-3">
        {(config.contributors ?? []).map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                i === 0 ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-600"
              }`}
            >
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800">{c.name}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <PenSquare className="w-3.5 h-3.5" />
                贡献{c.articles}篇 · 获赞{c.likes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
