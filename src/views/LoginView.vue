<template>
  <!-- ✅ Element Plus 组件：el-card / el-form / el-form-item / el-input / el-button / el-message -->
  <div class="login-page">
    <el-card class="login-card" shadow="hover">
      <div class="login-header">
        <h2>🔐 后台登录</h2>
        <p class="subtitle">请输入管理员账号</p>
      </div>

      <el-form
        ref="formRef"
        :model="credentials"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="credentials.username"
            placeholder="请输入用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="credentials.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            @click="handleLogin"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <el-divider />
      <div class="tip-box">
        <el-alert type="info" :closable="false" show-icon title="💡 默认账号">
          <template #default>
            用户名：<code>admin</code> ，密码：<code>123456</code>
          </template>
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/useUserStore.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const credentials = reactive({ username: '', password: '' })
const loading = ref(false)
const formRef = ref(null)

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

function handleLogin() {
  formRef.value?.validate((valid) => {
    if (!valid) return
    loading.value = true
    setTimeout(() => {
      if (userStore.login(credentials.username, credentials.password)) {
        ElMessage.success('✅ 登录成功')
        const redirect = route.query.redirect || '/admin'
        router.push(redirect)
      } else {
        ElMessage.error('❌ 用户名或密码错误')
      }
      loading.value = false
    }, 400)
  })
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 60px);
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #e0f2fe 0%, #fef3c7 50%, #fce7f3 100%);
  padding: 20px;
}
.login-card { width: 400px; border-radius: 16px; }
.login-header { text-align: center; margin-bottom: 20px; }
.login-header h2 { margin: 0 0 6px 0; color: #1f2937; font-size: 22px; }
.subtitle { color: #888; font-size: 13px; margin: 0; }
.login-btn { width: 100%; }
.tip-box :deep(.el-alert) { border-radius: 8px; }
.tip-box code {
  background: #f3f4f6; padding: 1px 6px; border-radius: 4px;
  font-size: 12px; font-family: monospace;
}
</style>
