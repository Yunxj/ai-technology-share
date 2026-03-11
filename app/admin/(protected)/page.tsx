"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Sparkles, Trash2, Edit2 } from "lucide-react";
import type { ContentItem, ContentType } from "@/types/content";

const TYPES: { id: ContentType; label: string }[] = [
  { id: "tips", label: "研发技巧" },
  { id: "models", label: "大模型" },
  { id: "tools", label: "工具" },
  { id: "editors", label: "AI编辑器" },
  { id: "team", label: "团队分享" },
  { id: "dingtalk", label: "钉钉文档" },
];

export default function AdminPage() {
  const [activeType, setActiveType] = useState<ContentType>("tips");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showParse, setShowParse] = useState(false);
  const [editing, setEditing] = useState<ContentItem | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch(`/api/content?type=${activeType}`);
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [activeType]);

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/content/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <main className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-slate-600 hover:text-primary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <Link
            href="/admin/config"
            className="text-primary hover:underline font-medium"
          >
            站点配置
          </Link>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowParse(true);
              setShowForm(false);
              setEditing(null);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primaryPurple text-white font-medium hover:opacity-90"
          >
            <Sparkles className="w-4 h-4" />
            AI 智能录入
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setShowParse(false);
              setEditing(null);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            新增
          </button>
        </div>
      </div>

      {showParse && (
        <ParsePanel
          onClose={() => setShowParse(false)}
          onSaved={() => {
            setShowParse(false);
            fetchItems();
          }}
          defaultType={activeType}
        />
      )}

      {showForm && (
        <FormPanel
          item={editing}
          type={activeType}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchItems();
          }}
        />
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeType === t.id
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-500">加载中...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left p-4 font-semibold">标题</th>
                <th className="text-left p-4 font-semibold">摘要</th>
                <th className="text-left p-4 font-semibold">标签</th>
                <th className="text-left p-4 font-semibold w-24">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4 text-slate-600 max-w-xs truncate">
                    {item.summary}
                  </td>
                  <td className="p-4">
                    {(item.tags ?? []).slice(0, 3).join(", ")}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(item);
                        setShowForm(true);
                        setShowParse(false);
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
          {items.length === 0 && (
            <p className="p-8 text-center text-slate-500">暂无内容</p>
          )}
        </div>
      )}
    </main>
  );
}

function FormPanel({
  item,
  type,
  onClose,
  onSaved,
}: {
  item: ContentItem | null;
  type: ContentType;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: item?.title ?? "",
    summary: item?.summary ?? "",
    tags: (item?.tags ?? []).join(", "),
    author: item?.author ?? "",
    shareDate: item?.shareDate ?? "",
    shareEvent: item?.shareEvent ?? "",
    sourceType: item?.sourceType ?? "internal",
    externalUrl: item?.externalUrl ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title,
        summary: item.summary,
        tags: (item.tags ?? []).join(", "),
        author: item.author ?? "",
        shareDate: item.shareDate ?? "",
        shareEvent: item.shareEvent ?? "",
        sourceType: item.sourceType ?? "internal",
        externalUrl: item.externalUrl ?? "",
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        type,
        title: form.title,
        summary: form.summary,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        author: form.author || undefined,
        shareDate: form.shareDate || undefined,
        shareEvent: form.shareEvent || undefined,
        sourceType: form.sourceType as "internal" | "dingtalk",
        externalUrl: form.externalUrl || undefined,
      };

      const url = item ? `/api/content/${item.id}` : "/api/content";
      const method = item ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "保存失败");
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">{item ? "编辑" : "新增"}内容</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">标题 *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">摘要 *</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg h-24"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">标签（逗号分隔）</label>
            <input
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">作者</label>
            <input
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          {(type === "team" || type === "dingtalk") && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">分享日期</label>
                <input
                  type="date"
                  value={form.shareDate}
                  onChange={(e) => setForm((f) => ({ ...f, shareDate: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">分享场合</label>
                <input
                  value={form.shareEvent}
                  onChange={(e) => setForm((f) => ({ ...f, shareEvent: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">来源类型</label>
            <select
              value={form.sourceType}
              onChange={(e) =>
                setForm((f) => ({ ...f, sourceType: e.target.value as "internal" | "dingtalk" }))
              }
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="internal">内部</option>
              <option value="dingtalk">钉钉文档</option>
            </select>
          </div>
          {form.sourceType === "dingtalk" && (
            <div>
              <label className="block text-sm font-medium mb-1">外部链接 *</label>
              <input
                value={form.externalUrl}
                onChange={(e) => setForm((f) => ({ ...f, externalUrl: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://..."
              />
            </div>
          )}
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

function ParsePanel({
  onClose,
  onSaved,
  defaultType,
}: {
  onClose: () => void;
  onSaved: () => void;
  defaultType: ContentType;
}) {
  const [content, setContent] = useState("");
  const [hint, setHint] = useState<"link" | "meeting" | "auto">("auto");
  const [parsing, setParsing] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveType, setSaveType] = useState<ContentType>(defaultType);

  const handleParse = async () => {
    if (!content.trim()) return;
    setError("");
    setParsing(true);
    try {
      const res = await fetch("/api/admin/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), hint }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "解析失败");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "解析失败");
    } finally {
      setParsing(false);
    }
  };

  const handleSave = async () => {
    if (!result || typeof result.title !== "string" || typeof result.summary !== "string")
      return;
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: saveType,
          title: result.title,
          summary: result.summary,
          tags: Array.isArray(result.tags) ? result.tags : [],
          author: result.author,
          shareDate: result.shareDate,
          shareEvent: result.shareEvent,
          externalUrl: result.externalUrl,
          sourceType: result.externalUrl ? "dingtalk" : "internal",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "入库失败");
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "入库失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">AI 智能录入</h3>
        <p className="text-sm text-slate-500 mb-4">
          粘贴链接或文本，AI 自动解析并生成条目。支持：钉钉文档链接、会议纪要、分享记录
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg h-32"
              placeholder="粘贴链接或会议纪要..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">解析类型</label>
            <select
              value={hint}
              onChange={(e) => setHint(e.target.value as "link" | "meeting" | "auto")}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="auto">自动识别</option>
              <option value="link">链接解析</option>
              <option value="meeting">会议纪要</option>
            </select>
          </div>
          <button
            onClick={handleParse}
            disabled={parsing || !content.trim()}
            className="px-4 py-2 bg-primaryPurple text-white rounded-lg disabled:opacity-50"
          >
            {parsing ? "解析中..." : "解析"}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg space-y-3">
            <h4 className="font-semibold">解析结果（可编辑后入库）</h4>
            <div>
              <label className="block text-xs text-slate-500 mb-1">标题</label>
              <input
                value={String(result.title ?? "")}
                onChange={(e) => setResult((r) => ({ ...r, title: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">摘要</label>
              <textarea
                value={String(result.summary ?? "")}
                onChange={(e) => setResult((r) => ({ ...r, summary: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg text-sm h-20"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">入库类型</label>
              <select
                value={saveType}
                onChange={(e) => setSaveType(e.target.value as ContentType)}
                className="px-3 py-2 border rounded-lg"
              >
                {TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "入库中..." : "确认入库"}
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 border rounded-lg hover:bg-slate-50"
        >
          关闭
        </button>
      </div>
    </div>
  );
}
