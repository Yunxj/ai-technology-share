import { Code2 } from "lucide-react";
import type { ContentItem } from "@/types/content";

export default function EditorCard({ item }: { item: ContentItem }) {
  return (
    <div className="bg-white rounded-card p-5 border border-cardBorder hover:border-slate-300 hover:shadow-lg transition-all">
      <div className="font-bold text-base mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
          <Code2 className="w-4 h-4" />
        </span>
        {item.title}
      </div>
      <p className="text-sm text-slate-600 mb-3">{item.summary}</p>
      <div className="flex flex-wrap gap-2">
        {(item.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
