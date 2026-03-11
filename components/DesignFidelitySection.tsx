import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Layers, Ruler } from "lucide-react";
import type { DesignFidelityConfig } from "@/types/design-fidelity-config";

interface DesignFidelitySectionProps {
  config: DesignFidelityConfig;
}

export default function DesignFidelitySection({ config }: DesignFidelitySectionProps) {
  return (
    <section id="design-fidelity" className="rounded-2xl p-5 border border-slate-100 bg-slate-50/50 text-slate-800">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-primaryPurple" />
              {config.title}
            </h2>
            {config.subtitle && (
              <p className="text-slate-600 text-sm mt-0.5 max-w-2xl">{config.subtitle}</p>
            )}
          </div>
          <Link
            href={config.ctaHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primaryPurple text-white font-medium text-sm shadow hover:bg-violet-700 transition-all shrink-0"
          >
            {config.ctaText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* 痛点 + PC + 小程序 紧凑行 */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="sm:w-40 shrink-0">
              <h4 className="text-xs font-semibold text-slate-600 mb-1">痛点</h4>
              <ul className="text-slate-600 text-xs leading-relaxed">
                {config.painPoints.map((point, i) => (
                  <li key={i}>· {point}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-white rounded-xl p-3 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-primaryPurple" />
                <h4 className="font-semibold text-slate-800 text-sm">{config.pcPlatform.title}</h4>
                {config.pcPlatform.badge && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">{config.pcPlatform.badge}</span>
                )}
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                {config.pcPlatform.points.slice(0, 3).map((point, i) => (
                  <li key={i} className="flex gap-1.5">→ {point}</li>
                ))}
              </ul>
            </div>
            <div className="sm:w-44 bg-white rounded-xl p-3 border border-slate-100 shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="w-4 h-4 text-slate-400" />
                <h4 className="font-semibold text-slate-800 text-sm">{config.miniprogramPlatform.title}</h4>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">{config.miniprogramPlatform.badge}</span>
              </div>
              <p className="text-xs text-slate-500">{config.miniprogramPlatform.description}</p>
            </div>
          </div>
          {/* Token + 约束 紧凑 */}
          <div className="flex gap-3 lg:w-80 shrink-0">
            <div className="flex-1 bg-white rounded-lg p-2.5 border border-slate-100">
              <h4 className="text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> Token</h4>
              <div className="text-xs text-slate-600 space-y-0.5">
                {config.tokenCategories.slice(0, 2).map((cat) => (
                  <div key={cat.name}><span className="font-medium">{cat.name}</span>：{cat.rule}</div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-white rounded-lg p-2.5 border border-slate-100">
              <h4 className="text-xs font-semibold text-slate-600 mb-1">约束</h4>
              <ul className="text-xs text-slate-600 space-y-0.5">
                {config.constraints.slice(0, 2).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
