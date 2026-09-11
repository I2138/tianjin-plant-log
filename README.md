---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '1eb5cb9b-ee38-4597-9395-6158b30f63bd'
  PropagateID: '1eb5cb9b-ee38-4597-9395-6158b30f63bd'
  ReservedCode1: '572ea30c-d998-49e9-984b-24480b8382fe'
  ReservedCode2: '572ea30c-d998-49e9-984b-24480b8382fe'
---

# 植物日志城 · 津城植物日志

面向天津市民与自然爱好者的城市植物共建观察平台 —— 响应式网页原型（移动端优先，适配电脑大屏）。

## 如何运行

无需安装任何依赖，直接用浏览器（推荐 Chrome / Edge）双击打开 `index.html` 即可。

> 建议以本地文件方式直接打开；如遇浏览器限制 localStorage，可用任意静态服务器（如 VS Code Live Server）运行。

## 演示账号

| 账号昵称 | 密码 | 说明 |
| --- | --- | --- |
| demo | 123456 | 预置演示数据（日志、收藏、上报、勋章） |

也可自行**注册新账号**，每个用户拥有独立的数据空间（观察日志、草稿、收藏、上报记录、任务参与状态等互不干扰），数据保存在浏览器 localStorage 中，刷新不丢失。

## 页面结构

```
底部导航（全局）
├── 图鉴 index.html          瀑布流卡片 / 搜索 / 多维筛选 / 无限滚动
│   ├── 植物详情 plant-detail.html    折叠面板 / 收藏 / 图集全屏预览 / 点位预览
│   └── 科普社区 community.html        分类标签 / 文章与动态卡片
│       └── 文章详情 article-detail.html
├── 地图 map.html            简易矢量地图 / 点位浮窗 / 聚合气泡 / 筛选抽屉 / 定位
├── 记录 record.html         图片上传进度 / AI 识别模拟 / 定位 / 分层表单 / 草稿
│   └── 日志详情 log-detail.html
├── 任务 task.html           状态标签筛选 / 任务卡片
│   └── 任务详情 task-detail.html     折叠面板 / 成果预览 / 参与任务 / 我的提交
└── 我的 profile.html        统计卡 / 功能入口
    ├── 我的观察日志 my-logs.html
    ├── 我的收藏 my-favorites.html
    ├── 我的上报 my-reports.html（弹窗详情面板 / 处理状态）
    ├── 成就勋章 badges.html
    ├── 设置 settings.html
    └── 绿化问题上报 report.html

登录 / 注册 auth.html（独立页，无底部导航）
```

## 全局交互规则

1. 页面切换 / 列表刷新 / 图片加载 / 定位 / 搜索 / 表单提交均有 loading 或骨架屏；
2. 列表无数据展示统一空状态；操作失败展示错误提示弹窗；
3. 弹窗体系：右侧滑出筛选面板、居中提示弹窗、全屏图片预览、底部详情面板，均支持点击背景关闭；
4. 大量信息采用折叠面板分层展示；
5. 所有页面跳转均有转场 loading 过渡动画。

## 技术说明

- 纯原生 HTML + CSS + JavaScript，零依赖、零构建，自包含可直接离线打开；
- 植物配图为**真实照片**（16 种共 100 张）：83 张来自 Pexels 实拍（免费许可），17 张为按物种形态特征定制的照片级 AI 生成图，版权与清单详见 `images/CREDITS.md` 与 `js/photos.js`；
- 图片加载失败时自动回退为莫兰迪色 SVG 模拟图，保证任何情况下不出空白；
- 无后端 / 无数据库 / 无真实地图与 AI 服务，全部数据为模拟假数据；
- 多用户数据通过 localStorage 按用户 ID 隔离，模拟「代码后台信息记录存储」。

## 文件结构

```
植物日志城/
├── index.html            图鉴页（默认首页）
├── plant-detail.html     植物详情页
├── map.html              植物分布地图
├── record.html           新建观察记录
├── log-detail.html       观察日志详情
├── task.html             公共观察任务
├── task-detail.html      任务详情
├── community.html        科普社区
├── article-detail.html   科普文章详情
├── report.html           绿化问题上报
├── profile.html          个人中心
├── my-logs.html          我的观察日志
├── my-favorites.html     我的收藏
├── my-reports.html       我的上报
├── badges.html           成就勋章
├── settings.html         设置
├── auth.html             登录 / 注册
├── css/
│   ├── style.css         设计系统 + 公共组件
│   └── pages.css         页面专属样式
└── js/
    ├── data.js           模拟数据（植物 / 点位 / 任务 / 日志 / 文章 / 勋章）
    ├── images.js         图片工具（真实照片引用 + SVG 兜底生成器 + 图标）
    ├── photos.js         真实照片清单（按物种分组，自动生成）
    ├── storage.js        用户认证 + 多用户数据隔离（localStorage）
    └── common.js         公共组件（导航 / 转场 / 弹窗 / toast / 骨架 / 空状态）

images/
├── CREDITS.md            图片来源与版权说明
└── plants/               16 种植物真实照片（p{物种ID}_{序号}.jpg，共 100 张）
```