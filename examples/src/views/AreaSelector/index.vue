<template>
  <v-area-selector @change='handleChange'/>
</template>

<script setup lang='ts'>
// { name: '', code: '' }
const handleChange = (val: any) => {
  console.log(val)
}
</script>

<style lang='scss' scoped>

</style>
