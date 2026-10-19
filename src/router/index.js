// ⚠️ GitHub Pages 部署必须用 hash 模式（静态托管不支持 history 刷新）
// URL 会变成 https://aw2006-aw.github.io/vue-aw/#/home
// 如果需要 history 模式，需要在 public/ 放 404.html 做重定向
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/useUserStore.js'

const routes = [
  // 根路径重定向到首页
  { path: '/', redirect: '/home' },

  // 首页
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: { title: '首页 | 敖旺的个人主页' }
  },

  // 关于页
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
    meta: { title: '关于 | 敖旺的个人主页' }
  },

  // 项目中心（嵌套路由）
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsLayout.vue'),
    meta: { title: '项目中心 | 敖旺的个人主页' },
    children: [
      {
        path: '',
        name: 'ProjectList',
        component: () => import('../views/ProjectListView.vue'),
        meta: { title: '项目列表 | 敖旺的个人主页' }
      },
      // 分类筛选：放在 :id 前面避免被 id 匹配吃掉
      {
        path: 'cat/:cat',
        name: 'ProjectListByCat',
        component: () => import('../views/ProjectListView.vue'),
        meta: { title: '项目列表 | 敖旺的个人主页' }
      },
      {
        path: ':id',
        name: 'ProjectDetail',
        component: () => import('../views/ProjectDetailView.vue'),
        meta: { title: '项目详情 | 敖旺的个人主页' }
      }
    ]
  },

  // 文章中心（嵌套路由）
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/ArticlesLayout.vue'),
    meta: { title: '文章中心 | 敖旺的个人主页' },
    children: [
      {
        path: '',
        name: 'ArticleList',
        component: () => import('../views/ArticleListView.vue'),
        meta: { title: '文章列表 | 敖旺的个人主页' }
      },
      {
        path: 'cat/:cat',
        name: 'ArticleListByCat',
        component: () => import('../views/ArticleListView.vue'),
        meta: { title: '文章列表 | 敖旺的个人主页' }
      },
      {
        path: ':id',
        name: 'ArticleDetail',
        component: () => import('../views/ArticleDetailView.vue'),
        meta: { title: '文章详情 | 敖旺的个人主页' }
      }
    ]
  },

  // 登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '登录 | 敖旺的个人主页' }
  },

  // 后台管理（嵌套路由，需要权限）
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminLayout.vue'),
    meta: { title: '后台管理 | 敖旺的个人主页', requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminProfile',
        component: () => import('../views/AdminProfileEdit.vue'),
        meta: { title: '编辑个人简介 | 后台管理', requiresAuth: true }
      },
      {
        path: 'projects',
        name: 'AdminProjects',
        component: () => import('../views/AdminProjectEdit.vue'),
        meta: { title: '编辑项目信息 | 后台管理', requiresAuth: true }
      },
      {
        path: 'articles',
        name: 'AdminArticles',
        component: () => import('../views/AdminArticleEdit.vue'),
        meta: { title: '编辑文章信息 | 后台管理', requiresAuth: true }
      }
    ]
  },

  // 404 通配符路由（必须放在最后）
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '页面未找到 | 敖旺的个人主页' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// ===== 全局前置守卫 beforeEach =====
router.beforeEach((to, from, next) => {
  // 1. 更新页面标题
  if (to.meta?.title) {
    document.title = to.meta.title
  } else {
    document.title = '敖旺的个人主页'
  }

  // 2. 路由守卫：从 Pinia Store 读取登录状态
  // 守卫内部调用 useUserStore()，确保 Pinia 已初始化
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
