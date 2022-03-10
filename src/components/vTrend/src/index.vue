<template>
  <div class="v-trend__wrapper">
    <div class="v-trend__text" :style="{ color: textColor }">
      <span v-if="slots.default"><slot></slot></span>
      <span v-else>{{ text }}</span>
    </div>
    <div class="v-trend__icon">
      <component 
        :is="`el-icon-${toLine(upIcon)}`"
        :style="{ color: !reverse ? upIconColor : downIconColor }" 
        v-if="type === 'up'"
      />
      <component 
        :is="`el-icon-${toLine(downIcon)}`"
         :style="{ color: !reverse ? downIconColor : upIconColor }" 
         v-else
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useSlots, computed } from 'vue'
import { toLine } from '../../../utils'  

export interface IProps {
  type?: string
  text?: string
  upIcon?: string,
  downIcon?: string,
  upIconColor?: string
  downIconColor?: string
  upTextColor?: string
  downTextColor?: string
  reverse?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'up',
  text: '文本',
  upIcon: 'ArrowUp',
  downIcon: 'ArrowDown',
  upIconColor: '#409EFF',
  downIconColor: '#F56C6C',
  upTextColor: '',
  downTextColor: '',
  reverse: false,
})

let slots = useSlots()
let textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})

</script>

<style lang='scss' scoped>
.v-trend__wrapper {
  display: flex;
  align-items: center;
  .v-trend__text {
    font-size: 14px;
    margin-right: 4px;
  }
  .v-trend__icon {
    height: 21px;
    line-height: 23px;
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
