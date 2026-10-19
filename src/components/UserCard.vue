<template>
  <div class="aside-left">
    <img :src="userInfo.avatar" class="avatar" alt="头像" />
    <h2>{{ userInfo.name }}</h2>
    <p>{{ userInfo.className }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  userInfo:{
    type:Object,
    required:true
  }
})
</script>

<style scoped>
.aside-left {
  width: 240px;
  flex-shrink: 0;
  text-align: center;
  border-right: 1px solid #e2e8f0;
  padding-right: 24px;
}
.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}
</style>
