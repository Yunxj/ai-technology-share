import { getContent } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import ModelCard from "@/components/ModelCard";
import EditorCard from "@/components/EditorCard";
import ShareCard from "@/components/ShareCard";
import type { ContentType } from "@/types/content";

const CATEGORIES: { id: ContentType; label: string }[] = [
  { id: "tips", label: "技巧分享" },
  { id: "problems", label: "问题与方案" },
  { id: "tools", label: "工具" },
  { id: "editors", label: "AI 编辑器" },
  { id: "models", label: "大模型评测" },
  { id: "team", label: "团队分享" },
  { id: "dingtalk", label: "钉钉文档" },
];

export default async function KbPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const activeCat = (cat as ContentType) ?? "tips";

  const allData = await Promise.all(
    CATEGORIES.map((c) => getContent(c.id))
  );

  const items = allData[CATEGORIES.findIndex((c) => c.id === activeCat)];

  const renderItems = () => {
    if (activeCat === "tips" || activeCat === "dingtalk" || activeCat === "problems") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <ArticleCard key={item.id} item={item} />
          ))}
        </div>
      );
    }
    if (activeCat === "models") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <ModelCard key={item.id} item={item} />
          ))}
        </div>
      );
    }
    if (activeCat === "editors") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <EditorCard key={item.id} item={item} />
          ))}
        </div>
      );
    }
    if (activeCat === "team") {
      return (
        <div className="space-y-3">
          {items.map((item) => (
            <ShareCard key={item.id} item={item} />
          ))}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <ArticleCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">研发AI知识库</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`/kb?cat=${c.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCat === c.id
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c.label}
          </a>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-slate-500">暂无内容</p>
      ) : (
        renderItems()
      )}
    </main>
  );
}
