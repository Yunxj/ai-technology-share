import Link from "next/link";
import {
  Code2,
  TestTube,
  TrendingUp,
  Paintbrush,
  BookOpen,
  ArrowRight,
  Zap,
  Users,
  Lightbulb,
  Layout,
} from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import LiveTipCards from "@/components/LiveTipCards";
import EditorCard from "@/components/EditorCard";
import ShareCard from "@/components/ShareCard";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import DataChart from "@/components/DataChart";
import DesignFidelitySection from "@/components/DesignFidelitySection";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import AiQaSection from "@/components/AiQaSection";
import OpenClawShowcaseSection from "@/components/OpenClawShowcaseSection";
import ActiveContributors from "@/components/ActiveContributors";
import RdDynamicsSection from "@/components/RdDynamicsSection";
import type { ContentItem } from "@/types/content";
import type {
  SiteConfig,
  HomeConfig,
  RoleEntryConfig,
  KbEntryConfig,
} from "@/types/config";
import type { DesignFidelityConfig } from "@/types/design-fidelity-config";
import type { RoadmapConfig } from "@/types/roadmap-config";
import type { AiQaConfig } from "@/types/ai-qa-config";
import type { ContributorsConfig } from "@/types/contributors-config";
import type { RdDynamicsConfig } from "@/types/rd-dynamics-config";
import type { OpenClawShowcaseConfig } from "@/types/open-claw-showcase-config";

const EDITORS = ["Cursor", "Claude Code", "Open Code", "Kiro", "Ollama", "Continue"];

const AI_TIPS = [
  { title: "提示词中加入\"让我们一步步思考\"", desc: "复杂任务推理能力提升30%" },
  { title: "用ollama本地跑Qwen，配合continue.dev", desc: "免费且隐私安全的IDE插件" },
  { title: "为代码库建立RAG索引", desc: "结合LlamaIndex快速问答遗留代码" },
];

const ROLE_ICONS = {
  dev: Code2,
  frontend: Layout,
  test: TestTube,
  product: TrendingUp,
  ui: Paintbrush,
} as const;

interface HomeContentProps {
  allContent?: ContentItem[];
  team: ContentItem[];
  editors: ContentItem[];
  tipsWithDingtalk: ContentItem[];
  typeCounts: { type: string; count: number }[];
  totalViews: number;
  totalLikes: number;
  totalArticles?: number;
  contributorCount?: number;
  siteConfig?: SiteConfig | null;
  homeConfig?: HomeConfig | null;
  roleEntryConfig?: RoleEntryConfig | null;
  kbEntryConfig?: KbEntryConfig | null;
  designFidelityConfig?: DesignFidelityConfig | null;
  roadmapConfig?: RoadmapConfig | null;
  aiQaConfig?: AiQaConfig | null;
  contributorsConfig?: ContributorsConfig | null;
  rdDynamicsConfig?: RdDynamicsConfig | null;
  openClawShowcaseConfig?: OpenClawShowcaseConfig | null;
  isLoggedIn?: boolean;
}

const ENTRY_LIMITS = {
  team: 1,
  editors: 2,
  tips: 2,
} as const;

