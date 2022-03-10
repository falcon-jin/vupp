<template>
<div class="v-menu__wrapper">
  <el-menu 
    :router="router"
    :defaultActive="defaultActive"
    v-bind="$attrs"
  >
    <template v-for="(item, i) in data" :key="i">
      <!-- 一级菜单 -->
      <el-menu-item 
        v-if="!item[children] || !item[children].length"
        :index="item[index]"
      >
        <component 
          v-if="item[icon]" 
          :is="`el-icon-${toLine(item[icon])}`"
        />
        <span>{{ item[name] }}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu
        v-if="item[children] && item[children].length"
        :index="item[index]"
      >
        <template #title>
          <component 
            v-if="item[icon]" 
            :is="`el-icon-${toLine(item[icon])}`"
          />
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item 
          v-for="(itemc, indey) in item[children]"
          :key="indey"
          :index="itemc[index]"
        >
          <component 
            v-if="itemc[icon]" 
            :is="`el-icon-${toLine(itemc[icon])}`"
          />
          <span>{{ itemc[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</div>
</template>

<script setup lang='ts'>
import  IMenuProps from './types'
import { toLine } from '../../../utils'

defineProps(IMenuProps)
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
