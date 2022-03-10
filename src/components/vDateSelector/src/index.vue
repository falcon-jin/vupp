<template>
<div class="v-date-selector__wrapper">
  <div class="v-date-selector__start">
    <el-date-picker
      v-model="_startDate"
      type="date"
      :placeholder="startPlaceholder"
      :disabledDate="startDisabled"
      v-bind="$attrs.startOptions"
    />
  </div>

  <div class="v-date-selector__end">
    <el-date-picker
      v-model="_endDate"
      type="date"
      :placeholder="endPlaceholder"
      :disabled="_startDate === null"
      :disabledDate="endDisabled"
      v-bind="$attrs.endOptions"
    />
  </div>
</div>
</template>

<script setup lang='ts'>
import { ref, toRefs, watch } from 'vue';
import DateProps from './types';

const props = defineProps(DateProps)
let emits = defineEmits(['startChange', 'endChange'])

let _startDate = ref<Date | null>(null);
let _endDate = ref<Date | null>(null);

let startDisabled = (time: Date) => {
  if(props.disableBeforeToday) {
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
  }
}
let endDisabled = (time: Date) => {
  if(_startDate.value && props.disableBeforeToday) {
    return time.getTime() < _startDate.value.getTime() + 1000 * 60 * 60 * 24;
  }
}

watch(() => _startDate.value, (val) => {
  if(!val) {
    _endDate.value = null;
  }
  emits('startChange', val)
})
watch(() => _endDate.value, (val) => {
  if(val) {
    emits('endChange', {
      start: _startDate.value,
      end: val
    })
  }
})

toRefs(props)
</script>

<style lang='scss' scoped>
.v-date-selector__wrapper{
  display: flex;
  .v-date-selector__start {
    margin-right: 8px;
  }
}
</style>
