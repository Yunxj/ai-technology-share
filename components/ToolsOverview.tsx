import type {
  SkillItem,
  RuleItem,
  PromptItem,
} from "@/types/frontend-config";

interface ToolsOverviewProps {
  relationship: {
    skills: { label: string; trigger: string; mode: string };
    rules: { label: string; trigger: string; mode: string };
    prompts: { label: string; trigger: string; mode: string };
  };
  skills: SkillItem[];
  rules: RuleItem[];
  prompts: PromptItem[];
}

export default function ToolsOverview({
  relationship,
  skills,
  rules,
  prompts,
}: ToolsOverviewProps) {
  return (
    <div className="space-y-8">
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-4">三者关系</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="font-medium text-primary text-sm">Skills</p>
            <p className="text-slate-700 mt-1">{relationship.skills.label}</p>
            <p className="text-xs text-slate-500 mt-1">{relationship.skills.trigger} · {relationship.skills.mode}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="font-medium text-primary text-sm">Rules</p>
            <p className="text-slate-700 mt-1">{relationship.rules.label}</p>
            <p className="text-xs text-slate-500 mt-1">{relationship.rules.trigger} · {relationship.rules.mode}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="font-medium text-primary text-sm">Prompts</p>
            <p className="text-slate-700 mt-1">{relationship.prompts.label}</p>
            <p className="text-xs text-slate-500 mt-1">{relationship.prompts.trigger} · {relationship.prompts.mode}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Skills — 项目领域知识</h4>
        <div className="space-y-2">
          {skills.map((s) => (
            <div key={s.id} className="flex gap-4 py-2 border-b border-slate-100 last:border-0">
              <span className="font-mono text-xs text-primary min-w-[140px]">{s.id}</span>
              <span className="text-slate-500 text-sm">→ {s.project}</span>
              <span className="text-slate-600 text-sm flex-1">{s.content}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Rules — 编码规则</h4>
        <div className="space-y-2">
          {rules.map((r) => (
            <div key={r.id} className="flex gap-4 py-2 border-b border-slate-100 last:border-0">
              <span className="font-mono text-xs text-primary min-w-[160px]">{r.id}.mdc</span>
              <span className="text-slate-500 text-xs">{r.globs}</span>
              <span className="text-slate-600 text-sm flex-1">{r.content}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Prompts — 任务模板</h4>
        <div className="space-y-2">
          {prompts.map((p) => (
            <div key={p.id} className="flex gap-4 py-2 border-b border-slate-100 last:border-0 items-start">
              <span className="font-mono text-xs text-primary min-w-[120px]">{p.id}.md</span>
              <span className="font-medium text-slate-800 min-w-[100px]">{p.name}</span>
              <span className="text-slate-500 text-xs">步骤 {p.step}</span>
              <span className="text-slate-600 text-sm flex-1">{p.usage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
