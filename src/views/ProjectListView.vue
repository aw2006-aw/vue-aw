<template>
  <!-- ✅ Element Plus 组件：el-row / el-col / el-card / el-tag / el-button / el-empty -->
  <div>
    <!-- 顶部统计 -->
    <el-row :gutter="12" class="stat-row">
      <el-col :span="6">
        <el-tag type="primary" effect="dark" size="large" round class="stat-tag">📊 共 {{ projectStore.totalCount }} 个</el-tag>
      </el-col>
      <el-col :span="6">
        <el-tag type="success" effect="dark" size="large" round class="stat-tag">✅ 已完成 {{ projectStore.finishedCount }}</el-tag>
      </el-col>
      <el-col :span="6">
        <el-tag type="warning" effect="dark" size="large" round class="stat-tag">🔄 进行中 {{ projectStore.processCount }}</el-tag>
      </el-col>
      <el-col :span="6">
        <el-tag type="info" effect="dark" size="large" round class="stat-tag">⏳ 计划中 {{ projectStore.planCount }}</el-tag>
      </el-col>
    </el-row>

    <el-row v-if="filtered.length === 0">
      <el-col :span="24">
        <el-empty description="暂无项目" />
      </el-col>
    </el-row>

    <el-row :gutter="16" class="card-row">
      <el-col :xs="24" :sm="12" :md="8" v-for="p in filtered" :key="p.id">
        <el-card shadow="hover" class="project-card" :body-style="{ padding: '20px' }">
          <div class="card-top">
            <h3 class="p-title">{{ p.title }}</h3>
            <el-tag :type="statusTagType(p.statusClass)" effect="dark" round size="small">
              {{ p.statusText }}
            </el-tag>
          </div>
          <p class="p-desc">{{ p.desc }}</p>
          <div class="p-tags">
            <el-tag v-for="t in p.tags" :key="t" size="small" effect="plain" class="mini-tag">{{ t }}</el-tag>
          </div>
          <el-divider class="mini-divider" />
          <div class="card-bottom">
            <span class="p-duration">🕐 {{ p.duration }}</span>
            <router-link :to="`/projects/${p.id}`" style="text-decoration:none">
              <el-button type="primary" size="small" link>查看详情 →</el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/useProjectStore.js'

const route = useRoute()
const projectStore = useProjectStore()

const filtered = computed(() => {
  const cat = route.params.cat
  if (!cat) return projectStore.projects
  return projectStore.projects.filter(p => p.tags.includes(cat))
})

function statusTagType(c) {
  const map = { finish: 'success', process: 'primary', plan: 'info' }
  return map[c] || 'info'
}
</script>

<style scoped>
.stat-row { margin-bottom: 16px; }
.stat-tag { width: 100%; text-align: center; }
.card-row { margin-top: 10px; }
.project-card { margin-bottom: 16px; border-radius: 12px; transition: transform 0.2s; }
.project-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 8px; }
.p-title { margin: 0; font-size: 16px; color: #1f2937; }
.p-desc { color: #666; font-size: 13px; margin: 0 0 10px 0; line-height: 1.6; }
.p-tags { display: flex; flex-wrap: wrap; gap: 4px; }
.mini-tag { font-size: 11px; }
.mini-divider { margin: 12px 0; }
.card-bottom { display: flex; justify-content: space-between; align-items: center; }
.p-duration { color: #888; font-size: 12px; }
</style>
