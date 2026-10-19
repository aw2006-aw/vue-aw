import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Pinia Store：项目数据管理
const STORAGE_KEY = 'pinia_projects'

const defaultProjects = [
  {
    id: 1, color: '#3b68f5', headerText: '个',
    title: '个人主页网站', desc: '基于 Vue3 组合式 API 的响应式个人主页，支持技能搜索与详情展开。',
    statusText: '已完成', statusClass: 'finish', tags: ['Vue 3', 'Vite'],
    detail: '这是我使用 Vue3 + Vite 构建的第一个完整个人主页项目，使用了组合式 API、组件化开发、Router 路由管理等技术。',
    tech: ['Vue 3', 'Vite', 'JavaScript', 'CSS3'], duration: '2025.09 - 2025.10'
  },
  {
    id: 2, color: '#ff784f', headerText: '待',
    title: '待办事项应用', desc: '支持任务增删改、状态筛选与localStorage本地持久化的Todo应用。',
    statusText: '进行中', statusClass: 'process', tags: ['Vue 3', 'Pinia'],
    detail: '一个轻量级的待办事项管理应用，使用 Pinia 进行全局状态管理。',
    tech: ['Vue 3', 'Pinia', 'localStorage'], duration: '2025.10 - 至今'
  },
  {
    id: 3, color: '#22c5aa', headerText: '天',
    title: '天气查询应用', desc: '调用第三方天气API，根据城市名称实时查询天气。',
    statusText: '计划中', statusClass: 'plan', tags: ['Fetch API', 'Axios'],
    detail: '计划开发的天气查询应用，将接入和风天气 API。',
    tech: ['Vue 3', 'Axios'], duration: '计划中'
  },
  {
    id: 4, color: '#9061f9', headerText: '图',
    title: '图书管理系统', desc: '课程设计项目：实现图书信息增删改查。',
    statusText: '已完成', statusClass: 'finish', tags: ['Python', 'Flask'],
    detail: '基于 Python Flask + SQLite 数据库实现，支持图书录入、借阅登记等。',
    tech: ['Python', 'Flask', 'SQLite'], duration: '2025.06 - 2025.07'
  }
]

// 修复：空数组也 fallback 到默认数据
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {}
  return null
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useProjectStore = defineStore('projects', () => {
  const projects = ref(loadFromStorage() || JSON.parse(JSON.stringify(defaultProjects)))

  // getters
  const finishedCount = computed(() => projects.value.filter(p => p.statusClass === 'finish').length)
  const processCount = computed(() => projects.value.filter(p => p.statusClass === 'process').length)
  const planCount = computed(() => projects.value.filter(p => p.statusClass === 'plan').length)
  const totalCount = computed(() => projects.value.length)
  // categories：基于 tags 提取所有唯一标签（作为分类）
  const categories = computed(() => {
    const set = new Set()
    projects.value.forEach(p => p.tags.forEach(t => set.add(t)))
    return [...set]
  })

  // actions
  function getById(id) {
    return projects.value.find(p => p.id === Number(id))
  }

  function add(project) {
    const maxId = projects.value.reduce((max, p) => Math.max(max, p.id), 0)
    const newProject = {
      id: maxId + 1,
      color: '#3b68f5',
      headerText: project.title?.charAt(0) || '新',
      title: project.title || '新项目',
      desc: project.desc || '',
      statusText: project.statusText || '计划中',
      statusClass: project.statusClass || 'plan',
      tags: project.tags || [],
      detail: project.detail || '暂无详细描述',
      tech: project.tech || [],
      duration: project.duration || '未填写'
    }
    projects.value.push(newProject)
    saveToStorage(projects.value)
    return newProject
  }

  function update(id, patch) {
    const idx = projects.value.findIndex(p => p.id === Number(id))
    if (idx !== -1) {
      projects.value[idx] = { ...projects.value[idx], ...patch }
      saveToStorage(projects.value)
      return projects.value[idx]
    }
    return null
  }

  function remove(id) {
    const before = projects.value.length
    projects.value = projects.value.filter(p => p.id !== Number(id))
    if (projects.value.length < before) {
      saveToStorage(projects.value)
      return true
    }
    return false
  }

  function reset() {
    projects.value = JSON.parse(JSON.stringify(defaultProjects))
    saveToStorage(projects.value)
  }

  return {
    projects, finishedCount, processCount, planCount, totalCount, categories,
    getById, add, update, remove, reset
  }
})
