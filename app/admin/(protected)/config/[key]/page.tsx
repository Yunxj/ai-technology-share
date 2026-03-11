"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CONFIG_LABELS: Record<string, string> = {
  site: "站点配置",
  home: "首页",
  "role-entry": "岗位入口",
  "kb-entry": "研发AI知识库",
  "hot-tags": "热门标签",
  "new-features": "新功能公告",
  about: "关于",
};

const VALID_KEYS = new Set(Object.keys(CONFIG_LABELS));

export default function ConfigEditPage({
  params,
}: {
  params: { key: string };
}) {
  const { key } = params;
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const label = CONFIG_LABELS[key] ?? key;
  const isValidKey = VALID_KEYS.has(key);

  useEffect(() => {
    if (!isValidKey) {
      setLoading(false);
      setError("未知配置类型");
      return;
    }
    fetch(`/api/config/${key}`)
      .then((res) => res.json())
      .then((data) => {
        setJsonText(JSON.stringify(data, null, 2));
      })
      .catch(() => setError("加载配置失败"))
      .finally(() => setLoading(false));
  }, [key, isValidKey]);

  const handleSave = async () => {
    if (!isValidKey) return;
    setError("");
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      setError("JSON 格式错误，请检查语法");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/config/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "保存失败");
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="py-8">
        <p className="text-slate-500">加载中...</p>
      </main>
    );
  }

  if (!isValidKey) {
    return (
      <main className="py-8">
        <Link
          href="/admin/config"
          className="text-slate-600 hover:text-primary flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回配置列表
        </Link>
        <p className="text-red-500">{error || "该配置暂未开放"}</p>
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/config"
          className="text-slate-600 hover:text-primary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回配置列表
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "保存中..." : "保存"}
        </button>
      </div>

      <h1 className="text-xl font-bold text-slate-900 mb-2">
        编辑: {label}
      </h1>
      <p className="text-sm text-slate-500 mb-4">
        直接编辑 JSON 数据，保存后前台将立即更新
      </p>

      {error && (
        <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 text-sm mb-4 p-3 bg-green-50 rounded-lg">
          保存成功，前台已更新
        </p>
      )}

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="w-full h-[60vh] p-4 font-mono text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        spellCheck={false}
      />
    </main>
  );
}
