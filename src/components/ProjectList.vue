<template>
<div class="project-wrap">
  <h2>项目展示</h2>
  <p class="tip">共{{projectArr.length}}个项目，其中已完成2个，进行中2个</p>
  <div class="card-container">
    <!-- v-for循环渲染复用卡片 -->
    <ProjectCard
      v-for="item in projectArr"
      :key="item.id"
      :color="item.color"
      :headerText="item.headerText"
      :title="item.title"
      :desc="item.desc"
      :statusText="item.statusText"
      :statusClass="item.statusClass"
      :tags="item.tags"
    >
      <!-- 插槽填充按钮区域 -->
      <template #btn-group>
        <button class="btn blue-btn" @click="handleView(item)">查看</button>
        <button class="btn white-btn" @click="handleSource(item)">源码</button>
      </template>
    </ProjectCard>
  </div>
</div>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'
// defineEmits：子组件触发事件传给父组件
const emit = defineEmits(['viewProject'])
// 项目数据
const projectArr = [
  {
    id:1,
    color:'#3b68f5',
    headerText:'个',
    title:'个人主页网站',
    desc:'基于 Vue3 组合式 API 的响应式个人主页，支持技能搜索与详情展开。',
    statusText:'已完成',
    statusClass:'finish',
    tags:['Vue 3','Vite']
  },
  {
    id:2,
    color:'#ff784f',
    headerText:'待',
    title:'待办事项应用',
    desc:'支持任务增删改、状态筛选与localStorage本地持久化的Todo应用。',
    statusText:'进行中',
    statusClass:'process',
    tags:['Vue 3','Pinia']
  },
  {
    id:3,
    color:'#22c5aa',
    headerText:'天',
    title:'天气查询应用',
    desc:'调用第三方天气API，根据城市名称实时查询天气与未来预报。',
    statusText:'计划中',
    statusClass:'plan',
    tags:['Fetch API','Axios']
  },
  {
    id:4,
    color:'#9061f9',
    headerText:'图',
    title:'图书管理系统',
    desc:'课程设计项目：实现图书信息增删改查与学生借阅登记管理。',
    statusText:'已完成',
    statusClass:'finish',
    tags:['Python','Flask']
  }
]
const handleView = (item)=>{
  emit('viewProject', item) // defineEmits，子触发事件传给父
  console.log('查看项目：',item.title)
}
const handleSource = (item)=>{
  console.log('打开源码：',item.title)
}
</script>

<style scoped>
.project-wrap {
  padding:20px;
  background:#e8f0fc;
  border-radius:14px;
}
.tip {
  color:#444;
  margin-bottom:20px;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap:20px;
}
/* 第四张卡片自动换行 */
@media(max-width:900px){
  .card-container {
    grid-template-columns: repeat(2,1fr);
  }
}
.btn {
  padding:6px 14px;
  border-radius:20px;
  border:none;
  cursor:pointer;
}
.blue-btn {
  background:#3b68f5;
  color:#fff;
}
.white-btn {
  background:#fff;
  color:#3b68f5;
  border:1px solid #3b68f5;
}
</style>
