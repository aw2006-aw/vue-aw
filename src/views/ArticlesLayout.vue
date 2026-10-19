<template>
  <!-- ✅ Element Plus 组件：el-container / el-aside / el-card / el-menu / el-menu-item / el-badge -->
  <el-container class="articles-layout">
    <el-aside width="200px" class="ep-aside">
      <el-card shadow="hover" class="nav-card">
        <template #header>
          <div class="nav-header">📰 文章中心</div>
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
    <el-main class="ep-main-area">
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useArticleStore } from '../stores/useArticleStore.js'

const articleStore = useArticleStore()

const links = computed(() => [
  { path: '/articles', label: '全部文章', count: articleStore.totalCount },
  ...articleStore.categories.map(cat => ({
    path: `/articles/cat/${cat}`,
    label: cat,
    count: undefined
  }))
])
</script>

<style scoped>
.articles-layout { min-height: calc(100vh - 60px); padding: 20px; gap: 16px; }
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
.side-link:hover { background: #ecfdf5; color: #065f46; }
.side-link.active {
  background: #ecfdf5; color: #10b981; font-weight: 500;
  border-left: 3px solid #10b981; border-radius: 0 6px 6px 0;
}
.link-count {
  background: #d1fae5; color: #047857;
  padding: 1px 8px; border-radius: 10px; font-size: 11px;
}
</style>
