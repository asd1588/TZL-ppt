 /* ===== 常量数据 =====
 * 集中管理所有页面常量，方便统一修改
 */
 
 /** 导航菜单项 */
 export const NAV = ["首页", "模板类型", "风格", "作品", "定制"]
 
 /** 作品展示卡片数据（4 列 × 3 行 = 12 条，归为 4 类） */
 export const WORKS = [
   { tag: "品牌提案", title: "明亮的品牌新章", desc: "5页 / 温暖色系", color: "#ffcf42" },
   { tag: "品牌提案", title: "企业视觉重塑", desc: "5页 / 专业质感", color: "#e8a87c" },
   { tag: "品牌提案", title: "高端品牌画册", desc: "5页 / 沉稳暗调", color: "#3a5a40" },
   { tag: "数据报告", title: "蓝色数据漫游", desc: "5页 / 商务创意", color: "#6db7e8" },
   { tag: "数据报告", title: "行业洞察分析", desc: "5页 / 沉稳质感", color: "#b8b0a0" },
   { tag: "数据报告", title: "融资路演故事", desc: "5页 / 专业商务", color: "#4a7c6f" },
   { tag: "创意策划", title: "一场橙色冒险", desc: "5页 / 年轻活力", color: "#ff9369" },
   { tag: "创意策划", title: "派对色彩风暴", desc: "5页 / 活泼跳跃", color: "#d4a373" },
   { tag: "创意策划", title: "创意解决方案", desc: "5页 / 信任稳重", color: "#5c6b73" },
   { tag: "教育培训", title: "知识可视化", desc: "5页 / 清晰明快", color: "#a8d8ea" },
   { tag: "教育培训", title: "青春学术表达", desc: "5页 / 清新留白", color: "#c4d7c0" },
   { tag: "教育培训", title: "教学课件设计", desc: "5页 / 清新自然", color: "#8bcf99" },
 ]
 
 /** 作品类型（走马灯用） */
 export const WORK_TYPES = [
   { icon: "📊", label: "品牌提案", related: ["theme04","theme08","theme09"] },
   { icon: "📈", label: "数据报告", related: ["theme05","theme06","theme10"] },
   { icon: "🎨", label: "创意策划", related: ["theme01","theme11","theme12"] },
   { icon: "📝", label: "教育培训", related: ["theme02","theme03","theme07"] },
  ]
 
 /** PPT 主题风格（取自 Dashi PPT 12 套内置主题） */
 export const THEMES = [
   { id: "theme01", name: "轻拟态风", style: "温暖米色", suit: "产品介绍 / 企业汇报", audience: "创业团队 / 产品经理", color: "#e8dcc8", accent: "#b8a88a" },
   { id: "theme02", name: "炫光紫绿风", style: "紫绿渐变", suit: "科技发布会 / AI 主题", audience: "科技公司 / 技术负责人", color: "#b8a0d8", accent: "#6a9e7a" },
   { id: "theme03", name: "深浅代码风", style: "深蓝灰", suit: "技术方案 / 开发者大会", audience: "工程师 / 技术管理者", color: "#2d3445", accent: "#5a7d9c" },
   { id: "theme04", name: "玻璃糖果风", style: "粉糖果色", suit: "年轻化品牌 / 消费产品", audience: "品牌团队 / 设计师", color: "#f8c8d8", accent: "#e88aaa" },
   { id: "theme05", name: "色谱图表风", style: "暖黄色谱", suit: "数据报告 / 市场分析", audience: "数据分析师 / 咨询顾问", color: "#f0e68c", accent: "#d4a373" },
   { id: "theme06", name: "深色图谱风", style: "深海军蓝", suit: "高密度数据 / 战略分析", audience: "战略团队 / 投资人", color: "#1a2332", accent: "#4a7c6f" },
   { id: "theme07", name: "冷白调研风", style: "冷白蓝", suit: "调研报告 / 白皮书", audience: "研究机构 / 咨询团队", color: "#eef2f5", accent: "#7a9e9f" },
   { id: "theme08", name: "黑金实验风", style: "黑金", suit: "高端发布 / 品牌提案", audience: "高端品牌 / 创意总监", color: "#1a1a1a", accent: "#c9a84c" },
   { id: "theme09", name: "深蓝杂志风", style: "深蓝", suit: "品牌故事 / 人物访谈", audience: "公关团队 / 媒体编辑", color: "#0d2137", accent: "#5c7d9c" },
   { id: "theme10", name: "金色指数风", style: "暗金", suit: "金融数据 / 投资报告", audience: "投资机构 / 金融分析师", color: "#2a2520", accent: "#d4a030" },
   { id: "theme11", name: "高能增长风", style: "深绿亮绿", suit: "增长复盘 / 商业计划", audience: "创业者 / 增长团队", color: "#1a3a2a", accent: "#6abf6a" },
   { id: "theme12", name: "声波霓虹风", style: "深紫霓虹", suit: "音乐娱乐 / 潮流活动", audience: "娱乐品牌 / 活动策划", color: "#2a1035", accent: "#e060d0" },
 ]
 
 /** 联系方式 */
 export const CONTACTS = [
   { icon: "💬", label: "微信", value: "TZL_design", desc: "扫码或搜索添加" },
   { icon: "✉️", label: "邮箱", value: "hello@tzlppt.com", desc: "工作日 24h 回复" },
   { icon: "📱", label: "二维码", value: "扫一扫直达", desc: "微信 / 公众号" },
 ]
 
 /** 文件夹堆叠数据（封面颜色、标题、副标题） */
 export const FOLDERS = [
   { cover: "#fce4b8", title: "封面主题", sub: "COVER TITLE" },
   { cover: "#f5d78e", title: "项目展示", sub: "PROJECT SHOWCASE" },
   { cover: "#edc56a", title: "灵感创意", sub: "CREATIVE IDEAS" },
   { cover: "#e4b548", title: "设计成果", sub: "DESIGN WORKS" },
   { cover: "#dba73a", title: "品牌故事", sub: "BRAND STORY" },
 ]
 
 /** 通知显示时长（毫秒） */
 export const NOTICE_DURATION = 2200
 
 /** 文件夹轮播间隔（毫秒） */
 export const CAROUSEL_INTERVAL = 3500