<template>
  <div class="search-wrap">
    <h3>个人简介</h3>
    <button class="btn" @click="handleToggle">
      {{ showDetail ? '收起详情' : '展开详情' }}
    </button>

    <div v-show="showDetail" class="detail-block">
      <p>{{ introText }}</p>
    </div>

    <h3>技能 & 兴趣搜索</h3>
    <input class="search-box" v-model="searchKey" placeholder="输入关键词搜索技能"/>

    <h4>筛选后的技能列表</h4>
    <div>
      <span class="skill-tag" v-for="(item, index) in filterList" :key="index">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

// 双向绑定搜索关键词 defineModel
const searchKey = defineModel()
// 派发切换详情事件
const emit = defineEmits(['toggle-detail'])

const props = defineProps({
  introText:{
    type:String,
    required:true
  },
  skillList:{
    type:Array,
    required:true
  },
  showDetail:{
    type:Boolean,
    required:true
  }
})

const handleToggle = ()=>{
  emit('toggle-detail')
}

const filterList = computed(()=>{
  const key = searchKey.value ?? ''
  if(!key.trim()){
    return props.skillList
  }
  return props.skillList.filter(s=>s.includes(key))
})

watch(searchKey,(newVal,oldVal)=>{
  console.log(`子组件监听搜索词：旧=${oldVal}，新=${newVal}`)
})
</script>

<style scoped>
.search-wrap{
  flex:1;
}
.btn {
  padding: 9px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 6px 4px;
  background: #3182ce;
  color: #fff;
  font-size: 14px;
}
.search-box {
  width: 100%;
  padding: 12px 14px;
  margin: 18px 0;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
}
.skill-tag {
  display: inline-block;
  background: #bee3f8;
  color: #2b6cb0;
  padding: 7px 14px;
  border-radius: 24px;
  margin: 7px 5px;
}
.detail-block {
  margin: 16px 0;
  padding: 14px;
  background: #f7fafc;
  border-radius: 8px;
}
</style>
