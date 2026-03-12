import { getContentById } from "@/lib/data";
import Link from "next/link";
import { User, Calendar, ExternalLink, FileText } from "lucide-react";
import BackButton from "@/components/BackButton";
import ViewTracker from "@/components/ViewTracker";
import LikeButton from "@/components/LikeButton";
import type { ContentType } from "@/types/content";

const TYPE_LABELS: Record<ContentType, string> = {
  tips: "技巧分享",
  models: "大模型评测",
  tools: "工具",
  editors: "AI 编辑器",
  team: "团队分享",
  dingtalk: "钉钉文档",
  problems: "问题与方案",
};

export default async function KbItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getContentById(id);

  if (!item) {
    return (
      <main className="py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-4">内容不存在</h1>
          <BackButton fallbackHref="/kb" className="text-primary hover:underline" />
        </div>
      </main>
    );
  }

  const typeLabel = TYPE_LABELS[item.type] ?? item.type;

  return (
    <main className="py-8">
      <ViewTracker contentId={id} />
      <div className="max-w-2xl mx-auto">
        <BackButton
          fallbackHref="/kb"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-primary mb-6"
        />

        <article className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 mb-4">
            {typeLabel}
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6 items-center">
            {item.author && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {item.author}
              </span>
            )}
            <LikeButton contentId={id} initialCount={item.likeCount ?? 0} />
            {item.shareDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {item.shareDate}
              </span>
            )}
            {item.shareEvent && (
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {item.shareEvent}
              </span>
            )}
          </div>

          {(item.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {item.summary}
            </p>
          </div>

          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              <ExternalLink className="w-4 h-4" />
              查看原文
            </a>
          )}

          {item.internalHref && (
            <Link
              href={item.internalHref}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              <FileText className="w-4 h-4" />
              查看完整文档
            </Link>
          )}
        </article>
      </div>
    </main>
  );
}
