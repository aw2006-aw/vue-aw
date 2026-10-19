<template>
  <!-- ✅ Element Plus 组件：el-container / el-header / el-menu / el-menu-item / el-aside / el-button -->
  <el-container class="app-container">
    <el-header class="ep-header">
      <div class="header-inner">
        <!-- Logo -->
        <div class="logo">🏠 个人信息主页</div>

        <!-- el-menu 导航菜单（激活自动高亮） -->
        <el-menu
          mode="horizontal"
          :default-active="activeMenu"
          class="ep-menu"
          router
          background-color="transparent"
          text-color="rgba(255,255,255,0.85)"
          active-text-color="#ffffff"
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/projects">项目中心</el-menu-item>
          <el-menu-item index="/articles">文章中心</el-menu-item>
          <el-menu-item index="/about">关于我</el-menu-item>
        </el-menu>

        <!-- 登录/后台 -->
        <div class="auth-area">
          <template v-if="!userStore.isLoggedIn">
            <router-link to="/login">
              <el-button type="info" size="small" text>🔐 登录</el-button>
            </router-link>
          </template>
          <template v-else>
            <span class="user-welcome">👋 {{ userStore.displayName() }}</span>
            <router-link to="/admin">
              <el-button type="warning" size="small">⚙️ 后台</el-button>
            </router-link>
          </template>
        </div>
      </div>
    </el-header>

    <el-main class="ep-main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from './stores/useUserStore.js'

const route = useRoute()
const userStore = useUserStore()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.app-container { min-height: 100vh; background: #edf2f7; }
.ep-header {
  background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%) !important;
  padding: 0;
  height: auto !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.header-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 20px;
  display: flex; align-items: center; gap: 24px; height: 60px;
}
.logo { color: #fff; font-size: 18px; font-weight: 600; white-space: nowrap; }
.ep-menu { flex: 1; border-bottom: none !important; justify-content: center; }
.ep-menu :deep(.el-menu-item) { color: rgba(255,255,255,0.85) !important; }
.ep-menu :deep(.el-menu-item.is-active) {
  background: rgba(255,255,255,0.2) !important;
  color: #fff !important;
  border-bottom: 2px solid #fff !important;
}
.auth-area { display: flex; gap: 10px; align-items: center; }
.user-welcome { color: rgba(255,255,255,0.9); font-size: 13px; }
.ep-main { padding: 0; max-width: 1200px; margin: 0 auto; width: 100%; }
</style>
