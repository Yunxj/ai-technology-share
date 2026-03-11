import Link from "next/link";
import {
  Zap,
  Workflow,
  BookOpen,
  Wrench,
  FileText,
  Terminal,
  Route,
  Layers,
  ArrowRight,
} from "lucide-react";
import { getFrontendConfig, getSiteConfig, getHotTagsConfig, getDesignFidelityConfig } from "@/lib/config";
import InstallCommand from "@/components/InstallCommand";
import WorkflowSteps from "@/components/WorkflowSteps";
import FrameworkCards from "@/components/FrameworkCards";
import ToolsOverview from "@/components/ToolsOverview";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default async function FrontendPage() {
  const [config, siteConfig, hotTagsConfig, designFidelityConfig] = await Promise.all([
    getFrontendConfig(),
    getSiteConfig(),
    getHotTagsConfig(),
    getDesignFidelityConfig(),
  ]);

  return (
    <main>
      <section className="bg-gradient-to-br from-[#0b1e33] to-[#1e2b47] rounded-3xl p-10 md:p-12 my-8 text-white flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold leading-tight max-w-xl">
            前端{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              AI 开发配置中心
            </span>
          </h1>
          <p className="text-blue-200 mt-3 text-lg max-w-md">
            策略框架、工具体系、7 步 SOP — 一站式提效方案
          </p>
          <p className="text-blue-300/80 text-sm mt-2">
            适用项目：{config.projects.join(" / ")}
          </p>
        </div>
        <div className="bg-white/5 rounded-full px-6 py-4 border border-white/10 backdrop-blur flex items-center gap-2 text-2xl font-semibold">
          <Zap className="w-8 h-8 text-amber-400" />
          v{config.version}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 my-6">
        <div className="lg:col-span-2 space-y-12">
          {/* 推广区 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              痛点 + 案例 + 安装
            </h2>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <h4 className="font-medium text-slate-800 mb-1">痛点</h4>
                <p className="text-slate-600 text-sm">{config.promotion.painPoints}</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                <h4 className="font-medium text-slate-800 mb-1">案例</h4>
                <p className="text-slate-600 text-sm">{config.promotion.case}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">安装</h4>
                <p className="text-slate-600 text-sm mb-2">{config.promotion.installNote}</p>
                <InstallCommand command={config.promotion.installCommand} />
              </div>
              {designFidelityConfig && (
                <Link
                  href="/#design-fidelity"
                  className="block bg-amber-50 rounded-2xl p-5 border border-amber-100 hover:border-amber-200 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-amber-500" />
                      <h4 className="font-medium text-slate-800">MasterGo 设计稿还原度</h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                  </div>
                  <p className="text-slate-600 text-sm mt-2">
                    {designFidelityConfig.subtitle ?? designFidelityConfig.title}
                  </p>
                </Link>
              )}
            </div>
          </section>

          {/* 7 步开发流程 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-primary" />
              7 步开发流程 SOP
            </h2>
            <WorkflowSteps steps={config.workflowSteps} />
          </section>

          {/* 策略框架 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              策略框架（7 章）
            </h2>
            <FrameworkCards chapters={config.frameworkChapters} />
          </section>

          {/* 工具体系 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              工具体系：Skills / Rules / Prompts
            </h2>
            <ToolsOverview
              relationship={config.tools.relationship}
              skills={config.tools.skills}
              rules={config.tools.rules}
              prompts={config.tools.prompts}
            />
          </section>

          {/* 模板与脚本 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              模板与脚本
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">需求归档模板（5 个）</h4>
                <ul className="space-y-1">
                  {config.templates.requirementTemplates.map((t) => (
                    <li key={t.id} className="flex gap-2 text-sm">
                      <span className="font-mono text-primary">{t.name}</span>
                      <span className="text-slate-600">— {t.usage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">组件映射表</h4>
                <p className="text-slate-600 text-sm">{config.templates.componentMapping}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  安装脚本用法
                </h4>
                <div className="space-y-3">
                  {config.scriptUsage.map((item) => (
                    <div key={item.label}>
                      <p className="text-slate-600 text-sm mb-1">{item.label}</p>
                      <InstallCommand command={item.command} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 阅读路线 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Route className="w-5 h-5 text-primaryPurple" />
              阅读路线图
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.readingPaths.map((rp) => (
                <div
                  key={rp.role}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
                >
                  <h4 className="font-semibold text-slate-900">{rp.role}</h4>
                  <p className="text-xs text-slate-500 mt-1">{rp.duration}</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    {rp.docs.map((d) => (
                      <li key={d}>· {d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 多端技术栈速查 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              多端技术栈速查
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700 w-36">项目</th>
                    {config.techStackTable.dimensions.map((d) => (
                      <th key={d} className="text-left py-3 px-4 font-semibold text-slate-700">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.techStackTable.projects.map((proj) => (
                    <tr key={proj.name} className="border-t border-slate-100">
                      <td className="py-3 px-4 font-medium text-slate-800">{proj.name}</td>
                      {proj.values.map((v, i) => (
                        <td key={i} className="py-3 px-4 text-slate-600 text-xs">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div>
          <Sidebar hotTagsConfig={hotTagsConfig} />
        </div>
      </div>

      <Footer config={siteConfig} />
    </main>
  );
}
