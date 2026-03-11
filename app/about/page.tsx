import { Bot } from "lucide-react";
import { getAboutConfig } from "@/lib/config";

export default async function AboutPage() {
  const aboutConfig = await getAboutConfig();
  const title = aboutConfig.title ?? "关于 AI 提效工坊";
  const paragraphs = aboutConfig.paragraphs ?? [
    "AI 提效工坊是公司内部 AI 运用场景技术分享网站，一期聚焦研发 AI 内容。",
    "我们提供知识库、全局搜索、钉钉文档跳转、管理后台和 AI 智能录入等功能，帮助研发同学更好地利用 AI 工具提升工作效率。",
    "欢迎分享你的 AI 技巧与工具，让 AI 落地每个岗位。",
  ];

  return (
    <main className="py-12 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primaryPurple flex items-center justify-center text-white">
          <Bot className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      </div>
      <div className="prose prose-slate max-w-none">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-slate-600 leading-relaxed mt-4 first:mt-0">
            {p}
          </p>
        ))}
      </div>
    </main>
  );
}
