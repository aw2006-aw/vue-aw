<template>
  <footer class="footer">
    <!-- 默认插槽，父组件不传内容则显示后备 -->
    <slot>©2026 Vue组件化开发实验</slot>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer{
  text-align:center;
  padding:14px;
  color:#666;
  margin-top:40px;
}
</style>
