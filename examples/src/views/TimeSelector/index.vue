<template>
<v-time-selector 
  startTimeStartAt='10:00'
  startTimeEndAt='22:00'
  endTimeStartAt='12:00'
  endTimeEndAt='22:00'
  @startChange="handleStartChange"
  @endChange="handleEndChange"
  :startOptions="startOptions"
/>
</template>

<script setup lang='ts'>
const handleStartChange =(data: string) => {
  console.log(data)
}
const handleEndChange =(data: {start: string, end: string}) => {
  console.log(data)
}

// extends
let startOptions = {
  clearable: true
}
</script>

<style lang='scss' scoped>

</style>
