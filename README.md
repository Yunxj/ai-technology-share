# AI 提效工坊 · 研发内部分享站

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

AI 运用场景技术分享网站，一期聚焦研发 AI 内容。可 Fork 后用于团队内部分享或二次开发。

> **在线演示**：部署后在此替换为你的演示链接（见下方部署说明）

## 功能

- **知识库**：研发技巧、大模型评测、工具推荐、AI 编辑器、团队分享、钉钉文档
- **全局搜索**：关键词匹配标题/摘要/标签
- **钉钉文档**：外链跳转，新窗口打开
- **管理后台**：内容 CRUD、密码鉴权、AI 智能录入

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- JSON 文件存储（一期）
- DeepSeek API（文本解析/对话）
- 豆包即梦（图像，二期预留）

## 快速开始

```bash
# 安装依赖
npm install

# 复制环境变量
cp .env.local.example .env.local
# 编辑 .env.local，设置 ADMIN_PASSWORD、DEEPSEEK_API_KEY

# 开发
npm run dev

# 构建
npm run build

# 生产
npm start
```

## 部署到 GitHub 与托管平台

1. 在 [GitHub](https://github.com/new) 新建仓库，名称如 `ai-technology-share`，选择 Public
2. 在本地执行：

```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-technology-share.git
git branch -M main
git push -u origin main
```

3. 选择以下任一平台导入该仓库，配置 `ADMIN_PASSWORD`、`DEEPSEEK_API_KEY` 等环境变量后即可自动部署：

| 平台 | 说明 | 链接 |
|------|------|------|
| **腾讯云 EdgeOne Pages** | 国内版 Vercel，公测免费，GitHub 集成，国内访问快 | [控制台](https://console.cloud.tencent.com/edgeone) · [详细操作指南](doc/EdgeOne-Pages-部署指南.md) |
| **Zeabur** | 支持 Next.js，免费额度 + .zeabur.app 域名 | [zeabur.com](https://zeabur.com) |
| **Render** | 免费 tier，支持 Node.js/Next.js | [render.com](https://render.com) |

## 环境变量

| 变量 | 说明 |
|------|------|
| ADMIN_PASSWORD | 管理后台密码（必填） |
| DEEPSEEK_API_KEY | DeepSeek API Key，用于 AI 智能录入 |
| VOLC_ACCESS_KEY | 火山引擎 Key，豆包解析（可选） |
| VOLC_SECRET_KEY | 火山引擎 Secret，豆包解析（可选） |

## 路由

| 路径 | 说明 |
|------|------|
| / | 首页 |
| /kb | 知识库 |
| /search | 搜索 |
| /about | 关于 |
| /admin | 管理后台（需登录） |
| /admin/login | 登录 |

## 常见问题

### 样式加载异常、部分资源 404

若出现 `layout.css`、`main-app.js` 等 404 导致样式或交互异常，通常是 `.next` 缓存损坏或 dev/prod 混用：

```bash
# 删除缓存并重新启动
rm -rf .next    # Windows: Remove-Item -Recurse -Force .next
npm run dev
```

然后浏览器强制刷新（Ctrl+Shift+R）或使用无痕模式重新打开。

---

## 开源与二次开发

- **Fork**：点击 GitHub 仓库右上角 Fork，即可复制到你的账号下
- **二次开发**：克隆后修改 [data/](data/) 下 JSON 配置即可定制内容，支持团队内部部署
- **贡献**：欢迎提 Issue 或 Pull Request，一起完善 AI 提效场景的实践沉淀
- **协议**：本项目采用 [MIT License](LICENSE)，可自由使用、修改与分发

---

## 项目结构

```
├── app/           # 页面与 API
├── components/    # 公共组件
├── lib/           # 数据、搜索、鉴权、AI
├── data/          # JSON 数据文件
└── types/         # TypeScript 类型
```
