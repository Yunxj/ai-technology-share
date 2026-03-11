import Link from "next/link";
import type { ContentItem } from "@/types/content";

const BADGE_MAP: Record<string, string> = {
  免费商用: "bg-green-100 text-green-800",
  中文强: "bg-green-100 text-green-800",
  轻量: "bg-green-100 text-green-800",
  国产: "bg-green-100 text-green-800",
};

export default function ModelCard({ item }: { item: ContentItem }) {
  const tags = item.tags ?? [];
  const firstTag = tags[0];
  const restTags = tags.slice(1, 4);

  const content = (
    <>
      <div className="font-bold text-base mb-2 flex items-center gap-2">
        {item.title}
        {firstTag && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              BADGE_MAP[firstTag] ?? "bg-green-100 text-green-800"
            }`}
          >
            {firstTag}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 my-2">
        {restTags.slice(0, 2).map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-800"
          >
            {t}
          </span>
        ))}
        {restTags[2] && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-800">
            {restTags[2]}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 my-3">{item.summary}</p>
      <span className="text-sm text-primary font-medium">查看详情 ›</span>
    </>
  );

  const cardClass =
    "block bg-white rounded-card p-4 border border-cardBorder shadow-sm hover:border-slate-300 hover:shadow-lg transition-all text-inherit no-underline";

  if (item.externalUrl) {
    return (
      <a
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
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
