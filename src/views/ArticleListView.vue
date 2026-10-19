<template>
  <!-- ✅ Element Plus 组件：el-input / el-tag / el-card / el-empty / el-row / el-col -->
  <div>
    <!-- 搜索 + 分类筛选 -->
    <el-card shadow="hover" class="filter-card">
      <div class="filter-row">
        <el-input
          v-model="keyword"
          placeholder="🔍 搜索文章标题或内容..."
          clearable
          size="large"
          class="search-input"
        />
        <div class="cat-tags">
          <el-tag
            v-for="c in ['全部', ...articleStore.categories]"
            :key="c"
            :type="activeCat === c ? 'success' : 'info'"
            effect="plain"
            round
            class="cat-tag"
            @click="selectCat(c)"
          >{{ c }}</el-tag>
        </div>
      </div>
    </el-card>

    <el-row :gutter="16" class="article-row">
      <el-col :xs="24" :md="12" v-for="a in filtered" :key="a.id">
        <el-card shadow="hover" class="article-card" :body-style="{ padding: '20px' }">
          <div class="card-top">
            <el-tag type="success" effect="dark" round size="small">{{ a.category }}</el-tag>
            <span class="views">👁️ {{ a.views }} 浏览</span>
          </div>
          <h3 class="a-title">{{ a.title }}</h3>
          <p class="a-summary">{{ a.summary }}</p>
          <div class="card-bottom">
            <span class="a-date">📅 {{ a.date }}</span>
            <router-link :to="`/articles/${a.id}`" style="text-decoration:none">
              <el-button type="success" size="small" link>阅读全文 →</el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-if="filtered.length === 0" description="没有匹配的文章" class="empty-area" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/useArticleStore.js'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const keyword = ref('')
const activeCat = computed(() => route.params.cat || '全部')

function selectCat(c) {
  if (c === '全部') router.push('/articles')
  else router.push(`/articles/cat/${c}`)
}

const filtered = computed(() => {
  let list = articleStore.articles
  if (activeCat.value !== '全部') list = list.filter(a => a.category === activeCat.value)
  if (keyword.value.trim()) {
    const k = keyword.value.trim().toLowerCase()
    list = list.filter(a => a.title.toLowerCase().includes(k) || a.content.toLowerCase().includes(k))
  }
  return list
})
</script>

<style scoped>
.filter-card { margin-bottom: 16px; border-radius: 12px; }
.filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.search-input { flex: 1; min-width: 260px; }
.cat-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.cat-tag { cursor: pointer; font-size: 12px; transition: all 0.2s; }
.cat-tag:hover { transform: scale(1.05); }
.article-row { margin-top: 10px; }
.article-card { margin-bottom: 16px; border-radius: 12px; transition: transform 0.2s; }
.article-card:hover { transform: translateY(-2px); }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.views { color: #999; font-size: 12px; }
.a-title { margin: 0 0 6px 0; font-size: 17px; color: #1f2937; }
.a-summary { color: #666; font-size: 13px; margin: 0 0 10px 0; line-height: 1.7; }
.card-bottom { display: flex; justify-content: space-between; align-items: center; }
.a-date { color: #888; font-size: 12px; }
.empty-area { padding: 60px 0; }
</style>
