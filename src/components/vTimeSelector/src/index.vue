<template>
<div class="v-time-selector__wrapper">
  <div class="v-time-selector__start">
    <el-time-select
      v-model="_startTime"
      :max-time="_endTime"
      class="mr-4"
      :placeholder="startPlaceholder"
      :start="startTimeStartAt"
      :step="startStep"
      :end="startTimeEndAt"
      v-bind="$attrs.startOptions"
    />
  </div>

  <div class="v-time-selector__end">
    <el-time-select
      v-model="_endTime"
      :min-time="_startTime"
      :placeholder="endPlaceholder"
      :start="endTimeStartAt"
      :step="endStep"
      :end="endTimeEndAt"
      v-bind="$attrs.endOptions"
      :disabled="_endTimeDisabled"
    />
  </div>
</div>
  
</template>

<script setup lang='ts'>
import { ref, watch, toRefs } from 'vue';
import TimeProps from './types'

const props = defineProps(TimeProps);
let emits = defineEmits(['startChange', 'endChange']);

let _startTime = ref<string>('');
let _endTime = ref<string>('');
let _endTimeDisabled = ref<boolean>(true);

watch(() => _startTime.value, (val) => {
  if (val === '') {
    _endTime.value = ''
    _endTimeDisabled.value = true
  } else {
    _endTimeDisabled.value = false
    emits('startChange', val)
  }
});
watch(() => _endTime.value, (val) => {
  if (val !== '') {
    emits('endChange', {
      start: _startTime.value,
      end: val,
    })
  }
});

toRefs(props)
</script>

<style lang='scss' scoped>
.v-time-selector__wrapper{
  display: flex;
  align-items: center;
  .v-time-selector__start {
    margin-right: 8px;
  }
}
</style>