export default function HomeContent({
  allContent,
  team,
  editors,
  tipsWithDingtalk,
  typeCounts,
  totalViews,
  totalLikes,
  totalArticles = 0,
  contributorCount = 0,
  siteConfig,
  homeConfig,
  roleEntryConfig,
  kbEntryConfig,
  designFidelityConfig,
  roadmapConfig,
  aiQaConfig,
  contributorsConfig,
  rdDynamicsConfig,
  openClawShowcaseConfig,
  isLoggedIn = false,
}: HomeContentProps) {
  const teamShares = team.slice(0, ENTRY_LIMITS.team);
  const editorItems = editors.slice(0, ENTRY_LIMITS.editors);
  const tipCards = tipsWithDingtalk.slice(0, ENTRY_LIMITS.tips);
  const kbCards = tipsWithDingtalk.slice(2, 4);

  const home = homeConfig ?? {
    mainTitleHighlight: "AI提效",
    mainTitleSuffix: "工坊",
    subtitle: "内部 AI 运用场景技术分享 — 研发技巧、知识库、团队建设",
    slogan: "效率翻倍",
  };
  const roles = roleEntryConfig?.roles ?? [
    { id: "dev", label: "研发", href: "/dev", enabled: true, badge: "热门·提效" },
    { id: "test", label: "测试", href: "#", enabled: false, badge: "二期 筹备中" },
    { id: "product", label: "产品", href: "#", enabled: false, badge: "二期 筹备中" },
    { id: "ui", label: "UI设计", href: "#", enabled: false, badge: "二期 筹备中" },
  ];
  const kbEntry = kbEntryConfig ?? {
    title: "研发AI知识库",
    description: "研发技巧、大模型评测、工具推荐、钉钉文档 — 管理后台录入，支持持续更新",
    linkText: "进入知识库",
  };

  return (
    <main>
      {/* 1. Hero + 视频 一行展示 */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 rounded-3xl p-10 md:p-12 my-8 text-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-sky-200/30 to-teal-200/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight max-w-xl">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {home.mainTitleHighlight}
              </span>
              {home.mainTitleSuffix}
            </h1>
            <p className="text-slate-600 mt-3 text-lg max-w-md leading-relaxed">{home.subtitle}</p>
            <div className="mt-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl px-8 py-5 shadow-lg shadow-blue-500/25 inline-flex items-center gap-3 text-white">
              <Zap className="w-9 h-9" />
              <span className="text-2xl font-semibold">{home.slogan}</span>
            </div>
          </div>
          <div className="relative z-10 w-full lg:w-[420px] flex-shrink-0">
            <div className="rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl shadow-slate-200/60 bg-slate-900">
              <video
                src="/video/ai-demo.mp4"
                className="w-full aspect-video object-cover"
                controls
                playsInline
              >
                您的浏览器不支持视频播放
              </video>
            </div>
            <p className="text-sm text-slate-500 mt-2 text-center">Web 端 AI 自动化开发演示</p>
          </div>
        </div>
      </section>

      <div className="my-8">
        <DataChart
          stats={typeCounts}
          totalViews={totalViews}
          totalLikes={totalLikes}
          totalArticles={totalArticles}
          contributorCount={contributorCount}
        />
      </div>

      <div className="flex flex-wrap gap-5 justify-center my-10">
        {roles.map((role) => {
          const Icon =
            (role.id in ROLE_ICONS ? ROLE_ICONS[role.id as keyof typeof ROLE_ICONS] : null) ?? Code2;
          const cardClass = role.enabled
            ? "flex-1 min-w-[140px] bg-white rounded-3xl p-5 text-center shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:border-blue-200 border border-slate-100 transition-all"
            : "flex-1 min-w-[140px] bg-white rounded-3xl p-5 text-center shadow opacity-70 pointer-events-none border border-slate-100";
          const content = (
            <>
              <Icon
                className={`w-10 h-10 mx-auto mb-3 ${
                  role.enabled ? "text-primary" : "text-slate-400"
                }`}
              />
              <h3 className="font-semibold text-lg">{role.label}</h3>
              <span
                className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full ${
                  role.enabled ? "bg-blue-100 text-primary" : "bg-slate-100 text-slate-500"
                }`}
              >
                {role.badge}
              </span>
            </>
          );
          return role.enabled ? (
            <Link key={role.id} href={role.href} className={cardClass}>
              {content}
            </Link>
          ) : (
            <div key={role.id} className={cardClass}>
              {content}
            </div>
          );
        })}
      </div>

      {/* 团队AI建设 · 难点攻关【MasterGo 设计稿前端还原度】 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-primaryPurple" />
            团队AI建设 · 难点攻关【MasterGo 设计稿前端还原度】
          </h2>
          <Link href="/dev" className="text-primary text-sm font-medium">
            进入研发AI →
          </Link>
        </div>
        {designFidelityConfig && (
          <DesignFidelitySection config={designFidelityConfig} />
        )}
        <div className="mt-6 space-y-4">
          {teamShares.map((item) => (
            <ShareCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 my-8">
        <div className="lg:col-span-2 space-y-6">
          {/* 1. 热门分享 */}
          <LiveTipCards initialTipCards={tipCards} />

          {/* 2. 研发AI知识库 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                {kbEntry.title}
              </h2>
              <Link href="/kb" className="text-primary text-sm font-medium flex items-center gap-1">
                {kbEntry.linkText} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kbCards.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* 2.5 Open Claw 部署与养虾应用 */}
          {openClawShowcaseConfig && (
            <OpenClawShowcaseSection config={openClawShowcaseConfig} />
          )}

          {/* 3. AI 编辑器 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                AI 编辑器
              </h2>
              <Link href="/dev" className="text-primary text-sm font-medium">
                进入研发AI →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EDITORS.map((name) => (
                <div
                  key={name}
                  className="bg-slate-50 rounded-2xl p-3 text-center text-sm font-medium border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  {name}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">AI 编辑器使用技巧，点击进入详情</p>
          </div>

          {/* 4. AI使用技巧·速递（合并 EditorCard + 速递列表） */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                AI使用技巧·速递
              </h2>
              <Link href="/dev" className="text-primary text-sm font-medium">
                进入研发AI →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {editorItems.map((item) => (
                <EditorCard key={item.id} item={item} />
              ))}
            </div>
            <ul className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {AI_TIPS.map((tip, i) => (
                <li
                  key={i}
                  className="flex gap-3 py-3.5 px-4 border-b border-slate-100 last:border-0"
                >
                  <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-sm">{tip.title}</span>
                    <span className="block text-xs text-slate-500 mt-1">{tip.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. AI 问答精选 */}
          {aiQaConfig && (
            <AiQaSection config={aiQaConfig} isLoggedIn={isLoggedIn} />
          )}
        </div>

        <div className="space-y-7">
          {rdDynamicsConfig && (
            <RdDynamicsSection config={rdDynamicsConfig} />
          )}
          {roadmapConfig && (
            <RoadmapTimeline config={roadmapConfig} />
          )}
          {contributorsConfig && (
            <ActiveContributors config={contributorsConfig} allContent={allContent} />
          )}
          <Sidebar />
        </div>
      </div>

      <Footer config={siteConfig} />
    </main>
  );
}
