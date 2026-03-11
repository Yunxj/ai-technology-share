# JSON 配置说明

本文档说明通过管理后台 JSON 编辑器配置站点/页面内容的格式与规范。所有配置保存后前台将立即生效。

## 站点配置 (site)

路径：`/admin/config/site`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 网站名称 |
| logoText | string | 是 | 导航栏 Logo 显示文字 |
| badge | string | 是 | 导航栏徽章文字 |
| socialLinks | object | 否 | 社交链接 |
| footer.copyright | string | 是 | 版权信息 |
| footer.links | array | 是 | 页脚链接，每项含 label、href |
| footer.extra | string | 否 | 额外说明 |

## 首页 (home)

路径：`/admin/config/home`

| 字段 | 类型 | 说明 |
|------|------|------|
| mainTitleHighlight | string | 主标题高亮部分（如「AI提效」） |
| mainTitleSuffix | string | 主标题后缀（如「工坊」） |
| subtitle | string | 副标题 |
| slogan | string | 口号（如「效率翻倍」） |

## 岗位入口 (role-entry)

路径：`/admin/config/role-entry`

| 字段 | 类型 | 说明 |
|------|------|------|
| roles | array | 岗位列表，每项含 id、label、href、enabled、badge |
| roles[].id | string | 岗位 ID：dev、test、product、ui |
| roles[].label | string | 显示名称 |
| roles[].href | string | 链接地址 |
| roles[].enabled | boolean | 是否可点击 |
| roles[].badge | string | 徽章文字 |

## 研发AI知识库 (kb-entry)

路径：`/admin/config/kb-entry`

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 区域标题 |
| description | string | 描述文案 |
| linkText | string | 链接按钮文字 |

## 热门标签 (hot-tags)

路径：`/admin/config/hot-tags`

| 字段 | 类型 | 说明 |
|------|------|------|
| tags | array | 标签字符串数组，如 ["#Cursor", "#AI编辑器"] |

## 新功能公告 (new-features)

路径：`/admin/config/new-features`

| 字段 | 类型 | 说明 |
|------|------|------|
| items | array | 公告列表，每项含 title、description、date |

## 关于 (about)

路径：`/admin/config/about`

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 页面标题 |
| paragraphs | array | 段落文字数组 |

## 编辑规范

- 保存前请确保 JSON 格式正确
- 保存后前台将立即生效，无需重启服务
