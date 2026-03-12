# EdgeOne Pages 部署指南

腾讯云 EdgeOne Pages 支持 Next.js 全栈部署（App Router、SSR、SSG、ISR 等），国内访问速度快，公测期间免费。适用于已在 GitHub 上托管代码的项目，如本仓库 `ai-technology-share`。

## 一、前提条件

- 代码已推送到 [GitHub](https://github.com)
- 有腾讯云账号（可用微信扫码登录）

## 二、操作步骤（从 Git 仓库导入）

### 1. 进入 EdgeOne Pages 控制台

- 地址：<https://pages.edgeone.ai/> 或 <https://console.cloud.tencent.com/edgeone>
- 使用腾讯云账号登录（微信 / QQ / 腾讯云账号均可）

### 2. 创建项目并关联 Git

1. 点击 **「创建项目」**
2. 选择 **「从 Git 导入」**（不要选「从模板开始」）
3. 选择 **GitHub**（或 Gitee）
4. 若首次使用，按页面提示完成 **OAuth 授权**，允许 EdgeOne 访问你的 GitHub 仓库

### 3. 选择要部署的仓库

1. 在仓库列表中找到 `Yunxj/ai-technology-share`（或你自己的 Fork）
2. 选中该仓库，进入下一步

### 4. 配置构建设置

| 配置项 | 建议值 | 说明 |
|--------|--------|------|
| **构建命令** | `npm run build` | 与本项目 `package.json` 一致 |
| **输出目录** | `默认` / `.next` | Next.js 通常自动识别 |
| **Node 版本** | `20`（如可选） | 与本地开发保持一致 |
| **加速区域** | `全球` 或 `中国` | 国内用户选「中国」访问更快 |

一般保持默认即可，EdgeOne 会自动识别 Next.js 项目。

### 5. 配置环境变量

在构建/部署设置中，添加以下环境变量：

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `ADMIN_PASSWORD` | 是 | 管理后台密码，自己设定 |
| `DEEPSEEK_API_KEY` | 否 | DeepSeek API Key，用于 AI 智能录入 |
| `VOLC_ACCESS_KEY` | 否 | 火山引擎 Key（豆包解析） |
| `VOLC_SECRET_KEY` | 否 | 火山引擎 Secret |

至少填写 `ADMIN_PASSWORD`，否则管理后台无法登录。

### 6. 开始部署

1. 确认配置无误后，点击 **「开始部署」** 或 **「立即构建」**
2. 等待构建完成（约 2–5 分钟）
3. 部署成功后，会生成一个预览链接，形如：`https://xxx.pages.edgeone.ai` 或类似域名

### 7. 自定义域名（可选）

- 在「项目设置」→「域名」中添加自己的域名
- 按提示完成 DNS 解析（CNAME 指向 EdgeOne 提供的地址）

## 三、后续更新

- **自动部署**：每次向 GitHub 主分支 `push` 代码后，EdgeOne 会自动触发重新构建和部署
- **手动触发**：在控制台该项目页面点击「重新部署」即可
- **分支预览**：可配置分支预览，为 PR 生成单独预览链接

## 四、常见问题

### 构建失败：找不到模块

- 确保 `package.json` 中依赖完整，本地 `npm install` 能正常安装
- 检查是否有私有 npm 包依赖（若有，需在 EdgeOne 配置 npm token）

### 管理后台打不开

- 确认已配置 `ADMIN_PASSWORD` 环境变量
- 部署完成后需重新触发一次构建，环境变量修改才会生效

### 国内访问慢或打不开

- 加速区域选择「中国」
- 可绑定国内备案的自定义域名，使用国内 CDN 节点

## 五、相关链接

- [EdgeOne Pages 控制台](https://pages.edgeone.ai/)
- [Next.js 部署到 EdgeOne 官方教程](https://pages.edgeone.ai/zh/resources/deploy-nextjs-project-to-pages)
- [EdgeOne CLI 文档](https://pages.edgeone.ai/zh/document/edgeone-cli)（可选，用于 CLI 部署）
