import Link from "next/link";
import { User, Eye, ThumbsUp, Clock, ExternalLink } from "lucide-react";
import type { ContentItem } from "@/types/content";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}-${d.getDate()} 更新`;
}

export default function ArticleCard({ item }: { item: ContentItem }) {
  const isExternal = item.sourceType === "dingtalk" || !!item.externalUrl;
  const href = isExternal && item.externalUrl ? item.externalUrl : "#";
  const isLink = !!href && href !== "#";

  const content = (
    <>
      <span
        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
          isExternal ? "bg-blue-50 text-dingtalk" : "bg-sky-50 text-sky-700"
        }`}
      >
        {isExternal ? "钉钉文档" : (item.tags?.[0] ?? "研发技巧")}
      </span>
      <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
        {item.title}
        {isExternal && <ExternalLink className="w-3.5 h-3.5 text-slate-400" />}
      </h3>
      <div className="flex items-center gap-3 text-sm text-slate-500 mt-4 mb-2 flex-wrap">
        {item.author && (
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {item.author}
          </span>
        )}
        {item.viewCount != null && (
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {item.viewCount}
          </span>
        )}
        {item.likeCount != null && (
          <span className="flex items-center gap-1 text-red-500">
            <ThumbsUp className="w-3.5 h-3.5" />
            {item.likeCount}
          </span>
        )}
        {item.updatedAt && (
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {formatDate(item.updatedAt)}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600">{item.summary}</p>
    </>
  );

  const cardClass = `block bg-white rounded-card p-5 border border-cardBorder hover:border-slate-300 hover:shadow-lg transition-all text-inherit no-underline ${
    isExternal ? "border-l-4 border-l-dingtalk" : ""
  }`;

  if (isLink) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {content}
      </a>
    );
  }

  if (item.internalHref) {
    return (
      <Link href={item.internalHref} className={cardClass}>
        {content}
      </Link>
    );
  }

  return (
    <Link href={`/kb/item/${item.id}`} className={cardClass}>
      {content}
    </Link>
  );
}
