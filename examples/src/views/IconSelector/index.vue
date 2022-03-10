<template>
  <div>
    <v-icon-selector 
      title="点击图标复制"
      type="default"
      v-model:visible="visible"
    ></v-icon-selector>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const visible = ref(false)
</script>

<style lang='scss' scoped>

</style>
