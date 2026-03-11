import type { FrameworkChapter } from "@/types/frontend-config";

export default function FrameworkCards({
  chapters,
}: {
  chapters: FrameworkChapter[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chapters.map((ch) => (
        <div
          key={ch.id}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
        >
          <span className="text-xs font-medium text-primary">第{ch.id}章</span>
          <h4 className="font-semibold text-slate-900 mt-1">{ch.title}</h4>
          <p className="text-sm text-slate-600 mt-2">{ch.summary}</p>
        </div>
      ))}
    </div>
  );
}
