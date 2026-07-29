/* ============================================================
 *  📁 TZL PPT 网站 — 集中配置中心
 *  ⚡ 修改此文件即可更新全站文字、图片、链接、标签
 *  ============================================================
 *  修改后保存，刷新页面即可生效，无需重启服务。
 *  每个字段都有中文注释，直接改 "" 里的内容。
 * ============================================================ */

// ───── 一、品牌 ─────
export const BRAND = {
  name: "TZLPPT",        // 左上角品牌名
  mark: "folder",        // 品牌图标（保持默认）
}

// ───── 二、导航栏 ─────
export const NAV = ["首页", "模板类型", "风格", "作品", "定制"]
// 每个菜单项对应的页面锚点 ID（不要改，除非改模块结构）
export const SECTION_MAP = {
  "首页": "hero",
  "模板类型": "types",
  "风格": "themes",
  "作品": "works",
  "定制": "contact",
}

// ───── 三、搜索框 ─────
export const SEARCH = {
  placeholder: "搜索 PPT 作品",   // 搜索框占位文字
}

// ───── 四、首页 Hero ─────
export const HERO = {
  eyebrow: "每周上新 · 创意演示灵感",   // 顶部小标签
  title: "让每一页",                    // 大标题前半
  titleEm: "PPT",                      // 大标题强调色部分
  titleEnd: "都有登场的勇气",          // 大标题后半
  intro: "从有趣的想法到动人的故事，为你的表达找到一份恰到好处的视觉灵感。",  // 描述
}

// ───── 五、首页文件夹堆叠 ─────
export const FOLDERS = [
  { id: "folder-cover",   cover: "#fce4b8", bgImage: "/img/folder-1.png", title: "封面主题",   sub: "COVER TITLE" },
  { id: "folder-showcase",cover: "#f5d78e", bgImage: "/img/folder-2.png", title: "项目展示",   sub: "PROJECT SHOWCASE" },
  { id: "folder-creative",cover: "#edc56a", bgImage: "/img/folder-3.png", title: "灵感创意",   sub: "CREATIVE IDEAS" },
  { id: "folder-works",   cover: "#e4b548", bgImage: "/img/folder-4.png", title: "设计成果",   sub: "DESIGN WORKS" },
  { id: "folder-brand",   cover: "#dba73a", bgImage: "/img/folder-5.png", title: "品牌故事",   sub: "BRAND STORY" },
]

// ───── 六、作品类型（走马灯） ─────
export const WORK_TYPES = [
  { icon: "📳",  label: "品牌提案",  related: ["theme04","theme08","theme09"] },
  { icon: "📱",  label: "数据报告",  related: ["theme05","theme06","theme10"] },
  { icon: "🎹",  label: "创意策划",  related: ["theme01","theme11","theme12"] },
  { icon: "📑",  label: "教育培训",  related: ["theme02","theme03","theme07"] },
]

