import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";
import type { OpenClawShowcaseConfig } from "@/types/open-claw-showcase-config";

const STATUS_STYLES: Record<string, string> = {
  计划中: "bg-slate-100 text-slate-600 border-slate-200",
  进行中: "bg-amber-100 text-amber-700 border-amber-200",
  已完成: "bg-green-100 text-green-700 border-green-200",
};

interface OpenClawShowcaseSectionProps {
  config: OpenClawShowcaseConfig;
}

export default function OpenClawShowcaseSection({ config }: OpenClawShowcaseSectionProps) {
  const badgeClass = STATUS_STYLES[config.status] ?? STATUS_STYLES["进行中"];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          {config.title}
        </h2>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full border shrink-0 ${badgeClass}`}
          >
            {config.status}
          </span>
          <Link
            href={config.ctaHref}
            className="text-sm px-3 py-1.5 rounded-lg border border-primary text-primary font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-1"
          >
            {config.ctaText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      {config.subtitle && (
        <p className="text-slate-600 text-sm mb-2">{config.subtitle}</p>
      )}
      {config.description && (
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {config.description}
        </p>
      )}
      <div className="space-y-4">
        {config.primaryFeatures && config.primaryFeatures.length > 0 && (
          <div className="rounded-xl p-3 border border-slate-100 bg-slate-50/50">
            <h4 className="text-xs font-semibold text-slate-600 mb-2">初级功能</h4>
            <ul className="flex flex-wrap gap-2">
              {config.primaryFeatures.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-700 px-2.5 py-1 rounded-lg bg-white border border-slate-100"
                >
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {config.advancedUsage && (
          <div className="rounded-xl p-3 border border-slate-100 bg-slate-50/50">
            <h4 className="text-xs font-semibold text-slate-600 mb-2">高级用法</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {config.advancedUsage}
            </p>
          </div>
        )}
        {config.skillsExample && (
          <div className="rounded-xl p-3 border border-slate-100 bg-slate-50/50">
            <h4 className="text-xs font-semibold text-slate-600 mb-2">
              {config.skillsExample.label}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {config.skillsExample.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
