<template>
  <!-- ✅ Element Plus 组件：el-card / el-tag / el-descriptions / el-button / el-empty / el-steps -->
  <div>
    <el-button text icon="ArrowLeft" @click="$router.back()" class="back-btn">返回项目列表</el-button>

    <el-card v-if="project" class="detail-card" shadow="hover">
      <div class="detail-header">
        <div class="header-left">
          <h1>{{ project.title }}</h1>
          <el-tag :type="statusType" effect="dark" round>{{ project.statusText }}</el-tag>
        </div>
        <div class="header-right">
          <el-tag v-for="t in project.tags" :key="t" effect="plain" class="detail-tag">{{ t }}</el-tag>
        </div>
      </div>

      <el-descriptions title="项目信息" :column="2" border class="info-desc">
        <el-descriptions-item label="项目 ID">#{{ project.id }}</el-descriptions-item>
        <el-descriptions-item label="开发周期">🕐 {{ project.duration }}</el-descriptions-item>
        <el-descriptions-item label="项目简介" :span="2">{{ project.desc }}</el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="left">📝 详细描述</el-divider>
      <div class="detail-body">{{ project.detail }}</div>

      <el-divider content-position="left">🗓️ 项目阶段</el-divider>
      <el-steps :active="activeStep" finish-status="success" align-center>
        <el-step title="需求分析" description="明确目标" />
        <el-step title="方案设计" description="技术选型" />
        <el-step title="编码实现" description="核心功能" />
        <el-step title="测试部署" description="上线验证" />
      </el-steps>
    </el-card>

    <el-empty v-else description="项目不存在" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/useProjectStore.js'

const route = useRoute()
const projectStore = useProjectStore()

// getById(skipView=true) 纯查询，不增加浏览量（浏览量逻辑移到 ArticleDetailView）
const project = computed(() => projectStore.getById(Number(route.params.id), true))
const statusType = computed(() => ({ finish: 'success', process: 'primary', plan: 'info' })[project.value?.statusClass] || 'info')
const activeStep = computed(() => ({ finish: 4, process: 3, plan: 1 })[project.value?.statusClass] || 1)
</script>

<style scoped>
.back-btn { margin-bottom: 12px; }
.detail-card { border-radius: 12px; }
.detail-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
.header-left { display: flex; align-items: center; gap: 12px; }
.header-left h1 { margin: 0; font-size: 22px; color: #1f2937; }
.header-right { display: flex; gap: 6px; flex-wrap: wrap; }
.detail-tag { font-size: 12px; }
.info-desc { margin-top: 20px; }
.detail-body { white-space: pre-wrap; line-height: 1.8; color: #444; font-size: 14px; }
</style>
