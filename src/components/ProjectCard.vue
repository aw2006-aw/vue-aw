<template>
  <div class="project-card">
    <!-- 卡片顶部彩色区域 -->
    <div class="card-header" :style="{backgroundColor: color}">
      <span class="header-text">{{ headerText }}</span>
    </div>
    <div class="card-body">
      <div class="title-row">
        <h3>{{ title }}</h3>
        <span class="status" :class="statusClass">{{ statusText }}</span>
      </div>
      <p class="desc">{{ desc }}</p>
      <div class="tag-group">
        <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
      </div>
      <!-- 具名插槽：按钮区域，父组件自定义按钮 -->
      <slot name="btn-group"></slot>
    </div>
  </div>
</template>

<script setup>
// defineProps：父传子，接收卡片数据
const props = defineProps({
  color: String,
  headerText: String,
  title: String,
  desc: String,
  statusText: String,
  statusClass: String,
  tags: Array
})
</script>

<style scoped>
.project-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px #00000015;
}
.card-header {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-text {
  font-size: 48px;
  color: #fff;
  font-weight: bold;
}
.card-body {
  padding:16px;
}
.title-row {
  display:flex;
  justify-content: space-between;
  align-items:center;
  margin-bottom:8px;
}
.status {
  font-size:12px;
  padding:2px 8px;
  border-radius:12px;
}
.status.finish {
  background:#dcfce7;
  color:#16a34a;
}
.status.process {
  background:#eff6ff;
  color:#3b82f6;
}
.status.plan {
  background:#f5f5f5;
  color:#666;
}
.desc {
  font-size:13px;
  color:#555;
  margin-bottom:10px;
  line-height:1.4;
}
.tag-group {
  display:flex;
  gap:6px;
  margin-bottom:14px;
}
.tag {
  font-size:12px;
  background:#f0f4ff;
  color:#4472c4;
  padding:2px 7px;
  border-radius:10px;
}
slot[name="btn-group"] {
  display:flex;
  gap:10px;
}
</style>
