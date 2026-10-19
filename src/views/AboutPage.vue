<template>
  <!-- ✅ Element Plus 组件：el-card / el-avatar / el-tag / el-divider / el-empty / el-timeline / el-descriptions -->
  <div class="about-wrap">
    <el-card shadow="hover" class="about-card">
      <div class="about-inner">
        <el-avatar :size="120" :src="userStore.profile.avatar" class="big-avatar" />
        <div class="about-info">
          <h1>{{ userStore.profile.name }}</h1>
          <p class="class-badge">{{ userStore.profile.className }}</p>
          <p class="intro">{{ userStore.profile.intro }}</p>
          <div class="skill-tags">
            <el-tag
              v-for="(s, i) in userStore.profile.skills"
              :key="i"
              :type="tagTypes[i % 5]"
              effect="plain"
              round
            >{{ s }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>

    <el-row :gutter="16" class="two-col">
      <el-col :xs="24" :md="12">
        <el-card shadow="hover">
          <template #header>
            <span class="card-title">🎓 教育经历</span>
          </template>
          <el-timeline>
            <el-timeline-item timestamp="2023 - 至今" type="primary">
              <h4>计算机科学与技术</h4>
              <p>本科在读，主修课程：数据结构、操作系统、计算机网络、数据库原理</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-card shadow="hover">
          <template #header>
            <span class="card-title">🎯 兴趣爱好</span>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="📚 阅读">技术书籍、科幻小说、人文历史</el-descriptions-item>
            <el-descriptions-item label="🏃 运动">篮球、跑步、羽毛球</el-descriptions-item>
            <el-descriptions-item label="🎨 其他">摄影、旅行、美食探索</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/useUserStore.js'
const userStore = useUserStore()
const tagTypes = ['primary', 'success', 'warning', 'danger', 'info']
</script>

<style scoped>
.about-wrap { padding: 20px; }
.about-card { border-radius: 12px; margin-bottom: 20px; }
.about-inner {
  display: flex; gap: 28px; align-items: center;
  background: linear-gradient(120deg, #fef3c7 0%, #e0f2fe 100%);
  padding: 30px; border-radius: 12px;
}
.big-avatar { border: 5px solid #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.about-info h1 { margin: 0 0 6px 0; color: #1f2937; font-size: 24px; }
.class-badge { color: #2563eb; font-weight: 500; margin: 0 0 8px 0; font-size: 14px; }
.intro { color: #555; line-height: 1.7; margin: 0 0 12px 0; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.two-col { margin-top: 0; }
.two-col :deep(.el-card) { border-radius: 12px; }
.card-title { font-weight: 600; }
.el-timeline h4 { margin: 0 0 4px 0; color: #333; font-size: 14px; }
.el-timeline p { margin: 0; color: #666; font-size: 13px; line-height: 1.6; }
</style>
