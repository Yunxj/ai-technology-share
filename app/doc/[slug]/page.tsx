import { promises as fs } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import BackButton from "@/components/BackButton";
import ViewTracker from "@/components/ViewTracker";
import LikeButton from "@/components/LikeButton";
import { getContentByInternalHref } from "@/lib/data";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const SLUG_TO_FILE: Record<string, string> = {
  "ai-drive-rd-efficiency": "AI驱动研发效能升级.md",
  "llm-multimodal-ranking": "大模型多模态能力综合排名.md",
  "ai-tool-practice-migration": "AI工具实践与迁移评审.md",
  "ai-dialogue-prompt": "提升AI对话效果-资料齐全与Prompt技巧.md",
  "plan-mode-requirement-split": "需求开发先规划-功能拆分与Plan模式.md",
};

const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-2xl font-bold text-slate-900 pb-3 mb-4 border-b-2 border-primary scroll-mt-24"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-xl font-semibold text-slate-900 mt-8 mb-3 pl-4 border-l-4 border-primary scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-lg font-semibold text-slate-800 mt-6 mb-2 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  hr: () => (
    <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-2 hover:underline-offset-4 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="not-italic pl-4 py-2 pr-4 my-4 border-l-4 border-primary bg-slate-50 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-4 pl-6 list-disc space-y-1 text-slate-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 pl-6 list-decimal space-y-1 text-slate-700" {...props}>
      {children}
    </ol>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200">
      <table
        className="min-w-full divide-y divide-slate-200 [&_thead]:bg-slate-50 [&_tbody_tr:nth-child(even)]:bg-slate-50/50"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-slate-900 [&_th]:border-b [&_th]:border-slate-200" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-slate-200 [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-slate-700" {...props}>
      {children}
    </tbody>
  ),
};

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filename = SLUG_TO_FILE[slug];

  if (!filename) {
    return (
      <main className="py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-4">文档不存在</h1>
          <BackButton fallbackHref="/kb" className="text-primary hover:underline" />
        </div>
      </main>
    );
  }

  const docPath = path.join(process.cwd(), "doc", filename);
  let content = "";

  try {
    content = await fs.readFile(docPath, "utf-8");
  } catch {
    return (
      <main className="py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-4">文档读取失败</h1>
          <BackButton fallbackHref="/kb" className="text-primary hover:underline" />
        </div>
      </main>
    );
  }

  const docContent = await getContentByInternalHref(`/doc/${slug}`);

  return (
    <main className="py-8">
      {docContent && <ViewTracker contentId={docContent.id} />}
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 px-4 py-2 rounded-lg bg-white/80 border border-slate-100 flex items-center justify-between gap-4">
          <BackButton
            fallbackHref="/kb"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
          />
          {docContent && (
            <LikeButton contentId={docContent.id} initialCount={docContent.likeCount ?? 0} />
          )}
        </div>

        <article className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-24">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
