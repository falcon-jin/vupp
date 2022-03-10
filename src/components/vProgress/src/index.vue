<template>
  <div class="v-progress__wrapper">
    <el-progress 
      :percentage='_percentage'
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import ProgressProps from './types'

const props = defineProps(ProgressProps)
let _percentage = ref(0)
let _timer = ref(null as any) 

onMounted(() => {
  if (props.isAnimation) {
    let _t = Math.ceil(props.duration / props.percentage)
    _timer = setInterval(() => {
      _percentage.value += 1
      if (_percentage.value >= props.percentage) {
        _percentage.value = props.percentage
        clearInterval(_timer)
        _timer = null
      }
    }, _t)
  } else {
    _percentage.value = props.percentage
  }
})
</script>

<style lang='scss' scoped>

</style>
