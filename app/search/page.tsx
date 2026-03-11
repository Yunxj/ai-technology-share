import { searchContent } from "@/lib/search";
import SearchBox from "@/components/SearchBox";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ContentType } from "@/types/content";

const TYPE_LABELS: Record<ContentType, string> = {
  tips: "研发技巧",
  models: "大模型",
  tools: "工具",
  editors: "AI编辑器",
  team: "团队分享",
  dingtalk: "钉钉文档",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q = "", type } = await searchParams;
  const items = await searchContent(q, (type as ContentType) ?? undefined);

  return (
    <main className="py-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-3">全局搜索</h2>
        <p className="text-slate-500 mb-6">搜索技巧、模型、工具、钉钉文档...</p>
        <div className="flex justify-center">
          <SearchBox size="large" defaultValue={q} />
        </div>
        {q && (
          <p className="text-sm text-slate-500 mt-4">
            搜索「<strong>{q}</strong>」共找到 <strong>{items.length}</strong> 条结果
          </p>
        )}
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        {items.length === 0 ? (
          <p className="text-center text-slate-500 py-12">暂无结果</p>
        ) : (
          items.map((item) => {
            const isExternal = item.sourceType === "dingtalk" || !!item.externalUrl;
            const href = isExternal && item.externalUrl ? item.externalUrl : "#";

            const card = (
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-cardBorder hover:border-slate-300 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
                    {TYPE_LABELS[item.type]}
                  </div>
                  <div className="font-semibold text-base mb-1.5 flex items-center gap-2">
                    {item.title}
                    {isExternal && (
                      <span className="text-dingtalk text-sm">外链</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{item.summary}</p>
                </div>
                {isExternal && (
                  <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
              </div>
            );

            if (isExternal && item.externalUrl) {
              return (
                <a
                  key={item.id}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card}
                </a>
              );
            }

            return (
              <Link key={item.id} href={`/kb?cat=${item.type}`}>
                {card}
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
