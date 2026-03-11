import Link from "next/link";
import { Calendar, FileText, ExternalLink } from "lucide-react";
import type { ContentItem } from "@/types/content";

export default function ShareCard({ item }: { item: ContentItem }) {
  const isExternal = item.sourceType === "dingtalk" || !!item.externalUrl;
  const initial = item.author?.[0] ?? "分";

  const content = (
    <>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
          isExternal ? "bg-dingtalk" : "bg-gradient-to-br from-primary to-primaryPurple"
        }`}
      >
        {isExternal ? <FileText className="w-5 h-5" /> : initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {item.shareDate && `${item.shareDate} · `}
          {item.shareEvent ?? "分享"}
        </div>
        <div className="font-semibold text-base mb-1 flex items-center gap-2">
          {item.title}
          {isExternal && <ExternalLink className="w-3.5 h-3.5 text-slate-400" />}
        </div>
        <p className="text-sm text-slate-600">{item.summary}</p>
      </div>
    </>
  );

  const cardClass = `flex items-start gap-4 bg-white rounded-2xl p-4 mb-3 border border-cardBorder hover:border-slate-300 transition-all ${
    isExternal ? "border-l-4 border-l-dingtalk" : ""
  }`;

  if (isExternal && item.externalUrl) {
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

  return <div className={cardClass}>{content}</div>;
}
