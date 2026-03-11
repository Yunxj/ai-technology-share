import type { HotTagsConfig } from "@/types/config";

export default function Sidebar(_props?: { hotTagsConfig?: HotTagsConfig | null }) {
  return (
    <div>
      <button className="w-full py-3.5 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-indigo-600 shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
        <span>+</span>
        分享你的AI技巧/工具
      </button>
      <p className="text-xs text-slate-400 text-center mt-3">
        采纳后将在首页展示，并获得内部积分
      </p>
    </div>
  );
}
