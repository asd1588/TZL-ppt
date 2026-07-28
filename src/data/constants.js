 /* ===== 常量数据 =====
 * 集中管理所有页面常量，方便统一修改
 */
 
 /** 导航菜单项 */
 export const NAV = ["首页", "模板类型", "风格", "作品", "定制"]
 
 /** 作品展示卡片数据（4 列 × 3 行 = 4 条，归为 4 类） */
 export const WORKS = [
  {themeId:"theme02",tag:"科技发布",title:"AI 智能科技发布会",desc:"5页 / 紫绿渐变",color:"#b8a0d8",cover:"linear-gradient(135deg,#b8a0d8,#6a9e7a)"},
  {themeId:"theme04",tag:"品牌方案",title:"年轻化消费品牌发布",desc:"5页 / 粉糖果色",color:"#f8c8d8",cover:"linear-gradient(135deg,#f8c8d8,#e88aaa)"},
  {themeId:"theme01",tag:"创业项目",title:"创业项目BP策划方案",desc:"5页 / 温暖米色",color:"#e8dcc8",cover:"linear-gradient(135deg,#e8dcc8,#b8a88a)"},
  {themeId:"theme06",tag:"数据分析",title:"年度数据战略报告",desc:"5页 / 深海军蓝",color:"#1a2332",cover:"linear-gradient(135deg,#1a2332,#4a7c6f)"},
  {themeId:"theme03",tag:"开发者大会",title:"技术架构设计方案",desc:"5页 / 深蓝灰",color:"#2d3445",cover:"linear-gradient(135deg,#2d3445,#5a7d9c)"},
  {themeId:"theme05",tag:"市场分析",title:"市场趋势数据分析",desc:"5页 / 暖黄色谱",color:"#f0e68c",cover:"linear-gradient(135deg,#f0e68c,#d4a373)"},
  {themeId:"theme07",tag:"调研报告",title:"行业调研白皮书",desc:"5页 / 冷白蓝",color:"#eef2f5",cover:"linear-gradient(135deg,#eef2f5,#7a9e9f)"},
  {themeId:"theme08",tag:"高端品牌",title:"高端品牌战略提案",desc:"5页 / 黑金",color:"#1a1a1a",cover:"linear-gradient(135deg,#1a1a1a,#c9a84c)"},
  {themeId:"theme09",tag:"品牌故事",title:"品牌故事叙事方案",desc:"5页 / 深蓝",color:"#0d2137",cover:"linear-gradient(135deg,#0d2137,#5c7d9c)"},
  {themeId:"theme10",tag:"金融报告",title:"基金季度表现报告",desc:"5页 / 暗金",color:"#2a2520",cover:"linear-gradient(135deg,#2a2520,#d4a030)"},
  {themeId:"theme11",tag:"增长策略",title:"用户增长策略方案",desc:"5页 / 深绿亮绿",color:"#1a3a2a",cover:"linear-gradient(135deg,#1a3a2a,#6abf6a)"},
  {themeId:"theme12",tag:"娱乐活动",title:"音乐节品牌企划案",desc:"5页 / 深紫霓虹",color:"#2a1035",cover:"linear-gradient(135deg,#2a1035,#e060d0)"}
];

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