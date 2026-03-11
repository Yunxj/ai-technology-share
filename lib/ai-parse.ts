import type { ContentType } from "@/types/content";

export interface ParseResult {
  title: string;
  summary: string;
  tags: string[];
  author?: string;
  shareDate?: string;
  shareEvent?: string;
  externalUrl?: string;
  suggestedType: ContentType;
}

const CONTENT_TYPES: ContentType[] = [
  "tips",
  "models",
  "tools",
  "editors",
  "team",
  "dingtalk",
];

function buildPrompt(content: string, hint: "link" | "meeting" | "auto"): string {
  const isUrl = /^https?:\/\/\S+/i.test(content.trim());
  const isDingtalk = /dingtalk\.com/i.test(content);

  let instruction = "";
  if (hint === "link" || (hint === "auto" && isUrl)) {
    instruction = `这是一段链接或网页相关内容。请从中提取：标题(title)、摘要(summary)、标签(tags数组)、作者(author，如有)、外部链接(externalUrl，如是钉钉等外链)。`;
  } else if (hint === "meeting" || (hint === "auto" && !isUrl)) {
    instruction = `这是一段会议纪要或分享记录。请从中提取：标题(title)、摘要(summary)、标签(tags数组)、分享人(author)、分享日期(shareDate，格式YYYY-MM-DD)、分享场合(shareEvent，如"研发周会分享")。`;
  } else {
    instruction = `请从以下内容中提取结构化信息：标题(title)、摘要(summary)、标签(tags数组)。如有作者、日期、场合、外部链接也一并提取。`;
  }

  return `${instruction}

内容：
---
${content}
---

请严格输出JSON，不要其他文字，格式如下：
{"title":"","summary":"","tags":[],"author":"","shareDate":"","shareEvent":"","externalUrl":"","suggestedType":"tips"}
suggestedType 必须是以下之一：${CONTENT_TYPES.join(",")}`;
}

async function parseWithDeepSeek(
  content: string,
  hint: "link" | "meeting" | "auto"
): Promise<ParseResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY not configured");
  }

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "user",
          content: buildPrompt(content, hint),
        },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error: ${err}`);
  }

  const data = await res.json();
  const text =
    data.choices?.[0]?.message?.content?.trim() ?? "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const jsonStr = jsonMatch ? jsonMatch[0] : text;
  const parsed = JSON.parse(jsonStr) as ParseResult;

  if (!parsed.title) parsed.title = "未命名";
  if (!parsed.summary) parsed.summary = "";
  if (!Array.isArray(parsed.tags)) parsed.tags = [];
  if (!CONTENT_TYPES.includes(parsed.suggestedType)) {
    parsed.suggestedType = "tips";
  }

  return parsed;
}

export async function parseWithAI(
  content: string,
  hint: "link" | "meeting" | "auto" = "auto"
): Promise<ParseResult> {
  const volcKey = process.env.VOLC_ACCESS_KEY;
  const volcSecret = process.env.VOLC_SECRET_KEY;

  // 豆包解析：若配置了火山引擎 key，可在此调用豆包 API（预留）
  // 豆包对钉钉链接、会议纪要有较好支持，可后续接入
  if (volcKey && volcSecret) {
    // TODO: 接入豆包/火山方舟网页解析、文档解析 API
    // 当前降级为 DeepSeek
  }

  return parseWithDeepSeek(content, hint);
}
