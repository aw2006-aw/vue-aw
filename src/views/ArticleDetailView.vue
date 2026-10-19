<template>
  <!-- ✅ Element Plus 组件：el-card / el-tag / el-button / el-empty / el-divider -->
  <div>
    <el-button text icon="ArrowLeft" @click="$router.back()" class="back-btn">返回文章列表</el-button>

    <el-card v-if="article" class="detail-card" shadow="hover">
      <div class="detail-header">
        <h1>{{ article.title }}</h1>
        <div class="meta">
          <el-tag type="success" effect="dark" round size="small">{{ article.category }}</el-tag>
          <span class="meta-item">📅 {{ article.date }}</span>
          <span class="meta-item">👁️ {{ displayViews }} 浏览</span>
        </div>
      </div>
      <el-divider />
      <div class="article-body">{{ article.content }}</div>
    </el-card>

    <el-empty v-else description="文章不存在" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/useArticleStore.js'

const route = useRoute()
const articleStore = useArticleStore()

// ✅ computed 保持纯查询（不能调 getById，因为它有 views+1 的 side effect）
const article = computed(() => articleStore.articles.find(a => a.id === Number(route.params.id)))
const displayViews = ref(article.value?.views || 0)

// 浏览量 +1 放到生命周期里
function bumpView() {
  const a = articleStore.getById(Number(route.params.id))  // Store 内自动 +1
  if (a) displayViews.value = a.views
}

onMounted(bumpView)
watch(() => route.params.id, bumpView)
</script>

<style scoped>
.back-btn { margin-bottom: 12px; }
.detail-card { border-radius: 12px; }
.detail-header { text-align: center; padding: 10px 0 6px 0; }
.detail-header h1 { margin: 0 0 10px 0; font-size: 24px; color: #1f2937; }
.meta { display: flex; gap: 12px; justify-content: center; align-items: center; }
.meta-item { color: #888; font-size: 13px; }
.article-body { white-space: pre-wrap; line-height: 2; color: #374151; font-size: 15px; padding: 10px 0; }
</style>
