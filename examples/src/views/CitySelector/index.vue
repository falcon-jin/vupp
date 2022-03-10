<template>
<v-city-selector 
  @handleClickCity='handleClickCity'
  @handleSelectCity="handleSelectCity"
/>
</template>

<script setup lang='ts'>

const handleClickCity = (data: any) => {
  console.log(data)
}
const handleSelectCity = (data: any) => {
  console.log(data)
}
</script>

<style lang='scss' scoped>

</style>
