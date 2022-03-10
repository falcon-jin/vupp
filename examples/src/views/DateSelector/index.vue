<template>
<v-date-selector
  @startChange="handleStartChange"
  @endChange="handleEndChange"
  :startOptions="startOptions"
/>
<br>
<v-date-selector
  :disableBeforeToday="false"
  @startChange="handleStartChange"
  @endChange="handleEndChange"
/>
</template>

<script setup lang='ts'>
const handleStartChange = (data: Date) => {
  console.log('startChange', data);
}
const handleEndChange = (data: any) => {
  console.log('startChange', data);
}

// extend
let startOptions = {
  clearable: false
}
</script>
