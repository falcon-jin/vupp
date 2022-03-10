<template>
<v-progress 
  :percentage="50"
/>
<v-progress 
  :stroke-width="20"
  :percentage="50"
  isAnimation
/>
<v-progress 
  :stroke-width="20"
  :percentage="70"
  isAnimation
  text-inside
  status="warning"
/>
<v-progress 
  :percentage="90"
  isAnimation
  :duration="1000"
  type="circle"
  :stroke-width="20"
  text-inside
  status="success"
/>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>

</style>
