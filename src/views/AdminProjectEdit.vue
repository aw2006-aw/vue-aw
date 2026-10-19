<template>
  <!-- ✅ Element Plus 组件：el-card / el-table / el-tag / el-button / el-dialog / el-form / el-input / el-select / el-divider / el-empty -->
  <div>
    <el-card shadow="hover" class="admin-card">
      <template #header>
        <div class="card-header-row">
          <span class="card-title">📁 项目管理</span>
          <el-button type="primary" icon="Plus" @click="openAdd">➕ 新增项目</el-button>
        </div>
      </template>

      <el-table :data="projectStore.projects" stripe border style="width: 100%" empty-text="暂无项目">
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column prop="title" label="标题" min-width="160" show-overflow-tooltip />
        <el-table-column label="状态" width="110" align="center">
          <template #default="{ row }">
            <el-tag :type="statusType(row.statusClass)" effect="dark" round size="small">
              {{ row.statusText }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标签" min-width="180">
          <template #default="{ row }">
            <el-tag v-for="t in row.tags" :key="t" size="small" effect="plain" class="mini-tag">{{ t }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" link @click="openEdit(row)">✏️ 编辑</el-button>
            <el-popconfirm title="确定删除这个项目吗？" @confirm="handleRemove(row.id)">
              <template #reference>
                <el-button type="danger" size="small" link>🗑️ 删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增 / 编辑 对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEditing ? '✏️ 编辑项目' : '➕ 新增项目'"
      width="560px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="项目标题" />
        </el-form-item>
        <el-form-item label="简述" prop="desc">
          <el-input v-model="form.desc" placeholder="项目简述" />
        </el-form-item>
        <el-form-item label="状态" prop="statusClass">
          <el-select v-model="form.statusClass" placeholder="选择状态" style="width: 100%;">
            <el-option label="✅ 已完成" value="finish" />
            <el-option label="🔄 进行中" value="process" />
            <el-option label="⏳ 计划中" value="plan" />
          </el-select>
        </el-form-item>
        <el-form-item label="开发周期">
          <el-input v-model="form.duration" placeholder="如：3 周" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tagsStr" placeholder="用逗号分隔，如：Vue, 前端, 博客" />
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input v-model="form.detail" type="textarea" :rows="3" placeholder="详细描述..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">{{ isEditing ? '保存修改' : '添加项目' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useProjectStore } from '../stores/useProjectStore.js'

const projectStore = useProjectStore()

const dialogVisible = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const formRef = ref(null)

const form = reactive({
  title: '', desc: '', statusClass: 'plan', duration: '', tagsStr: '', detail: ''
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入简述', trigger: 'blur' }],
  statusClass: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

function resetFormData() {
  Object.assign(form, { title: '', desc: '', statusClass: 'plan', duration: '', tagsStr: '', detail: '' })
}

function openAdd() {
  isEditing.value = false
  editingId.value = null
  resetFormData()
  dialogVisible.value = true
}

function openEdit(row) {
  isEditing.value = true
  editingId.value = row.id
  Object.assign(form, {
    title: row.title, desc: row.desc, statusClass: row.statusClass,
    duration: row.duration, tagsStr: row.tags.join(', '), detail: row.detail || ''
  })
  dialogVisible.value = true
}

function statusType(c) { return { finish: 'success', process: 'primary', plan: 'info' }[c] || 'info' }

function save() {
  formRef.value?.validate((valid) => {
    if (!valid) return
    const data = {
      title: form.title, desc: form.desc, statusClass: form.statusClass,
      statusText: ({ finish: '已完成', process: '进行中', plan: '计划中' })[form.statusClass],
      duration: form.duration,
      tags: form.tagsStr.split(',').map(s => s.trim()).filter(Boolean),
      detail: form.detail
    }
    if (isEditing.value) {
      projectStore.update(editingId.value, data)
      ElMessage.success('✅ 项目更新成功')
    } else {
      projectStore.add(data)
      ElMessage.success('✅ 项目添加成功')
    }
    dialogVisible.value = false
  })
}

function handleRemove(id) {
  projectStore.remove(id)
  ElMessage.success('✅ 项目已删除')
}
</script>

<style scoped>
.admin-card { border-radius: 12px; }
.card-header-row { display: flex; justify-content: space-between; align-items: center; }
.card-title { font-weight: 600; font-size: 15px; }
.mini-tag { font-size: 11px; margin-right: 3px; margin-bottom: 3px; }
</style>
