import Link from "next/link";
import { HelpCircle, MessageSquare } from "lucide-react";
import type { AiQaConfig, AiQaItem } from "@/types/ai-qa-config";

function resolveItemHref(item: AiQaItem, defaultHref: string): string {
  if (item.href) return item.href;
  if (item.contentId) return `/kb/item/${item.contentId}`;
  if (item.docSlug) return `/doc/${item.docSlug}`;
  return defaultHref;
}

interface AiQaSectionProps {
  config: AiQaConfig;
  isLoggedIn?: boolean;
}

export default function AiQaSection({ config, isLoggedIn = false }: AiQaSectionProps) {
  const sortedItems = [...(config.items ?? [])].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          {config.title}
        </h3>
        {isLoggedIn && (
          <Link
            href={config.ctaHref}
            className="text-sm px-3 py-1.5 rounded-lg border border-primary text-primary font-medium hover:bg-blue-50 transition-colors"
          >
            {config.ctaText}
          </Link>
        )}
      </div>
      <div className="space-y-4">
        {sortedItems.map((item, i) => (
          <Link
            key={item.id ?? i}
            href={resolveItemHref(item, config.ctaHref)}
            className="block hover:text-primary transition-colors border-b border-slate-100 pb-3 last:border-0"
          >
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-slate-500 flex justify-between mt-1">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {item.answerCount} 个回答
              </span>
              <span>{item.daysAgo} 天前</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
