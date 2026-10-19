import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Element Plus 中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
app.use(createPinia())          // Pinia 状态管理（第一次实验）
app.use(router)                 // Vue Router 路由
app.use(ElementPlus, { locale: zhCn })  // Element Plus 组件库（第二次实验）
app.mount('#app')
