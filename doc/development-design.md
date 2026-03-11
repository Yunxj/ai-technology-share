# AI 技术分享站 · 开发设计方案

## 一、项目概述

公司内部 AI 运用场景技术分享网站，一期聚焦研发 AI 内容，支持知识库、全局搜索、钉钉文档跳转、管理后台。

---

## 二、功能清单与优先级

### 一期（P0）

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 首页 | 研发技巧、大模型对比、工具、团队AI建设、AI编辑器、知识库入口 | P0 |
| 知识库 | 分类展示：研发技巧、大模型评测、工具、AI编辑器、团队分享、钉钉文档 | P0 |
| 全局搜索 | 关键词匹配标题/摘要，结果页跳转 | P0 |
| 钉钉文档 | 存链接，点击新窗口打开 | P0 |
| 管理后台 | 内容 CRUD，简单密码鉴权，AI 智能录入（一期） | P0 |
| 贡献入口 | 表单提交（可先落库待审核） | P1 |

### 二期（P2）

| 功能 | 描述 |
|------|------|
| 测试/产品/UI 内容 | 多岗位扩展 |
| 钉钉 SSO | 管理后台鉴权升级 |
| 钉钉工作流 | 群文档自动入库、日程联动 |
| SQLite + Prisma | 数据存储迁移 |
| 全文搜索 | 基于数据库 |

---

## 三、技术选型

| 项目 | 一期 | 后期 |
|------|------|------|
| 框架 | Next.js 14+ (App Router) | - |
| 数据存储 | JSON 文件 (`data/*.json`) | SQLite + Prisma |
| 管理鉴权 | 简单密码（环境变量 `ADMIN_PASSWORD`） | 钉钉 SSO |
| 钉钉文档 | 仅存链接跳转 | 保持 |

---

## 四、数据模型

### 4.1 内容类型

- `tips` - 研发技巧
- `models` - 大模型评测
- `tools` - 工具推荐
- `editors` - AI 编辑器（Cursor、Claude Code、Open Code、Kiro 等）
- `team` - 团队 AI 建设（会议分享、钉钉群文档）
- `dingtalk` - 钉钉文档（外部链接）

### 4.2 统一内容结构

```typescript
interface ContentItem {
  id: string;
  type: 'tips' | 'models' | 'tools' | 'editors' | 'team' | 'dingtalk';
  title: string;
  summary: string;
  tags: string[];
  author?: string;
  shareDate?: string;   // 会议分享日期，type=team 时使用
  shareEvent?: string;  // 分享场合，如「研发周会」「技术分享会」
  updatedAt: string;   // ISO 8601
  sourceType: 'internal' | 'dingtalk';
  externalUrl?: string; // 钉钉文档链接，sourceType=dingtalk 时必填
  viewCount?: number;
  likeCount?: number;
}
```

### 4.3 JSON 文件结构

```
data/
  tips.json      # 研发技巧
  models.json    # 大模型评测
  tools.json     # 工具推荐
  editors.json   # AI 编辑器
  team.json      # 团队 AI 建设（会议分享、钉钉群文档）
  dingtalk.json  # 钉钉文档
```

---

## 4.4 数据更新与自动化（降低人工录入成本）

**目标**：减少人工录入，通过 AI 工具、工作流、自动化实现数据持续更新。

### 方案一：AI 辅助录入（一期可落地）

| 能力 | 实现方式 | 人工成本 |
|------|----------|----------|
| 链接智能解析 | 粘贴钉钉/外部链接 → 调用大模型 API 或爬虫+LLM 提取标题、摘要 | 仅需粘贴链接 |
| 文本智能结构化 | 粘贴会议纪要/分享记录 → AI 解析生成 title、summary、tags、author | 仅需粘贴原文 |
| 字段自动补全 | 仅填标题或链接，其他字段由 AI 补全，管理员可微调 | 减少 70% 输入 |

**技术实现**：
- 调用 OpenAI / 通义千问 / 本地模型 API
- Prompt 模板：`根据以下内容提取结构化信息：title, summary, tags, author`，输出 JSON
- 管理后台入口：「AI 智能录入」按钮，粘贴后一键生成

### 方案二：钉钉工作流集成（二期）

| 能力 | 实现方式 |
|------|----------|
| 钉钉群文档自动入库 | 钉钉开放平台 API，定时拉取指定群内分享的文档链接；或群机器人监听「文档分享」事件 |
| 钉钉日程联动 | 会议类型为「AI 分享」时，会议结束后自动创建待录入任务，含分享人、时间、主题 |
| 钉钉文档 Webhook | 钉钉文档更新时触发回调，自动同步标题/摘要到知识库 |

**前置条件**：钉钉企业开发者权限、应用配置

### 方案三：工作流自动化（二期）

| 来源 | 触发方式 | 数据流 |
|------|----------|--------|
| 钉钉群消息 | 群内发 `@机器人 分享 [链接]` | 解析链接 → AI 提取 → 入库待审核 |
| 飞书/钉钉日程 | 会议结束 Webhook | 会议标题+参与人 → 生成 team 类型待录入 |
| GitHub PR | PR 合并时带 `ai-share` 标签 | 自动生成技巧条目 |
| RSS 订阅 | 定时任务拉取 AI 技术博客 | AI 筛选后入库待审核 |

### 方案四：批量导入与模板

| 能力 | 实现方式 |
|------|----------|
| Excel/CSV 导入 | 管理后台支持上传模板，批量解析入库 |
| 钉钉文档批量 | 导出钉钉空间文档列表（API），AI 批量提取摘要后导入 |
| 模板化表单 | 按类型（会议分享/钉钉文档/技巧）提供模板，减少重复字段 |