// ───── 七、主题风格（12 套） ─────
export const THEMES = [
  { id: "theme01", name: "轻拟态风",    style: "温暖米色",   suit: "产品介绍 / 企业汇报",       audience: "创业团队 / 产品经理", color: "#e8dcc8", accent: "#b8a88a" },
  { id: "theme02", name: "炫光紫绿风",  style: "紫绿渐变",   suit: "科技发布会 / AI 主题",      audience: "科技公司 / 技术负责人", color: "#b8a0d8", accent: "#6a9e7a" },
  { id: "theme03", name: "深浅代码风",  style: "深蓝灰",     suit: "技术方案 / 开发者大会",     audience: "工程师 / 技术管理者", color: "#2d3445", accent: "#5a7d9c" },
  { id: "theme04", name: "玻璃糖果风",  style: "粉糖果色",   suit: "年轻化品牌 / 消费产品",     audience: "品牌团队 / 设计师", color: "#f8c8d8", accent: "#e88aaa" },
  { id: "theme05", name: "色谱图表风",  style: "暖黄色谱",   suit: "数据报告 / 市场分析",       audience: "数据分析师 / 咨询顾问", color: "#f0e68c", accent: "#d4a373" },
  { id: "theme06", name: "深色图谱风",  style: "深海军蓝",   suit: "高密度数据 / 战略分析",     audience: "战略团队 / 投资人", color: "#1a2332", accent: "#4a7c6f" },
  { id: "theme07", name: "冷白调研风",  style: "冷白蓝",     suit: "调研报告 / 白皮书",         audience: "研究机构 / 咨询团队", color: "#eef2f5", accent: "#7a9e9f" },
  { id: "theme08", name: "黑金实验风",  style: "黑金",       suit: "高端发布 / 品牌提案",       audience: "高端品牌 / 创意总监", color: "#1a1a1a", accent: "#c9a84c" },
  { id: "theme09", name: "深蓝杂志风",  style: "深蓝",       suit: "品牌故事 / 人物访谈",       audience: "公关团队 / 媒体编辑", color: "#0d2137", accent: "#5c7d9c" },
  { id: "theme10", name: "金色指数风",  style: "暗金",       suit: "金融数据 / 投资报告",       audience: "投资机构 / 金融分析师", color: "#2a2520", accent: "#d4a030" },
  { id: "theme11", name: "高能增长风",  style: "深绿亮绿",   suit: "增长复盘 / 商业计划",       audience: "创业者 / 增长团队", color: "#1a3a2a", accent: "#6abf6a" },
  { id: "theme12", name: "声波霓虹风",  style: "深紫霓虹",   suit: "音乐娱乐 / 潮流活动",       audience: "娱乐品牌 / 活动策划", color: "#2a1035", accent: "#e060d0" },
]

// ───── 八、作品展示 ─────
// cover: 封面图片路径，或 "linear-gradient(...)" 纯色渐变
export const WORKS = [
  // ★ 精选 4 套（默认展示）
  { themeId: "theme02", tag: "科技发布", title: "AI 智能科技发布会",   desc: "12页 / 紫绿渐变",    color: "#b8a0d8", cover: "/img/cover-ai-tech.png" },
  { themeId: "theme04", tag: "品牌方案", title: "年轻化消费品牌发布",   desc: "12页 / 粉糖果色",    color: "#f8c8d8", cover: "/img/cover-brand-launch.png" },
  { themeId: "theme01", tag: "创业项目", title: "创业项目BP策划方案",   desc: "12页 / 温暖米色",    color: "#e8dcc8", cover: "/img/cover-bp-plan.png" },
  { themeId: "theme06", tag: "数据分析", title: "年度数据战略报告",     desc: "12页 / 深海军蓝",    color: "#1a2332", cover: "/img/cover-data-report.png" },
  // ★ 其余 8 套（点击"查看全部"后展示）
  { themeId: "theme03", tag: "开发者大会", title: "技术架构设计方案",   desc: "5页 / 深蓝灰",      color: "#2d3445", cover: "linear-gradient(135deg,#2d3445,#5a7d9c)" },
  { themeId: "theme05", tag: "市场分析",   title: "市场趋势数据分析",   desc: "5页 / 暖黄色谱",    color: "#f0e68c", cover: "linear-gradient(135deg,#f0e68c,#d4a373)" },
  { themeId: "theme07", tag: "调研报告",   title: "行业调研白皮书",     desc: "5页 / 冷白蓝",      color: "#eef2f5", cover: "linear-gradient(135deg,#eef2f5,#7a9e9f)" },
  { themeId: "theme08", tag: "高端品牌",   title: "高端品牌战略提案",   desc: "5页 / 黑金",        color: "#1a1a1a", cover: "linear-gradient(135deg,#1a1a1a,#c9a84c)" },
  { themeId: "theme09", tag: "品牌故事",   title: "品牌故事叙事方案",   desc: "5页 / 深蓝",        color: "#0d2137", cover: "linear-gradient(135deg,#0d2137,#5c7d9c)" },
  { themeId: "theme10", tag: "金融报告",   title: "基金季度表现报告",   desc: "5页 / 暗金",        color: "#2a2520", cover: "linear-gradient(135deg,#2a2520,#d4a030)" },
  { themeId: "theme11", tag: "增长策略",   title: "用户增长策略方案",   desc: "5页 / 深绿亮绿",    color: "#1a3a2a", cover: "linear-gradient(135deg,#1a3a2a,#6abf6a)" },
  { themeId: "theme12", tag: "娱乐活动",   title: "音乐节品牌企划案",   desc: "5页 / 深紫霓虹",    color: "#2a1035", cover: "linear-gradient(135deg,#2a1035,#e060d0)" },
  // ★ 文件夹跳转专用 5 套（与上方 FOLDERS 对应）
  { themeId: "folder-cover",    tag: "封面主题", title: "TZL PPT 品牌形象册",     desc: "8页 / 品牌形象",   color: "#fce4b8", cover: "/img/folder-1.png" },
  { themeId: "folder-showcase", tag: "项目展示", title: "TZL 项目优势说明书",     desc: "10页 / 项目优势",  color: "#f5d78e", cover: "/img/folder-2.png" },
  { themeId: "folder-creative", tag: "灵感创意", title: "2026 演示设计灵感趋势",   desc: "8页 / 灵感趋势",   color: "#edc56a", cover: "/img/folder-3.png" },
  { themeId: "folder-works",    tag: "设计成果", title: "精选设计作品集",         desc: "8页 / 作品案例",   color: "#e4b548", cover: "/img/folder-4.png" },
  { themeId: "folder-brand",    tag: "品牌故事", title: "TZL 品牌故事传播方案",   desc: "6页 / 品牌故事",   color: "#dba73a", cover: "/img/folder-5.png" },
]

