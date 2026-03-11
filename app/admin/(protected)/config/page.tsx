"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  Layout,
  Zap,
  BookOpen,
  Star,
  FileText,
  Megaphone,
  HelpCircle,
} from "lucide-react";

const CONFIG_CARDS = [
  {
    key: "site",
    title: "站点配置",
    description: "网站名称、Logo、页脚、社交链接",
    icon: Settings,
    href: "/admin/config/site",
  },
  {
    key: "home",
    title: "首页",
    description: "主标题、副标题、效率翻倍口号",
    icon: Layout,
    href: "/admin/config/home",
  },
  {
    key: "role-entry",
    title: "岗位入口",
    description: "研发、测试、产品、UI设计 入口配置",
    icon: Zap,
    href: "/admin/config/role-entry",
  },
  {
    key: "kb-entry",
    title: "研发AI知识库",
    description: "首页研发AI知识库区域标题与描述",
    icon: BookOpen,
    href: "/admin/config/kb-entry",
  },
  {
    key: "hot-tags",
    title: "热门标签",
    description: "侧边栏热门标签展示配置",
    icon: Star,
    href: "/admin/config/hot-tags",
  },
  {
    key: "new-features",
    title: "新功能公告",
    description: "新功能上线、更新日志",
    icon: Megaphone,
    href: "/admin/config/new-features",
  },
  {
    key: "ai-qa",
    title: "AI 问答精选",
    description: "首页 AI 问答精选区域，问题列表与链接配置",
    icon: HelpCircle,
    href: "/admin/config/ai-qa",
  },
  {
    key: "about",
    title: "关于",
    description: "关于我们、项目介绍",
    icon: FileText,
    href: "/admin/config/about",
  },
];

export default function ConfigPage() {
  return (
    <main className="py-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin"
          className="text-slate-600 hover:text-primary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回管理后台
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">后台管理</h1>
      <p className="text-slate-500 mb-8">
        选择配置模块进行编辑，保存后前台将立即更新
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CONFIG_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.key} href={card.href}>
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-md cursor-pointer transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{card.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
