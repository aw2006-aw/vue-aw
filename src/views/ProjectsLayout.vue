<template>
  <!-- ✅ Element Plus 组件：el-container / el-aside / el-card / el-menu / el-menu-item / el-badge -->
  <el-container class="projects-layout">
    <!-- 左侧 Aside：子路由导航 -->
    <el-aside width="200px" class="ep-aside">
      <el-card shadow="hover" class="nav-card">
        <template #header>
          <div class="nav-header">📁 项目中心</div>
        </template>
        <div class="side-nav">
          <router-link
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="side-link"
            active-class="active"
            exact
          >
            {{ link.label }}
            <span v-if="link.count !== undefined" class="link-count">{{ link.count }}</span>
          </router-link>
        </div>
      </el-card>
    </el-aside>

    <!-- 右侧 Main -->
    <el-main class="ep-main-area">
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/useProjectStore.js'

const route = useRoute()
const projectStore = useProjectStore()

const links = computed(() => [
  { path: '/projects', label: '全部项目', count: projectStore.totalCount },
  ...projectStore.categories.map(cat => ({
    path: `/projects/cat/${cat}`,
    label: cat,
    count: undefined
  }))
])
</script>

<style scoped>
.projects-layout { min-height: calc(100vh - 60px); padding: 20px; gap: 16px; }
.ep-aside { background: transparent; }
.nav-card { border-radius: 12px; }
.nav-header { font-weight: 600; color: #333; }
.ep-main-area { padding: 0; }
.side-nav { display: flex; flex-direction: column; gap: 2px; }
.side-link {
  padding: 9px 14px; color: #555; text-decoration: none;
  border-radius: 6px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;
  transition: all 0.15s;
}
.side-link:hover { background: #f1f5f9; color: #333; }
.side-link.active {
  background: #eff6ff; color: #3b82f6; font-weight: 500;
  border-left: 3px solid #3b82f6; border-radius: 0 6px 6px 0;
}
.link-count {
  background: #e2e8f0; color: #64748b;
  padding: 1px 8px; border-radius: 10px; font-size: 11px;
}
</style>
