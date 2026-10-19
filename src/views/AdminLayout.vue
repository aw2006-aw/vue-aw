<template>
  <!-- ✅ Element Plus 组件：el-container / el-aside / el-menu / el-header / el-main -->
  <el-container class="admin-container">
    <el-aside width="220px" class="ep-aside">
      <div class="admin-logo">⚙️ 后台管理</div>
      <!-- el-menu 侧边导航 -->
      <el-menu
        :default-active="activeMenu"
        router
        class="admin-menu"
        background-color="#1f2937"
        text-color="#cbd5e1"
        active-text-color="#ffffff"
      >
        <el-menu-item index="/admin">👤 编辑个人信息</el-menu-item>
        <el-menu-item index="/admin/projects">📁 项目管理</el-menu-item>
        <el-menu-item index="/admin/articles">📰 文章管理</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="ep-header">
        <div class="header-content">
          <span>欢迎回来，<strong>{{ userStore.displayName() }}</strong></span>
          <el-button type="danger" size="small" plain @click="handleLogout">🚪 退出登录</el-button>
        </div>
      </el-header>
      <el-main class="ep-admin-main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const activeMenu = computed(() => route.path)

function handleLogout() {
  if (confirm('确认退出登录？')) {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.admin-container { min-height: calc(100vh - 60px); }
.ep-aside {
  background: #1f2937 !important; color: #fff; padding-top: 12px;
}
.admin-logo {
  color: #fff; font-size: 16px; font-weight: 600; padding: 0 20px 16px 20px;
  border-bottom: 1px solid #374151; margin-bottom: 12px; text-align: center;
}
.admin-menu { border-right: none; }
.admin-menu :deep(.el-menu-item.is-active) {
  background: #3b82f6 !important; color: #fff !important;
}
.ep-header {
  background: #fff !important; border-bottom: 1px solid #e5e7eb;
  display: flex; align-items: center; padding: 0 24px;
}
.header-content { width: 100%; display: flex; justify-content: space-between; align-items: center; }
.header-content strong { color: #3b82f6; }
.ep-admin-main { background: #f9fafb; padding: 24px; }
</style>