// ───── 九、联系方式 ─────
export const CONTACTS = [
  { icon: "💬", label: "微信",    value: "TZL_design",      desc: "扫码或搜索添加" },
  { icon: "🐟", label: "邮箱",    value: "hello@tzlppt.com", desc: "工作日 24h 回复" },
  { icon: "📫", label: "二维码",  value: "扫一扫直达",      desc: "微信 / 公众号" },
]

// ───── 十、联系方式卡片独立配置 ─────
export const CONTACT_CARDS = {
  xiaohongshu: {
    iconType: "svg",              // "svg" 或 "emoji"
    svg: `<svg viewBox="0 0 48 48" width="40" height="40" fill="none">
      <rect width="48" height="48" rx="10" fill="#ff2442"/>
      <path d="M15 14h18v4H15zm0 8h18v4H15zm0 8h18v4H15z" fill="#fff" opacity=".9"/>
    </svg>`,
    title: "小红书",
    name: "@耳人水",
    action: "主页",
    link: "https://xhslink.cn/m/9ThIm3ksNaD",   // 跳转链接
  },
  wechat: {
    title: "微信",
    name: "偷着乐ppt",
    action: "点击扫码 参与定制",
    qrImage: "/img/wechat-qr.jpg",               // 二维码图片路径
    qrLabel: "微信 · 二维码",
    qrDesc: "扫码添加微信",
  },
  xianyu: {
    title: "咸鱼小铺",
    name: "偷着乐ppt",
    action: "直达小铺 价格了然",
    qrImage: "/img/xianyu-qr.jpg",
    qrLabel: "咸鱼 · 二维码",
    qrDesc: "扫码直达咸鱼小铺",
    defaultFlipped: true,                          // 默认显示二维码面
  },
}

// ───── 十一、模块标题 ─────
export const SECTION_TITLES = {
  workTypes: { title: "作品类型", desc: "四种表达方式，总有一种适合你的故事" },
  themes:    { title: "主题风格", desc: "12 套预设风格，总有一款适合你的场景" },
  works: { title: "作品展示", desc: "12 套精选 5 页精致模板", showAll: "查看全部 →", collapse: "收起 ↑", backToShowcase: "← 回到精选" },
  contact:   { title: "联系我们", desc: "定制属于你的专属 PPT" },
}

// ───── 十二、其他常量 ─────
export const NOTICE_DURATION = 2200    // 通知显示时长（毫秒）
export const CAROUSEL_INTERVAL = 3500  // 文件夹轮播间隔（毫秒）


