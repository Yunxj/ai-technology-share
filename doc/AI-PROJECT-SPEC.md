# AI 技术分享站 · 全栈项目生成规格书

> 本文档供 AI 生成完整 Next.js 全栈项目使用。包含技术栈、数据模型、API、页面结构、UI 规范及实现指引。

---

## 一、项目概述

**项目名称**：AI 提效工坊 · 研发内部分享站

**定位**：公司内部 AI 运用场景技术分享网站，一期聚焦研发 AI 内容。

**核心能力**：知识库、全局搜索、钉钉文档跳转、管理后台、AI 智能录入。

---

## 二、技术栈

| 项目 | 选型 |
|------|------|
| 框架 | Next.js 14+ (App Router) |
| 语言 | TypeScript |
| 样式 | CSS Modules 或 Tailwind CSS |
| 数据存储 | JSON 文件 (`data/*.json`)，一期 |
| 管理鉴权 | 简单密码，环境变量 `ADMIN_PASSWORD` |
| AI 解析 | OpenAI / 通义千问 API，环境变量 `OPENAI_API_KEY` 或 `DASHSCOPE_API_KEY` |

---

## 三、数据模型

### 3.1 内容类型枚举

```typescript
type ContentType = 'tips' | 'models' | 'tools' | 'editors' | 'team' | 'dingtalk';
```

| 类型 | 说明 |
|------|------|
| tips | 研发技巧 |
| models | 大模型评测 |
| tools | 工具推荐 |
| editors | AI 编辑器（Cursor、Claude Code、Open Code、Kiro） |
| team | 团队 AI 建设（会议分享、钉钉群文档） |
| dingtalk | 钉钉文档（外部链接） |

### 3.2 统一内容结构

```typescript
interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  summary: string;
  tags: string[];
  author?: string;
  shareDate?: string;   // type=team 时，如 "2026-02-20"
  shareEvent?: string;  // type=team 时，如 "研发周会分享"
  updatedAt: string;   // ISO 8601
  sourceType: 'internal' | 'dingtalk';
  externalUrl?: string; // sourceType=dingtalk 时必填
  viewCount?: number;
  likeCount?: number;
}
```

### 3.3 数据文件

```
data/
  tips.json      # ContentItem[]
  models.json
  tools.json
  editors.json
  team.json
  dingtalk.json
```

每个 JSON 文件为 `ContentItem[]` 数组。id 使用 `nanoid` 或 `crypto.randomUUID()` 生成。

---

## 四、API 设计

### 4.1 公开 API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/search?q=关键词&type=可选 | 全局搜索，内存过滤 title/summary/tags |
| GET | /api/content?type=tips\|models\|... | 按类型获取列表 |

### 4.2 管理 API（需鉴权）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/content/[id] | 详情 |
| POST | /api/content | 新增 |
| PUT | /api/content/[id] | 更新 |
| DELETE | /api/content/[id] | 删除 |
| POST | /api/admin/parse | AI 智能解析 |

**鉴权**：Cookie `admin_token` 或 `Authorization: Bearer <ADMIN_PASSWORD>`

### 4.3 AI 解析 API

```
POST /api/admin/parse
Content-Type: application/json
Body: { content: string, hint?: 'link' | 'meeting' | 'auto' }

Response: {
  title: string;
  summary: string;
  tags: string[];
  author?: string;
  shareDate?: string;
  shareEvent?: string;
  externalUrl?: string;
  suggestedType: ContentType;
}
```

- `hint=link`：按链接解析
- `hint=meeting`：按会议纪要解析
- `hint=auto`：自动识别

---

## 五、页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| / | 首页 | 见下方首页结构 |
| /kb | 知识库 | 分类列表，支持 ?cat=tips 等 |
| /search | 搜索 | ?q=关键词 |
| /admin | 管理后台 | 需鉴权，含 CRUD + AI 智能录入 |
| /admin/login | 登录 | 密码登录 |
| /about | 关于 | 简单介绍 |

---

## 六、UI 规范与页面结构

### 6.1 设计规范

- **字体**：Inter (Google Fonts)
- **主色**：`#2563eb`（蓝）、`#7c3aed`（紫）
- **背景**：`#f5f7fb`
- **卡片**：白底、圆角 20px、边框 `#edf2f7`
- **钉钉文档**：左侧蓝色竖条 `#0089ff`，外链图标

