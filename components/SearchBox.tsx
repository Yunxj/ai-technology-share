"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBox({
  size = "normal",
  defaultValue = "",
}: {
  size?: "normal" | "large";
  defaultValue?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const isLarge = size === "large";
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 bg-white rounded-full border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
        isLarge ? "p-3 px-5 w-full max-w-md" : "p-2 px-4"
      }`}
    >
      <Search className={`text-slate-400 flex-shrink-0 ${isLarge ? "w-5 h-5" : "w-4 h-4"}`} />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="全局搜索模型、工具、文档..."
        className={`flex-1 bg-transparent border-none outline-none placeholder:text-slate-400 ${
          isLarge ? "text-base" : "text-sm"
        }`}
      />
    </form>
  );
}
