import { getOpenClawShowcaseConfig } from "@/lib/config";
import BackButton from "@/components/BackButton";
import {
  User,
  ExternalLink,
  Bot,
  CheckCircle2,
  MapPin,
  BookOpen,
  Search,
} from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  计划中: "bg-slate-100 text-slate-600 border-slate-200",
  进行中: "bg-amber-100 text-amber-700 border-amber-200",
  已完成: "bg-green-100 text-green-700 border-green-200",
};

export default async function OpenClawToolPage() {
  const config = await getOpenClawShowcaseConfig();

  if (!config) {
    return (
      <main className="py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-4">内容不存在</h1>
          <BackButton fallbackHref="/kb?cat=tools" className="text-primary hover:underline" />
        </div>
      </main>
    );
  }

  const badgeClass = STATUS_STYLES[config.status] ?? STATUS_STYLES["进行中"];

  return (
    <main className="py-8">
      <div className="max-w-[52rem] mx-auto">
        <BackButton
          fallbackHref="/kb?cat=tools"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-primary mb-6"
        />

        <article className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 mb-4">
              工具
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{config.title}</h1>
            {config.subtitle && (
              <p className="text-slate-600 text-sm mb-3">{config.subtitle}</p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {config.author && (
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <User className="w-4 h-4" />
                  作者：{config.author}
                </span>
              )}
              <span
                className={`text-xs px-2 py-1 rounded-full border shrink-0 ${badgeClass}`}
              >
                {config.status}
              </span>
            </div>
          </div>

          {config.description && (
            <div className="rounded-xl p-4 bg-slate-50/50 border border-slate-100">
              <p className="text-slate-600 leading-relaxed">{config.description}</p>
            </div>
          )}

          {config.currentFeatures && config.currentFeatures.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                当前已有功能
              </h2>
              <ul className="space-y-2">
                {config.currentFeatures.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-slate-700 pl-4 border-l-2 border-slate-200"
                  >
                    · {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {config.futurePlan && config.futurePlan.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                未来规划
              </h2>
              <ul className="space-y-2">
                {config.futurePlan.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-slate-700 pl-4 border-l-2 border-primary/30"
                  >
                    · {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {config.openClawDocs && config.openClawDocs.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Open Claw 文档
              </h2>
              <div className="space-y-2">
                {config.openClawDocs.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-slate-100 hover:border-primary/40 hover:bg-sky-50/50 transition-colors"
                  >
                    <span className="font-medium text-slate-800">{doc.title}</span>
                    <ExternalLink className="w-4 h-4 flex-shrink-0 text-slate-400" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {config.shrimpGuide && config.shrimpGuide.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                养虾指南
              </h2>
              <div className="space-y-2">
                {config.shrimpGuide.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50/50"
                  >
                    {item.url && item.url !== "#" ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-800 hover:text-primary flex items-center gap-1"
                      >
                        {item.title}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="font-medium text-slate-800">{item.title}</span>
                    )}
                    {item.description && (
                      <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {config.relatedMaterials && config.relatedMaterials.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                联网搜索相关资料
              </h2>
              <div className="space-y-2">
                {config.relatedMaterials.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 flex-wrap p-3 rounded-lg border border-slate-100 hover:border-primary/40 hover:bg-sky-50/50 transition-colors"
                  >
                    <span className="font-medium text-slate-800">{item.title}</span>
                    {item.source && (
                      <span className="text-xs text-slate-500">{item.source}</span>
                    )}
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