### 6.2 导航栏

- Logo：机器人图标 +「AI提效工坊」+ 徽章「内部 · 研发版」
- 链接：首页 | 研发AI | 知识库 | 关于 | 更多岗位(二期，灰色)
- 右侧：全局搜索框，回车跳转 `/search?q=xxx`

### 6.3 首页结构（自上而下）

1. **Banner**：深蓝渐变背景，标题「研发 AI提效 专场」，副标题，右侧「效率翻倍」图标
2. **岗位入口**：4 卡片（研发/测试/产品/UI），研发高亮可点击，其余「二期筹备中」禁用
3. **知识库入口**：灰色背景条，标题「研发AI知识库」，右侧「进入知识库」
4. **主内容区（两列）**：
   - **左列**：
     - 团队AI建设：分享卡片列表（头像、日期、场合、标题、描述），钉钉群文档带外链
     - AI 编辑器：4 卡片网格（Cursor、Claude Code、Open Code、Kiro），每卡含名称、描述、标签
     - 热门研发技巧：2x2 卡片网格，含标签、标题、作者/浏览/点赞、更新时间、摘要
     - 大模型对比：4 卡片，含名称、badge、优缺点标签、描述、链接
   - **右列（侧边栏）**：
     - AI使用技巧·速递：3 条技巧列表
     - AI 编辑器：6 宫格（Cursor、Claude Code、Open Code、Kiro、Ollama、Continue）
     - 其他开源工具：4 宫格（MarkEdit、Draw.io、Dify、LangChain）
     - 热门标签：标签云
     - 贡献按钮：「分享你的AI技巧/工具」
5. **Footer**：版权、二期说明、数据更新说明、管理后台链接

### 6.4 搜索页结构

- 顶部导航（Logo、首页、知识库）
- 搜索框（大号，居中）
- 结果统计：「搜索「xxx」共找到 N 条结果」
- 结果列表：每项含类型标签、标题、摘要；钉钉文档带「外链」标识和 external-link 图标，点击 `target="_blank"`

### 6.5 钉钉文档展示规则

- `sourceType=dingtalk` 或 `externalUrl` 存在时：卡片左侧蓝色竖条、标签「钉钉文档」、标题旁外链图标
- 点击：`<a href={externalUrl} target="_blank" rel="noopener">`

---

## 七、目录与文件结构

```
ai-technology-share/
├── app/
│   ├── layout.tsx           # 根布局，含 Navbar
│   ├── page.tsx            # 首页
│   ├── kb/
│   │   └── page.tsx        # 知识库
│   ├── search/
│   │   └── page.tsx        # 搜索
│   ├── about/
│   │   └── page.tsx        # 关于
│   ├── admin/
│   │   ├── layout.tsx      # 鉴权包装
│   │   ├── page.tsx        # 管理首页（内容列表 + 智能录入入口）
│   │   └── login/
│   │       └── page.tsx    # 登录
│   └── api/
│       ├── search/
│       │   └── route.ts
│       ├── content/
│       │   ├── route.ts    # GET list, POST create
│       │   └── [id]/
│       │       └── route.ts # GET, PUT, DELETE
│       └── admin/
│           └── parse/
│               └── route.ts
├── components/
│   ├── Navbar.tsx
│   ├── SearchBox.tsx
│   ├── ArticleCard.tsx     # 研发技巧卡片
│   ├── ModelCard.tsx       # 大模型卡片
│   ├── EditorCard.tsx      # AI 编辑器卡片
│   ├── ShareCard.tsx       # 团队分享卡片
│   ├── DingtalkCard.tsx    # 钉钉文档卡片（或复用 ArticleCard + external 样式）
│   ├── Sidebar.tsx         # 首页右侧边栏
│   └── Footer.tsx
├── lib/
│   ├── data.ts             # JSON 读写，getContent(type), getAllContent(), saveContent(type, items)
│   ├── search.ts           # searchContent(keyword, type?)
│   ├── auth.ts             # verifyAdmin(token), setAdminCookie
│   └── ai-parse.ts         # parseWithAI(content, hint)
├── data/
│   ├── tips.json
│   ├── models.json
│   ├── tools.json
│   ├── editors.json
│   ├── team.json
│   └── dingtalk.json
├── .env.local.example      # ADMIN_PASSWORD, OPENAI_API_KEY
├── package.json
└── next.config.js
```

---

