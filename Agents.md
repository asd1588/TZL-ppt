 # TZL — PPT定制 · 项目知识库
 
 ## 项目概述
 PPT 灵感展示与定制服务网站。品牌名"TZL"，暖色调手绘风格，PC 优先（版心 1700px）。
 
 ## 技术栈
 - 框架：React 18
 - 构建：Vite 6
 - 语言：JSX + CSS3
 - 插件：@vitejs/plugin-react
 
 ## 目录结构
 ```
 E:\myppt/
 ├── index.html            # Vite 入口 HTML，挂载 #root
 ├── package.json           # 依赖声明 + 脚本命令（dev/build/preview）
 ├── vite.config.js         # Vite 配置（端口 5173，host 0.0.0.0）
 ├── src/
 │   ├── main.jsx           # React 入口：createRoot → render <App/>
 │   ├── App.jsx            # 主组件：所有页面模块集中于此
 │   └── App.css            # 全局样式 + 关键帧动画 + 响应式
 ├── Agents.md              # 本文件：项目知识记录与迭代日志
 ├── 网页设计草图.jpg        # 原始设计手稿来源
 ├── start.mjs              # （遗留）直接启动脚本
 ├── run.bat                # （遗留）双击启动脚本
 ├── node_modules/          # npm 依赖（不手动修改）
 └── public/                # 静态资源目录（当前空）
 ```
 
 ## 模块架构（App.jsx）
 所有组件集中于 App.jsx，通过 CSS 类名分层：
 
 ### 1. Header 导航栏
 - 固定顶部，液态玻璃效果 backdrop-filter
 - 左：品牌 Logo（图标 + "TZLPPT"）
 - 中：搜索框（400px，回车触发通知）
 - 右：导航菜单（首页/模板类型/作品/定制）
 - 「定制」为橙色渐变按钮 .nav-cta-orange
 
 ### 2. Hero 英雄区
 - 暖黄渐变背景 + 径向光晕
 - 左：hero-content 标题+描述（scale 1.2 放大）
 - 中：手绘 doodle（漂移圈 s1-s3 + 闪烁星 sparkle）
 - 左下：虚线轨迹 + 地球自转 + 螺旋桨飞机
 - 右：5 文件夹堆叠（核心交互）
 
 ### 3. 文件夹堆叠（核心）
 - 5 层暖色文件夹（#fce4b8 → #dba73a）
 - 每层：标签 tab + 预览封面 + 标题 + 副标题
 - 使用 CSS 变量 --idx 控制偏移/层级
 - 自动轮播 3.5s，顶层文件夹轮换到底层
 - hover 暂停轮播，展开扇形（±10° 左下角为圆心）
 - 顶层 folder（--idx=0）自带 -5° 左偏
 
 ### 4. 作品展示
 - 4 列网格卡片，入场淡入（错开 0.12s）
 - 每卡：抽象色块（呼吸脉冲）+ 标签 + 标题 + 描述
 - hover 上移 + 阴影加深
 
 ### 5. 通知条
 - 固定底部，show() 触发，2.2s 自动消失
 
 ## 数据流
 ```
 FOLDERS 数组
   → 循环计算 relIdx = (i - topIdx + 5) % 5
   → 动态 --idx
   → CSS 控制 top/left/z-index/transform
 ```
 setInterval 3.5s 更新 topIdx，onMouseEnter/Leave 控制启停。
 
 ## 设计系统
 --ink:#2d3445 | --cream:#fff9ea | --yellow:#ffd643 | --orange:#ff8a3d | --blue:#347ee8
 
 ## 动画清单
 - drift1-3：圆漂移 5-6s | sparklePulse：星闪烁 4s
 - planeGlide：飞机摇摆 4s | propSpin：螺旋桨旋转 0.35s
 - earthSpin：地球自转 20s | artPulse：色块呼吸 4s
 - cardEnter/fadeUp：卡片淡入 0.6s（错开 0.12s）
 - folder hover 扇形展开：0.5s 弹性曲线
 
 ## 响应式断点
 ≤1300px：缩放文件夹 / ≤1200px：隐藏文件夹/虚线/飞机
 ≤900px：隐藏导航 / ≤520px：画廊单列、Logo缩小
 
 ## 开发命令
 npm run dev（localhost:5173）/ npm run build / npm run preview
 
 ## 迭代日志
 1. 初始：从手稿草图构建 Yellow Folder PPT 灵感站
 2. 改名 TZL — PPT定制，重构 Header 布局
 3. 删除文件夹轮换动画 → 恢复 → 加入 Carousel 轮播
 4. 多次调整文件夹位置（right:50→80→130→180px，下移50px）
 5. 文件夹放大20%，左侧文字放大20%
 6. 左下角为圆心 -5° 偏转，轮播到顶层自动保持
 7. 删除"作品定制"按钮 → 加入虚线轨迹 + 螺旋桨飞机
 8. 加入手绘 doodle（漂移圈 + 闪烁星）
 9. 「定制」改为橙色按钮
 10. CSS 简化解决白屏问题
