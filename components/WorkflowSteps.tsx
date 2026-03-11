import type { WorkflowStep } from "@/types/frontend-config";

export default function WorkflowSteps({
  steps,
}: {
  steps: WorkflowStep[];
}) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700 w-24">步骤</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700 w-28">名称</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">操作人</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">AI 职责</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">人工职责</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">产出</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s) => (
              <tr key={s.step} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 font-medium text-primary">{s.step}</td>
                <td className="py-3 px-4 text-slate-800">{s.name}</td>
                <td className="py-3 px-4 text-slate-600">{s.role}</td>
                <td className="py-3 px-4 text-slate-600 text-xs">{s.aiRole}</td>
                <td className="py-3 px-4 text-slate-600 text-xs">{s.humanRole}</td>
                <td className="py-3 px-4 text-slate-600 font-mono text-xs">{s.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
