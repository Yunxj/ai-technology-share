import Link from "next/link";
import {
  Code2,
  Lightbulb,
  BarChart3,
  Users,
  ArrowRight,
  Zap,
} from "lucide-react";
import { getAllContent, getContent } from "@/lib/data";
import { getSiteConfig, getHotTagsConfig } from "@/lib/config";
import ArticleCard from "@/components/ArticleCard";
import EditorCard from "@/components/EditorCard";
import ShareCard from "@/components/ShareCard";
import DataChart from "@/components/DataChart";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default async function DevPage() {
  const [allContent, tips, dingtalk, team, editors, siteConfig, hotTagsConfig] =
    await Promise.all([
      getAllContent(),
      getContent("tips"),
      getContent("dingtalk"),
      getContent("team"),
      getContent("editors"),
      getSiteConfig(),
      getHotTagsConfig(),
    ]);

  const typeCounts = ["tips", "models", "tools", "editors", "team", "dingtalk", "problems"].map((type) => ({
    type,
    count: allContent.filter((c) => c.type === type).length,
  }));
  const totalViews = allContent.reduce((s, c) => s + (c.viewCount ?? 0), 0);
  const totalLikes = allContent.reduce((s, c) => s + (c.likeCount ?? 0), 0);

  const tipsWithDingtalk = [...tips, ...dingtalk].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const tipCards = tipsWithDingtalk.slice(0, 4);
  const editorItems = editors.slice(0, 4);
  const teamShares = team.slice(0, 3);

  return (
    <main>
      <section className="bg-gradient-to-br from-[#0b1e33] to-[#1e2b47] rounded-3xl p-10 md:p-12 my-8 text-white flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold leading-tight max-w-xl">
            研发{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              AI提效
            </span>{" "}
            专场
          </h1>
          <p className="text-blue-200 mt-3 text-lg max-w-md">
            开发过程提效、项目成果、团队成员使用情况 — 让AI成为你的日常开发伙伴
          </p>
        </div>
        <div className="bg-white/5 rounded-full px-6 py-4 border border-white/10 backdrop-blur flex items-center gap-2 text-2xl font-semibold">
          <Zap className="w-8 h-8 text-amber-400" />
          效率翻倍
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 my-6">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              开发过程提效
            </h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-800">热门研发技巧</h3>
                  <Link href="/kb?cat=tips" className="text-primary text-sm font-medium">
                    查看全部 →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tipCards.map((item) => (
                    <ArticleCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-800">AI 编辑器使用技巧</h3>
                  <Link href="/kb?cat=editors" className="text-primary text-sm font-medium">
                    查看全部 →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editorItems.map((item) => (
                    <EditorCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              项目成果
            </h2>
            <DataChart
              stats={typeCounts}
              totalViews={totalViews}
              totalLikes={totalLikes}
            />
            <p className="text-sm text-slate-500 mt-4">
              知识库内容数量、浏览量、点赞数等数据概览，持续更新中
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-primaryPurple" />
              团队成员使用情况
            </h2>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-800">团队 AI 建设</h3>
              <Link href="/kb?cat=team" className="text-primary text-sm font-medium">
                查看全部 →
              </Link>
            </div>
            <div className="space-y-3">
              {teamShares.map((item) => (
                <ShareCard key={item.id} item={item} />
              ))}
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
