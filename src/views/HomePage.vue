<template>
  <!-- ✅ Element Plus 组件：el-container / el-card / el-avatar / el-button / el-tag / el-timeline / el-timeline-item / el-divider -->
  <el-container class="home-wrap">
    <!-- 顶部 Banner -->
    <el-card class="banner-card" shadow="never">
      <div class="banner-inner">
        <el-avatar :size="110" :src="userStore.profile.avatar" class="avatar" />
        <div class="banner-info">
          <h1>你好，我是 {{ userStore.profile.name }} 👋</h1>
          <p class="class-badge">{{ userStore.profile.className }}</p>
          <p class="intro">{{ userStore.profile.intro }}</p>
          <div class="skill-tags">
            <el-tag
              v-for="(s, i) in userStore.profile.skills"
              :key="i"
              :type="tagTypes[i % 5]"
              effect="plain"
              round
              class="skill-tag"
            >{{ s }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>

    <div class="two-col">
      <!-- 左侧：个人简介 + 时间线（指导书核心要求） -->
      <el-card class="col-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>📅 个人经历时间线</span>
            <el-divider direction="vertical" />
            <span class="sub">el-timeline 组件</span>
          </div>
        </template>
        <!-- ✅ el-timeline 时间线 -->
        <el-timeline class="ep-timeline">
          <el-timeline-item
            v-for="(e, idx) in experiences"
            :key="idx"
            :timestamp="e.time"
            :type="e.type"
            :hollow="e.hollow"
            :icon="e.icon"
            :color="e.color"
          >
            <h4>{{ e.title }}</h4>
            <p class="exp-desc">{{ e.desc }}</p>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <!-- 右侧：统计数据 + 快速入口 -->
      <el-card class="col-card" shadow="hover">
        <template #header>
          <div class="card-header"><span>📊 数据概览</span></div>
        </template>
        <div class="stats-grid">
          <div class="stat-item stat-blue">
            <div class="stat-num">{{ projectStore.totalCount }}</div>
            <div class="stat-label">总项目数</div>
          </div>
          <div class="stat-item stat-green">
            <div class="stat-num">{{ projectStore.finishedCount }}</div>
            <div class="stat-label">已完成项目</div>
          </div>
          <div class="stat-item stat-orange">
            <div class="stat-num">{{ projectStore.processCount }}</div>
            <div class="stat-label">进行中项目</div>
          </div>
          <div class="stat-item stat-purple">
            <div class="stat-num">{{ articleStore.totalViews }}</div>
            <div class="stat-label">文章总浏览</div>
          </div>
        </div>
        <el-divider />
        <div class="quick-entry">
          <router-link to="/projects" style="text-decoration:none">
            <el-button type="primary">📁 查看我的项目</el-button>
          </router-link>
          <router-link to="/articles" style="text-decoration:none">
            <el-button type="success">📰 浏览我的文章</el-button>
          </router-link>
          <router-link to="/about" style="text-decoration:none">
            <el-button type="info">ℹ️ 了解更多</el-button>
          </router-link>
        </div>
      </el-card>
    </div>
  </el-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/useUserStore.js'
import { useProjectStore } from '../stores/useProjectStore.js'
import { useArticleStore } from '../stores/useArticleStore.js'

const userStore = useUserStore()
const projectStore = useProjectStore()
const articleStore = useArticleStore()

const tagTypes = ['primary', 'success', 'warning', 'danger', 'info']

// ✅ el-timeline 展示的个人经历数据
const experiences = [
  { time: '2023-09', title: '🎓 入学计算机专业', desc: '开始系统学习计算机基础知识、编程与算法', type: 'primary', hollow: false, color: '#409EFF' },
  { time: '2024-03', title: '💻 初识 Vue 框架', desc: '学习 Vue2 响应式原理，完成第一个组件化页面', type: 'success', hollow: false, color: '#67C23A' },
  { time: '2024-07', title: '🏆 完成第一个项目', desc: '使用 Vue3 + Vite 构建个人博客，部署上线', type: 'warning', hollow: true, color: '#E6A23C' },
  { time: '2024-12', title: '🚀 学习 Pinia 状态管理', desc: '深入理解集中式状态管理，实现跨组件数据共享', type: 'danger', hollow: false, color: '#F56C6C' },
  { time: '2025-04', title: '🎨 掌握 Element Plus', desc: '熟练使用组件库高效构建规范、美观的前端页面', type: 'primary', hollow: true, color: '#909399' },
  { time: '至今', title: '📚 持续学习中', desc: '探索前端工程化、TypeScript、Node.js 后端开发', type: 'primary', hollow: false, color: '#409EFF' }
]
</script>

<style scoped>
.home-wrap { padding: 20px; }
.banner-card { margin-bottom: 20px; border-radius: 12px; }
.banner-card :deep(.el-card__body) { padding: 0; }
.banner-inner {
  padding: 30px 36px;
  background: linear-gradient(120deg, #e0f2fe 0%, #fef3c7 100%);
  display: flex; gap: 28px; align-items: center; border-radius: 12px;
}
.avatar { border: 4px solid #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.banner-info h1 { font-size: 24px; margin: 0 0 6px 0; color: #1f2937; }
.class-badge { color: #2563eb; font-weight: 500; margin: 0 0 8px 0; font-size: 14px; }
.intro { color: #555; line-height: 1.7; margin: 0 0 12px 0; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.skill-tag { font-size: 12px; }

.two-col { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; }
@media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }
.col-card { border-radius: 12px; }
.card-header { font-weight: 600; color: #333; font-size: 15px; display: flex; align-items: center; }
.card-header .sub { font-size: 12px; color: #888; font-weight: normal; }

.ep-timeline { padding: 6px 0; }
.ep-timeline h4 { margin: 0 0 4px 0; color: #333; font-size: 14px; }
.exp-desc { margin: 0; color: #666; font-size: 13px; line-height: 1.6; }

.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.stat-item { padding: 18px; border-radius: 10px; text-align: center; }
.stat-num { font-size: 26px; font-weight: 700; color: #fff; }
.stat-label { color: rgba(255,255,255,0.9); font-size: 13px; margin-top: 4px; }
.stat-blue { background: linear-gradient(135deg, #60a5fa, #2563eb); }
.stat-green { background: linear-gradient(135deg, #34d399, #059669); }
.stat-orange { background: linear-gradient(135deg, #fbbf24, #d97706); }
.stat-purple { background: linear-gradient(135deg, #a78bfa, #7c3aed); }

.quick-entry { display: flex; flex-direction: column; gap: 10px; }
</style>