### 推荐实施顺序

1. **一期**：AI 辅助录入（链接解析 + 文本结构化），管理后台增加「AI 智能录入」入口
2. **二期**：钉钉群文档自动入库（若具备开放平台权限）
3. **三期**：工作流自动化（日程联动、群机器人）

---

**管理后台「AI 智能录入」交互示意**：

```
[ 智能录入 ]
  ┌─────────────────────────────────────────┐
  │ 粘贴链接或文本，AI 自动解析并生成条目     │
  │ 支持：钉钉文档链接、会议纪要、分享记录    │
  └─────────────────────────────────────────┘
  [ 粘贴内容 ]  [ 解析 ]  →  预览结构化结果  →  [ 确认入库 ]
```

---

## 五、API 设计

### 5.1 搜索 API

```
GET /api/search?q=关键词
Response: { items: ContentItem[] }
```

- 实现：读取所有 JSON，内存过滤 `title`、`summary`、`tags` 包含关键词
- 支持 `type` 参数按分类过滤

### 5.2 内容 API

```
GET  /api/content?type=tips|models|tools|editors|team|dingtalk  # 列表
GET  /api/content/[id]                            # 详情（可选）
POST /api/content                                 # 新增（需鉴权）
PUT  /api/content/[id]                            # 更新（需鉴权）
DELETE /api/content/[id]                           # 删除（需鉴权）
```

### 5.3 鉴权

- 管理 API：请求头 `Authorization: Bearer <password>` 或 Cookie
- 校验 `ADMIN_PASSWORD` 环境变量

---

## 六、页面路由与组件结构

### 6.1 路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 研发技巧、大模型、知识库入口 |
| `/kb` | 知识库 | 分类列表，支持 ?cat=tips 等 |
| `/search` | 搜索页 | ?q=关键词 |
| `/admin` | 管理后台 | 需鉴权 |
| `/about` | 关于 | 简单介绍 |

### 6.2 组件结构

```
app/
  layout.tsx
  page.tsx              # 首页
  kb/page.tsx           # 知识库
  search/page.tsx       # 搜索
  admin/
    layout.tsx          # 鉴权包装
    page.tsx            # 管理首页
  about/page.tsx
components/
  Navbar.tsx
  SearchBox.tsx
  ArticleCard.tsx
  ModelCard.tsx
  EditorCard.tsx        # AI 编辑器卡片
  ShareCard.tsx         # 团队分享卡片（会议/钉钉群）
  DingtalkCard.tsx      # 钉钉文档卡片，带外链图标
  Sidebar.tsx
lib/
  data.ts               # JSON 读写
  search.ts             # 搜索逻辑
  auth.ts               # 简单鉴权
  ai-parse.ts           # AI 智能解析（调用 LLM API）
data/
  tips.json
  models.json
  tools.json
  editors.json
  team.json
  dingtalk.json
```

---

## 七、钉钉文档集成

- **范围**：仅存链接跳转，不解析钉钉文档内容
- **链接格式**：`https://*.dingtalk.com/...`
- **展示**：卡片左侧蓝色竖条 +「钉钉文档」标签 + 外链图标
- **点击**：`target="_blank"` 新窗口打开

---

## 八、管理后台

### 8.1 鉴权

- **方式**：简单密码
- **配置**：环境变量 `ADMIN_PASSWORD`
- **流程**：访问 `/admin` 未登录 → 跳转登录页 → 输入密码 → 写入 Cookie/Session → 后续请求校验
- **后期**：可升级钉钉 SSO

### 8.2 功能模块

| 模块 | 说明 |
|------|------|
| 内容 CRUD | 按类型（tips/models/tools/editors/team/dingtalk）增删改查 |
| AI 智能录入 | 粘贴链接或文本 → 调用 LLM 解析 → 预览 → 确认入库 |
| 批量导入 | Excel/CSV 模板导入（二期） |
| 待审核队列 | 贡献表单、AI 解析结果、工作流自动入库，需人工审核 |

### 8.3 AI 智能录入 API

```
POST /api/admin/parse
Body: { content: string, hint?: 'link' | 'meeting' | 'auto' }
Response: { title, summary, tags, author?, ... }  // AI 解析结果
```

- `hint=link`：按链接解析，优先提取 og:title、description
- `hint=meeting`：按会议纪要解析，提取分享人、时间、主题
- `hint=auto`：自动识别类型并解析

---

## 九、开发阶段划分

### 阶段 1：项目骨架
- 初始化 Next.js
- 配置路由、布局
- 基础组件（Navbar、SearchBox、Card）

### 阶段 2：数据层 + 管理后台
- 创建 `data/*.json` 及读写逻辑
- `/admin` 页面：列表、表单、CRUD
- AI 智能录入：`/api/admin/parse` + 管理后台「智能录入」入口

### 阶段 3：全局搜索
- `/api/search` 实现
- `/search` 页面

### 阶段 4：前台闭环
- 首页从 JSON 读取展示
- 知识库页 `/kb`
- 钉钉链接跳转

### 阶段 5：贡献表单（可选）
- 贡献表单提交到待审核队列
- 管理后台审核入口

---

## 十、部署建议

- **平台**：Vercel / 自建 Node
- **环境变量**：`ADMIN_PASSWORD` 必填；`OPENAI_API_KEY` 或 `DASHSCOPE_API_KEY`（AI 智能录入可选）
- **数据**：一期 JSON 随代码部署；后期迁移 SQLite 需持久化存储

---

## 十一、参考文件

- UI 稿：[doc/ui-2.html](ui-2.html)
- 搜索页示意：[doc/search.html](search.html)
