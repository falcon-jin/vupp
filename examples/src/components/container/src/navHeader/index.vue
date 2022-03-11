<template>
  <div class="v-demo__header">
    <span class="v-demo__collapse" @click="handleToggle">
      <el-icon-expand v-if="collapse" style="margin-right: 10px;"></el-icon-expand>
      <el-icon-fold v-else style="margin-right: 10px;"></el-icon-fold>
    </span>
    <h3 class="v-demo__name">VUPP</h3> 
  </div>
</template>

<script setup lang='ts'>
let props = defineProps<{
  collapse: boolean
}>()

let emits = defineEmits(['update:collapse'])

const handleToggle = () => {
  // 子传父: 修改父组件状态
  emits('update:collapse', !props.collapse)
}
</script>

<style lang='scss' scoped>
.v-demo__header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  line-height: 65px;

  .v-demo__collapse {
    margin-top: 8px;
    cursor: pointer;
    svg {
      width: 1em;
      height: 1em;
    }
  }
  .v-demo__name {
    margin-top: 2px;
  }
}
</style>
