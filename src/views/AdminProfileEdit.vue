<template>
  <!-- ✅ Element Plus 组件：el-card / el-form / el-form-item / el-input / el-button / el-message -->
  <el-card shadow="hover" class="admin-card">
    <template #header>
      <span class="card-title">👤 编辑个人简介</span>
    </template>

    <el-form
      ref="formRef"
      :model="local"
      :rules="rules"
      label-width="90px"
      class="profile-form"
      @submit.prevent="saveProfile"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="local.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="班级" prop="className">
        <el-input v-model="local.className" placeholder="请输入班级" />
      </el-form-item>
      <el-form-item label="头像 URL">
        <el-input v-model="local.avatar" placeholder="图片链接" />
      </el-form-item>
      <el-form-item label="个人简介" prop="intro">
        <el-input
          v-model="local.intro"
          type="textarea"
          :rows="4"
          placeholder="介绍一下自己吧..."
        />
      </el-form-item>
      <el-form-item label="技能" prop="skills">
        <el-input
          v-model="skillsText"
          placeholder="用英文逗号分隔，如：Vue3, JavaScript, Python"
        />
        <div class="tip">已有技能标签：{{ local.skills.join(' / ') || '暂无' }}</div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveProfile">💾 保存修改</el-button>
        <el-button @click="resetForm">🔄 重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/useUserStore.js'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

// 编辑副本（避免边打边存）
const local = reactive({ ...profile.value })
const formRef = ref(null)

const skillsText = computed({
  get: () => local.skills.join(', '),
  set: (v) => { local.skills = v.split(',').map(s => s.trim()).filter(Boolean) }
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  intro: [{ required: true, message: '请输入个人简介', trigger: 'blur' }],
}

function saveProfile() {
  formRef.value?.validate((valid) => {
    if (!valid) return
    userStore.updateProfile({ ...local })
    ElMessage.success('✅ 个人信息保存成功！首页和关于页已同步更新')
  })
}

function resetForm() {
  Object.assign(local, profile.value)
  formRef.value?.resetFields()
}
</script>

<style scoped>
.admin-card { border-radius: 12px; max-width: 640px; margin: 0 auto; }
.card-title { font-weight: 600; }
.profile-form { margin-top: 10px; }
.tip { font-size: 12px; color: #888; margin-top: 6px; }
</style>
