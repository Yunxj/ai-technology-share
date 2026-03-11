"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit2, Trash2, RefreshCw } from "lucide-react";
import type { AiQaConfig, AiQaItem } from "@/types/ai-qa-config";

const DOC_SLUGS = [
  "ai-drive-rd-efficiency",
  "llm-multimodal-ranking",
  "ai-tool-practice-migration",
  "ai-dialogue-prompt",
  "plan-mode-requirement-split",
];

function resolveItemHref(item: AiQaItem, defaultHref: string): string {
  if (item.href) return item.href;
  if (item.contentId) return `/kb/item/${item.contentId}`;
  if (item.docSlug) return `/doc/${item.docSlug}`;
  return defaultHref;
}

export default function AiQaConfigPage() {
  const [config, setConfig] = useState<AiQaConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AiQaItem | null>(null);
  const [syncing, setSyncing] = useState(false);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-qa");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "加载失败");
      setConfig(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSaveBlock = async (block: {
    title: string;
    ctaText: string;
    ctaHref: string;
    syncSource?: "manual" | "coze" | "doubao";
  }) => {
    if (!config) return;
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/ai-qa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...config,
          title: block.title,
          ctaText: block.ctaText,
          ctaHref: block.ctaHref,
          syncSource: block.syncSource,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "保存失败");
      setConfig(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除该条目？")) return;
    setError("");
    try {
      const res = await fetch(`/api/ai-qa/items/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "删除失败");
      fetchConfig();
    } catch (e) {
      setError(e instanceof Error ? e.message : "删除失败");
    }
  };

  const handleFormSaved = () => {
    setShowForm(false);
    setEditing(null);
    fetchConfig();
  };

  const handleSync = async () => {
    setError("");
    setSyncing(true);
    try {
      const res = await fetch("/api/ai-qa/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "同步失败");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (data.updated > 0) fetchConfig();
    } catch (e) {
      setError(e instanceof Error ? e.message : "同步失败");
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <main className="py-8">
        <p className="text-slate-500">加载中...</p>
      </main>
    );
  }

  if (!config) {
    return (
      <main className="py-8">
        <p className="text-red-500">{error || "加载失败"}</p>
        <Link href="/admin/config" className="text-primary hover:underline mt-4 inline-block">
          返回配置列表
        </Link>
      </main>
    );
  }

  const sortedItems = [...config.items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <main className="py-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/config"
          className="text-slate-600 hover:text-primary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回配置列表
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">AI 问答精选</h1>

      {error && (
        <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm mb-4 p-3 bg-green-50 rounded-lg">
          保存成功，前台已更新
        </p>
      )}

      <div className="space-y-8">
        <BlockConfigForm
          config={config}
          onSave={handleSaveBlock}
          saving={saving}
        />

        <div>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-lg font-semibold text-slate-900">精选问题列表</h2>
            <div className="flex gap-2">
              {config.syncSource && config.syncSource !== "manual" && (
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "同步中..." : "从外部同步"}
                </button>
              )}
              <button
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90"
              >
                <Plus className="w-4 h-4" />
                新增条目
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-4 font-semibold">标题</th>
                  <th className="text-left p-4 font-semibold">回答/天数</th>
                  <th className="text-left p-4 font-semibold">链接</th>
                  <th className="text-left p-4 font-semibold w-28">操作</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 text-slate-600">
                      {item.answerCount} 个回答 · {item.daysAgo} 天前
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">
                      {resolveItemHref(item, config.ctaHref)}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(item);
                          setShowForm(true);
                        }}
                        className="text-primary hover:underline"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sortedItems.length === 0 && (
              <p className="p-8 text-center text-slate-500">暂无条目</p>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <ItemFormModal
          item={editing}
          defaultHref={config.ctaHref}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={handleFormSaved}
        />
      )}
    </main>
  );
}

function BlockConfigForm({
  config,
  onSave,
  saving,
}: {
  config: AiQaConfig;
  onSave: (block: {
    title: string;
    ctaText: string;
    ctaHref: string;
    syncSource?: "manual" | "coze" | "doubao";
  }) => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState(config.title);
  const [ctaText, setCtaText] = useState(config.ctaText);
  const [ctaHref, setCtaHref] = useState(config.ctaHref);
  const [syncSource, setSyncSource] = useState<"manual" | "coze" | "doubao">(
    config.syncSource ?? "manual"
  );

  useEffect(() => {
    setTitle(config.title);
    setCtaText(config.ctaText);
    setCtaHref(config.ctaHref);
    setSyncSource(config.syncSource ?? "manual");
  }, [config.title, config.ctaText, config.ctaHref, config.syncSource]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">区块配置</h2>
      <div className="grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">标题</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">按钮文字</label>
          <input
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">按钮链接（去提问）</label>
          <input
            value={ctaHref}
            onChange={(e) => setCtaHref(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="/kb"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">同步来源</label>
          <select
            value={syncSource}
            onChange={(e) => setSyncSource(e.target.value as "manual" | "coze" | "doubao")}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="manual">手动维护</option>
            <option value="coze">Coze</option>
            <option value="doubao">豆包</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">
            非 manual 时，含 externalId 的条目可通过「从外部同步」更新 answerCount、daysAgo
          </p>
        </div>
        <button
          onClick={() => onSave({ title, ctaText, ctaHref, syncSource })}
          disabled={saving}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 w-fit"
        >
          {saving ? "保存中..." : "保存区块配置"}
        </button>
      </div>
    </div>
  );
}

function ItemFormModal({
  item,
  defaultHref,
  onClose,
  onSaved,
}: {
  item: AiQaItem | null;
  defaultHref: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [answerCount, setAnswerCount] = useState(item?.answerCount ?? 0);
  const [daysAgo, setDaysAgo] = useState(item?.daysAgo ?? 0);
  const [href, setHref] = useState(item?.href ?? "");
  const [contentId, setContentId] = useState(item?.contentId ?? "");
  const [docSlug, setDocSlug] = useState(item?.docSlug ?? "");
  const [externalId, setExternalId] = useState(item?.externalId ?? "");
  const [sortOrder, setSortOrder] = useState(item?.sortOrder ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setAnswerCount(item.answerCount);
      setDaysAgo(item.daysAgo);
      setHref(item.href ?? "");
      setContentId(item.contentId ?? "");
      setDocSlug(item.docSlug ?? "");
      setExternalId(item.externalId ?? "");
      setSortOrder(item.sortOrder ?? 0);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("标题必填");
      return;
    }
    setSaving(true);
    try {
      const payload: Partial<AiQaItem> = {
        title: title.trim(),
        answerCount,
        daysAgo,
        sortOrder,
      };
      if (href) payload.href = href;
      if (contentId) payload.contentId = contentId;
      if (docSlug) payload.docSlug = docSlug;
      if (externalId) payload.externalId = externalId;

      const url = item ? `/api/ai-qa/items/${item.id}` : "/api/ai-qa/items";
      const method = item ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "保存失败");
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">{item ? "编辑条目" : "新增条目"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">标题 *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">回答数</label>
              <input
                type="number"
                min={0}
                value={answerCount}
                onChange={(e) => setAnswerCount(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">天数前</label>
              <input
                type="number"
                min={0}
                value={daysAgo}
                onChange={(e) => setDaysAgo(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">链接（可选，优先级最高）</label>
            <input
              value={href}
              onChange={(e) => setHref(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="/kb/item/xxx 或 /doc/slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ContentItem ID（可选）</label>
            <input
              value={contentId}
              onChange={(e) => setContentId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="对应 /kb/item/{id}"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">文档 Slug（可选）</label>
            <select
              value={docSlug}
              onChange={(e) => setDocSlug(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">— 不关联文档 —</option>
              {DOC_SLUGS.map((s) => (
                <option key={s} value={s}>
                  /doc/{s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">外部 ID（同步用，可选）</label>
            <input
              value={externalId}
              onChange={(e) => setExternalId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Coze/豆包问题 ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">排序（越小越靠前）</label>
            <input
              type="number"
              min={0}
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
