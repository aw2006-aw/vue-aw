<template>
  <div class="app-wrap">
    <UserCard :user-info="userInfo"></UserCard>
    <SkillSearch
      v-model:search-key="searchKeyword"
      :intro-text="userInfo.intro"
      :skill-list="skillList"
      :show-detail="isShowDetail"
      @toggle-detail="onToggleDetail"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './UserCard.vue'
import SkillSearch from './SkillSearch.vue'

const userInfo = ref({
  avatar:"https://picsum.photos/id/1012/140/140",
  name:"敖旺",
  className:"计科2401班",
  intro:"热爱前端开发，喜欢Vue框架，爱好阅读、跑步，乐于学习新技术。"
})
const skillList = ref(["Vue3", "HTML", "CSS", "JavaScript", "Python", "数据库", "摄影", "篮球"])
const isShowDetail = ref(false)
const searchKeyword = ref("")

const onToggleDetail = ()=>{
  isShowDetail.value = !isShowDetail.value
}
</script>

<style scoped>
.app-wrap {
  max-width: 900px;
  margin: 40px auto;
  display: flex;
  gap: 32px;
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
@media (max-width:720px){
  .app-wrap{
    flex-direction:column;
  }
}
</style>
