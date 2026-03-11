"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function InstallCommand({
  command,
  label = "复制",
}: {
  command: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 pr-24 overflow-x-auto text-sm font-mono">
        <code>{command}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            已复制
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            {label}
          </>
        )}
      </button>
    </div>
  );
}
