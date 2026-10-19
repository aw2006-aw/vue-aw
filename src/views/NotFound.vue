<template>
  <div class="nf-wrap">
    <h1 class="code">404</h1>
    <h2>页面未找到</h2>
    <p>抱歉，你访问的地址 <code>{{ route.fullPath }}</code> 不存在。</p>
    <div class="btns">
      <button class="btn home" @click="goHome">返回首页</button>
      <button class="btn back" @click="goBack">返回上一页</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const goHome = () => router.push({ name: 'Home' })
const goBack = () => {
  if (window.history.length > 1) router.go(-1)
  else router.replace({ name: 'Home' })
}
</script>

<style scoped>
.nf-wrap {
  text-align: center;
  padding: 100px 20px;
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.code {
  font-size: 96px;
  color: #3b68f5;
  margin: 0;
}
h2 { color: #333; margin: 8px 0 16px; }
p { color: #666; margin-bottom: 28px; }
code {
  background: #f0f4ff; color: #3b68f5;
  padding: 2px 8px; border-radius: 6px;
}
.btns { display: flex; gap: 12px; justify-content: center; }
.btn {
  padding: 10px 24px; border: none; border-radius: 20px;
  cursor: pointer; font-size: 14px;
}
.btn.home { background: #3b68f5; color: #fff; }
.btn.back { background: #f0f0f0; color: #555; }
.btn:hover { opacity: 0.85; }
</style>
