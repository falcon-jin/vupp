<template>
  <el-popover
    popper-class="v-notification__wrapper"
    :width="300"
    trigger="click"
    v-bind="$attrs"
  >
    <!-- 徽标 -->
    <template #reference>
      <el-badge
        :type="type"
        :value="value" 
        :is-dot="dot"
        :max="max"
      >
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
    <!-- 菜单 -->
    <template #default>
      <!-- 自定义内容 -->
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang='ts'>
import { toLine } from '../../../utils'  

export interface IProps {
  icon?: string,
  value?: number | string,
  max?: number | string,
  dot?: boolean,
  type?: string,
}

const props = withDefaults(defineProps<IProps>(), {
  icon: 'Bell',
  value: 0,
  max: 99,
  dot: false,
  type: 'danger',
})

</script>

<style lang='scss' scoped>
.el-badge {
  svg {
    width: 1.1em;
    height: 1.1em;
  }
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: all 0.3s;
  }
}

</style>
