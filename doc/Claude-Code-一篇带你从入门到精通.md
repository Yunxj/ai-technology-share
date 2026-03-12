# Claude Code 一篇带你从入门到精通

**分享信息**：
- 分享人：蔡秋雯
- 分享日期：2026-03-12
- 分享场合：分享
- 原文：微信公众号「红薯的Java私房菜」

---

虽然 Claude Code 名字中带有 "Code"，但它的功能绝不仅仅局限于写代码，而是一款真正意义上的通用 Agent。上一篇我们分享了 [Claude Code 入门指南](https://mp.weixin.qq.com/s?__biz=Mzg2NTc4NDcyNw==&mid=2247485048&idx=1&sn=4442679ec7a5214abeda5af549e32047&scene=21#wechat_redirect)，看完后你应该已经能够上手使用了。但是对于开发者来说，仅掌握这些基础功能是远远不够的，本篇文章我们将深入研究 Claude Code 的高级技能。

## 1. 记忆增强

你是否遇到过这样的情况：每次启动 Claude Code 后与它对话，感觉它就像一个失忆的天才。让它帮忙开发一个小程序时，它每次都会询问你是要创建微信小程序还是其他类型，后端使用 Java 还是 Python 等等这些基础的技术栈问题。次数多了就变得非常繁琐——这就是没有配置 `CLAUDE.md` 的 Claude Code。

### 1.1 CLAUDE.md 是什么？

它是一个特殊的 Markdown 文件，Claude Code 每次启动都会自动读取。写入其中的内容会被注入到 Claude 的系统提示（System Prompt）中，成为它思考的底层背景。

你可以在 CLAUDE.md 中写入常用的技术栈和开发规范等内容，这样每次重新打开 Claude 时就不需要重复交代这些信息了。此外，你还可以与 Claude 对话，输入「将 Java 开发规范、API 设计规范输出到 CLAUDE.md 文件」，让 Claude 自动为你生成一份 CLAUDE.md 文件。

### 1.2 创建 CLAUDE.md 文件

CLAUDE.md 不会自动创建，需要用户手动创建。创建方式很简单，主要有 3 种方式：`/init` 命令初始化、`/memory` 命令直接编辑，以及通过 `#` 操作符写入。

#### 使用 /init 初始化

在项目根目录打开 Claude，然后输入 `/init` 命令，Claude 会自动分析你的项目，并创建一个包含基本信息的 CLAUDE.md 文件：

```
/init
```

#### 使用 /memory 编辑

任何时候你都可以在 Claude 对话窗口输入 `/memory` 命令，它会直接在编辑器里打开 CLAUDE.md 文件，让你进行更详细的编辑和整理：

```
/memory
```

这里列出了 2 个选项，分别对应 2 个不同级别的 CLAUDE.md 文件：项目级和用户级，它们对应的作用和存放的内容也有所不同。

#### 使用 # 操作符写入

除了上述两种方式，还可以在对话中使用 `#` 号加上需要 Claude 记忆的内容。例如：`# 记住 Python 教学书籍：《Python 工匠》`，Claude 会自动将内容存入 CLAUDE.md：

```
# 记住 Python 教学书籍：《Python 工匠》
```

### 1.3 记忆分层

在使用 `/memory` 命令时提到了两种 CLAUDE.md 文件，实际上共有 3 种 CLAUDE.md 文件：

- **企业记忆**：保存在 Claude 部署目录下（`/Library/Application Support/ClaudeCode/Claude.md`），存放公司级的安全、合规要求，由管理员配置
- **用户记忆**：保存在用户空间的 `~/.claude/CLAUDE.md`，一般保存用户个人的偏好设置，在所有项目中生效
- **项目记忆**：保存在项目根目录下的 `CLAUDE.md`，保存项目的架构、技术栈和开发规范等，可以提交到 Git 与其他成员共享，仅在当前项目中生效

三个文件的加载顺序是：企业 → 项目 → 用户，后面的配置会覆盖前面的。因此，你的个人偏好拥有最高优先级！

### 1.4 模块化记忆

如果项目过于复杂，CLAUDE.md 可能会变得臃肿。此时可以使用 `@` 导入语法，将其他文件的内容引入 CLAUDE.md，实现记忆的模块化管理。例如，项目根目录 CLAUDE.md 可以这样组织：

```markdown
## Project Structure
minimall/
├── backend/   # Spring Boot backend
├── frontend/  # uni-app mini-program
├── admin/     # Vue 3 admin console
├── docker/    # Docker configurations
└── docker-compose.yml  # Full stack orchestration

## Module-Specific Documentation
For detailed information about each module, see:
- **Backend**: See `@backend/.claude/CLAUDE.md` for Spring Boot architecture, JPA conventions, API endpoints
- **Frontend**: See `@frontend/.claude/CLAUDE.md` for uni-app structure, Vue components, API integration
- **Admin**: See `@admin/.claude/CLAUDE.md` for Vue 3 setup, Element Plus, Pinia stores
```

根目录的 CLAUDE.md 放置项目概览和快速启动命令，backend、frontend 和 admin 分别放置各自的项目架构、技术细节和开发规范等。这样组织就显得非常简洁、优雅！

---

## 2. Skills

Skills 现在非常火热，提到大模型就离不开 Skills 和 MCP 等概念，开发者在研究，管理者也在天天谈论它们的应用前景。本节我们将讲解什么是 Skills，以及如何快速上手。

### 2.1 什么是 Agent Skills

Skill 是一个 Markdown 文件，它教 Claude 如何做特定的事情：使用你的团队标准审查 PR、以你喜欢的格式生成提交消息，或查询你公司的数据库架构。当你要求 Claude 做与 Skill 目的相匹配的事情时，Claude 会自动应用它。

先通过一个最简单的案例来理解：假设你在飞书上发布了一个 AI 知识库，支持通过兑换码开通阅读权限。当你生成了 100 个兑换码，需要手动组织物流详情时，可以让 Claude 帮你：

- **输出**：包含真实物流详情的 Excel 文件
- **输入**：从飞书导出的兑换码 Excel 文件和一个物流详情模板

让 Claude 帮你预组装 100 条物流详情并保存到新的 Excel 中。创建模板文件后让 Claude 开始工作，完成后可以让 Claude 记住这个处理流程，把整个过程整理到 `~/.claude/skills` 目录下的 skill 文件夹中——这就是我们培养 Claude Code 学会的一个新技能：自定义 Agent Skills。

### 2.2 Agent Skills 如何工作

Skill 存储在 `~/.claude/skills` 目录下，其中 `skill.md` 是必须存在的，其他文件都是 skill 依赖的资源文件。`skill.md` 的格式包含 YAML 前置数据（name、description、license）和 Markdown 主体。

一个 skill 包含以下三部分内容：

| 级别 | 加载时间 | 令牌成本 | 内容 |
|------|----------|----------|------|
| 第 1 级：元数据 | 始终（启动时） | 每个 Skill 约 100 个令牌 | YAML 前置数据中的 name 和 description |
| 第 2 级：指令 | 触发 Skill 时 | 不到 5k 个令牌 | 包含指令和指导的 SKILL.md 主体 |
| 第 3 级+：资源 | 按需 | 实际上无限制 | 通过 bash 执行的捆绑文件，不将内容加载到上下文中 |

Skills 在代码执行环境中运行，Claude 具有文件系统访问、bash 命令和代码执行功能。触发 Skill 时，Claude 使用 bash 从文件系统读取 SKILL.md，将其指令带入上下文窗口。

### 2.3 Agent Skills 分类

Claude 提供了几个主要产品：

- **Claude.ai**：网页版 Claude 聊天界面
- **Claude Agent SDK**：构建自定义 AI 代理的开发工具包
- **Claude API**：将 Claude 能力集成到应用程序的 API
- **Claude Code**：官方的命令行界面工具

预构建的 Agent Skills（官方出品）包括：PDF、Word、Excel、PowerPoint 等。功能矩阵如下：

| 平台 | 预构建的 Agent Skills | 自定义 Skills |
|------|----------------------|---------------|
| Claude Code | ❌ | ✅ |
| Claude API | ✅ | ✅ |
| Claude Agent SDK | ❌ | ✅ |
| Claude.ai | ✅ | ✅ |

**共享范围**：

- **Claude Code**：个人（`~/.claude/skills/`）或基于项目（`.claude/skills/`）
- **Claude API**：工作区范围
- **Claude.ai**：仅限个人用户

### 2.4 Agent Skills 使用

输入 `/skills` 命令可以列出本地安装的 skill。使用方式有两种：**手动调用**（输入 `/skill-name`）和**自动发现**（与 Claude 对话，Claude 会根据任务自动发现并加载相关 skill）。

### 2.5 总结

如果说之前的 AI 是一个无所不知的「巨鲸」，那 Skill 机制则让整个生态「万物生长」。它把定义「能力」的权力，从 AI 公司交还给了每一位用户、每一个团队。我们不再只是被动的使用者，而是主动的「训练师」和「赋能者」。AI 将不再是一个个孤立的「大脑」，而是能够深度融入我们工作流、理解我们独特上下文的「超级伙伴」。

---

## 3. 斜杠命令系统

Claude Code 提供 45+ 内置斜杠命令，涵盖版本控制、代码质量、上下文管理等：

- 版本控制：`/fix-issue`、`/create-pr`、`/commit`
- 代码质量：`/tdd`、`/clean`、`/check`
- 上下文管理：`/clear`、`/compact`

## 4. Git 工作流自动化

Git Worktrees Skill、分支收尾自动化、交互式 PR 审查等，可简化版本控制流程。

## 5. 自动化测试

支持 TDD Skill、Playwright 自动化测试、组合测试用例生成（如 Pypict Skill）等，让 Claude 自动执行 E2E 测试。

## 6. 文档与知识转换

Skill Seekers（文档变 Skill）、Tapestry（文档变知识图谱）、内容提取等功能，可快速将各类文档转化为可用工具。

---

**原文链接**：[Claude Code 一篇带你从入门到精通 - 微信公众号](https://mp.weixin.qq.com/s/v_WJC6pCK6qdN4GEMeaFDA)
