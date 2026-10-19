<template>
  <!-- ✅ Element Plus 组件：el-card / el-table / el-tag / el-button / el-dialog / el-form / el-input / el-select / el-popconfirm / el-switch -->
  <div>
    <el-card shadow="hover" class="admin-card">
      <template #header>
        <div class="card-header-row">
          <span class="card-title">📰 文章管理</span>
          <el-button type="success" icon="Plus" @click="openAdd">➕ 新增文章</el-button>
        </div>
      </template>

      <el-table :data="articleStore.articles" stripe border style="width: 100%" empty-text="暂无文章">
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column label="分类" width="100" align="center">
          <template #default="{ row }">
            <el-tag type="success" effect="dark" round size="small">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="110" align="center" />
        <el-table-column prop="views" label="浏览" width="80" align="center" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" link @click="openEdit(row)">✏️ 编辑</el-button>
            <el-popconfirm title="确定删除这篇文章吗？" @confirm="handleRemove(row.id)">
              <template #reference>
                <el-button type="danger" size="small" link>🗑️ 删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增 / 编辑 文章对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEditing ? '✏️ 编辑文章' : '➕ 新增文章'"
      width="640px"
      top="5vh"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="文章标题" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="选择分类" style="width: 100%;">
            <el-option label="🌐 前端开发" value="前端开发" />
            <el-option label="🐍 Python" value="Python" />
            <el-option label="🗄️ 数据库" value="数据库" />
            <el-option label="💡 心得体会" value="心得体会" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="form.date" placeholder="自动填充" disabled />
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="form.summary" placeholder="文章摘要（列表显示）" />
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="8"
            placeholder="在这里写文章内容..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">{{ isEditing ? '保存修改' : '发布文章' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useArticleStore } from '../stores/useArticleStore.js'

const articleStore = useArticleStore()

const dialogVisible = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const formRef = ref(null)

const today = new Date().toISOString().slice(0, 10)

const form = reactive({
  title: '', category: '前端开发', date: today, summary: '', content: ''
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  summary: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
  content: [{ required: true, message: '请输入正文', trigger: 'blur' }]
}

function resetFormData() {
  Object.assign(form, { title: '', category: '前端开发', date: today, summary: '', content: '' })
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
  Object.assign(form, { ...row })
  dialogVisible.value = true
}

function save() {
  formRef.value?.validate((valid) => {
    if (!valid) return
    if (isEditing.value) {
      articleStore.update(editingId.value, { ...form })
      ElMessage.success('✅ 文章更新成功')
    } else {
      articleStore.add({ ...form })
      ElMessage.success('✅ 文章发布成功')
    }
    dialogVisible.value = false
  })
}

function handleRemove(id) {
  articleStore.remove(id)
  ElMessage.success('✅ 文章已删除')
}
</script>

<style scoped>
.admin-card { border-radius: 12px; }
.card-header-row { display: flex; justify-content: space-between; align-items: center; }
.card-title { font-weight: 600; font-size: 15px; }
</style>