## 八、实现要点

### 8.1 搜索逻辑

```typescript
// lib/search.ts
function searchContent(keyword: string, type?: ContentType): ContentItem[] {
  const all = getAllContent(); // 合并所有 JSON
  const k = keyword.toLowerCase();
  return all.filter(item => {
    if (type && item.type !== type) return false;
    return [item.title, item.summary, ...(item.tags || [])]
      .some(s => String(s).toLowerCase().includes(k));
  });
}
```

### 8.2 管理后台 AI 智能录入流程

1. 用户粘贴链接或文本到文本框
2. 选择 hint（link/meeting/auto）
3. 点击「解析」→ 调用 `POST /api/admin/parse`
4. 展示解析结果（可编辑）
5. 选择 type，点击「入库」→ 调用 `POST /api/content`

### 8.3 钉钉文档识别

- URL 匹配：`/dingtalk\.com/i`
- 或 `sourceType === 'dingtalk'` 或 `externalUrl` 存在

### 8.4 类型与 JSON 文件映射

```typescript
const TYPE_TO_FILE: Record<ContentType, string> = {
  tips: 'tips.json',
  models: 'models.json',
  tools: 'tools.json',
  editors: 'editors.json',
  team: 'team.json',
  dingtalk: 'dingtalk.json',
};
```

---

## 九、初始数据示例

### tips.json

```json
[
  {
    "id": "tip-1",
    "type": "tips",
    "title": "用AI将遗留代码重构为现代Java的5个提示",
    "summary": "结合Claude + 自定义指令，两周老旧模块重构节省8人日",
    "tags": ["提示词工程", "代码重构"],
    "author": "张工",
    "updatedAt": "2026-02-22T00:00:00Z",
    "sourceType": "internal",
    "viewCount": 342,
    "likeCount": 56
  }
]
```

### team.json

```json
[
  {
    "id": "team-1",
    "type": "team",
    "title": "Cursor 多文件重构实战",
    "summary": "分享人：张工 · 结合真实项目演示 Cursor 的 Composer 模式批量修改代码",
    "tags": ["Cursor", "Composer"],
    "author": "张工",
    "shareDate": "2026-02-20",
    "shareEvent": "研发周会分享",
    "updatedAt": "2026-02-20T00:00:00Z",
    "sourceType": "internal"
  },
  {
    "id": "team-2",
    "type": "team",
    "title": "研发群 AI 提效案例汇总",
    "summary": "群内同事整理的 AI 使用技巧与踩坑记录，持续更新",
    "tags": ["钉钉群", "AI探索"],
    "shareEvent": "钉钉群 · AI探索文档",
    "updatedAt": "2026-02-20T00:00:00Z",
    "sourceType": "dingtalk",
    "externalUrl": "https://example.dingtalk.com/doc/xxx"
  }
]
```

### editors.json

```json
[
  {
    "id": "ed-1",
    "type": "editors",
    "title": "Cursor",
    "summary": "基于 VSCode，Composer 多文件编辑、@ 引用上下文，适合日常开发",
    "tags": ["多文件", "Composer"],
    "updatedAt": "2026-02-20T00:00:00Z",
    "sourceType": "internal"
  }
]
```

---

## 十、环境变量

```env
ADMIN_PASSWORD=your_admin_password
OPENAI_API_KEY=sk-xxx          # 或 DASHSCOPE_API_KEY，AI 智能录入用
```

---

## 十一、生成顺序建议

1. 初始化 Next.js 项目，安装依赖
2. 创建 `lib/data.ts`、`lib/search.ts`、`lib/auth.ts`
3. 创建 `data/*.json` 初始数据
4. 实现 `app/api/search`、`app/api/content`
5. 创建 `components/`（Navbar、SearchBox、各类 Card）
6. 实现 `app/page.tsx`（首页）
7. 实现 `app/search/page.tsx`、`app/kb/page.tsx`
8. 实现 `app/admin`（登录、列表、表单、AI 智能录入）
9. 实现 `app/api/admin/parse`、`lib/ai-parse.ts`
10. 实现 `app/about/page.tsx`、Footer

---

## 十二、参考 UI 稿

- 首页完整布局与样式：`doc/ui-2.html`
- 搜索页布局：`doc/search.html`

生成时请参照上述 HTML 的 DOM 结构、class 命名、布局（grid/flex）进行 React 组件化实现。
