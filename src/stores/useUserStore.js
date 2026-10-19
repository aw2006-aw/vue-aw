import { defineStore } from 'pinia'
import { ref } from 'vue'

// Pinia Store：用户登录状态 + 个人信息
// 替换原 utils/auth.js，并统一管理个人简介数据（跨页面共享）
export const useUserStore = defineStore('user', () => {
  // ===== state =====
  // 登录状态（持久化）
  const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
  const username = ref(localStorage.getItem('username') || '')

  // 个人信息（持久化，供首页/关于页/后台编辑页共享）
  const profile = ref(JSON.parse(localStorage.getItem('userProfile') || null) || {
    avatar: 'https://picsum.photos/id/1012/140/140',
    name: '敖旺',
    className: '24计科1班',
    intro: '热爱前端开发，喜欢Vue框架，爱好阅读、跑步，乐于学习新技术。',
    skills: ['Vue3', 'HTML', 'CSS', 'JavaScript', 'Python', '数据库', '摄影', '篮球']
  })

  // ===== getters =====
  const displayName = () => username.value || '未登录'

  // ===== actions =====
  function login(user, pass) {
    if (user === 'admin' && pass === '123456') {
      isLoggedIn.value = true
      username.value = user
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', user)
      return true
    }
    return false
  }

  function logout() {
    isLoggedIn.value = false
    username.value = ''
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
  }

  // 更新个人简介（持久化）
  function updateProfile(patch) {
    profile.value = { ...profile.value, ...patch }
    localStorage.setItem('userProfile', JSON.stringify(profile.value))
  }

  return {
    isLoggedIn, username, profile, displayName,
    login, logout, updateProfile
  }
})
