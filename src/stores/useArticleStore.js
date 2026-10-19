import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Pinia Store：文章数据管理
// 支持增删改查 + localStorage 持久化
const STORAGE_KEY = 'pinia_articles'

const defaultArticles = [
  {
    id: 1,
    title: 'Vue3 组合式 API 入门指南',
    category: '前端开发',
    author: '敖旺',
    date: '2026-10-01',
    summary: '从零开始学习 Vue3 的组合式 API，理解 setup、ref、reactive 等核心概念。',
    content: `# Vue3 组合式 API 入门指南

## 什么是组合式 API
Vue3 引入的组合式 API 让我们可以更好地组织组件逻辑。

## 核心概念
- ref：包装基本类型为响应式
- reactive：包装对象为响应式
- computed：计算属性
- watch / watchEffect：监听变化

## 示例代码
\`\`\`js
import { ref, computed } from 'vue'

export function useCounter() {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  const increment = () => count.value++
  return { count, double, increment }
}
\`\`\`

## 总结
组合式 API 在逻辑复用和类型推断方面有明显优势。`,
    tags: ['Vue3', 'Composition API'],
    views: 128
  },
  {
    id: 2,
    title: 'Vue Router 路由守卫实战',
    category: '前端开发',
    author: '敖旺',
    date: '2026-10-05',
    summary: '深入理解 beforeEach 全局前置守卫，实现登录验证、标题更新、权限控制。',
    content: `# Vue Router 路由守卫实战

## 全局前置守卫示例
\`\`\`js
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '默认标题'
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
\`\`\`

## 配合 Pinia Store
在 beforeEach 内部调用 useXxxStore，确保 Pinia 已初始化。`,
    tags: ['Vue Router', '导航守卫'],
    views: 256
  },
  {
    id: 3,
    title: 'Pinia 状态管理完全指南',
    category: '状态管理',
    author: '敖旺',
    date: '2026-10-10',
    summary: '从 state、getters、actions 到持久化，全面掌握 Pinia 的使用方法。',
    content: `# Pinia 状态管理完全指南

## Store 三要素
\`\`\`js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)                  // state
  const double = computed(() => count.value * 2)  // getter
  function increment() { count.value++ }          // action
  return { count, double, increment }
})
\`\`\`

## storeToRefs 保持响应式解构
\`\`\`js
const store = useCounterStore()
const { count, double } = storeToRefs(store)
\`\`\`

## localStorage 持久化
state 初始化时从 localStorage 读取，actions 修改后写入。`,
    tags: ['Pinia', '状态管理'],
    views: 89
  }
]

// 修复：空数组也 fallback 到默认数据
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // 如果是有效数组且非空，返回之；否则 fallback
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {}
  return null
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useArticleStore = defineStore('articles', () => {
  // ===== state =====
  const articles = ref(loadFromStorage() || JSON.parse(JSON.stringify(defaultArticles)))

  // ===== getters =====
  const totalCount = computed(() => articles.value.length)
  const sortedByDate = computed(() =>
    [...articles.value].sort((a, b) => b.date.localeCompare(a.date))
  )
  const categories = computed(() => {
    const set = new Set(articles.value.map(a => a.category))
    return [...set]
  })
  const totalViews = computed(() =>
    articles.value.reduce((sum, a) => sum + (a.views || 0), 0)
  )

  // ===== actions =====
  // skipView=true 时不自动 +1 浏览量（供外部手动 +1 使用）
  function getById(id, skipView = false) {
    const article = articles.value.find(a => a.id === Number(id))
    if (article && !skipView) {
      article.views = (article.views || 0) + 1
      saveToStorage(articles.value)
    }
    return article
  }

  function add(article) {
    const maxId = articles.value.reduce((max, a) => Math.max(max, a.id), 0)
    const newArticle = {
      id: maxId + 1,
      title: article.title || '无标题',
      category: article.category || '未分类',
      author: article.author || '敖旺',
      date: article.date || new Date().toISOString().slice(0, 10),
      summary: article.summary || '',
      content: article.content || '',
      tags: article.tags || [],
      views: 0
    }
    articles.value.push(newArticle)
    saveToStorage(articles.value)
    return newArticle
  }

  function update(id, patch) {
    const idx = articles.value.findIndex(a => a.id === Number(id))
    if (idx !== -1) {
      articles.value[idx] = { ...articles.value[idx], ...patch }
      saveToStorage(articles.value)
      return articles.value[idx]
    }
    return null
  }

  function remove(id) {
    const before = articles.value.length
    articles.value = articles.value.filter(a => a.id !== Number(id))
    if (articles.value.length < before) {
      saveToStorage(articles.value)
      return true
    }
    return false
  }

  function reset() {
    articles.value = JSON.parse(JSON.stringify(defaultArticles))
    saveToStorage(articles.value)
  }

  return {
    articles,
    totalCount,
    sortedByDate,
    categories,
    totalViews,
    getById,
    add,
    update,
    remove,
    reset
  }
})
