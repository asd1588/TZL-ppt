 /* ===== 常量数据 =====
 * 集中管理所有页面常量，方便统一修改
 */
 
 /** 导航菜单项 */
 export const NAV = ["首页", "模板类型", "作品", "定制"]
 
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
   { icon: "📊", label: "品牌提案" },
   { icon: "📈", label: "数据报告" },
   { icon: "🎨", label: "创意策划" },
   { icon: "📝", label: "教育培训" },
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