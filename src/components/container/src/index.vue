<template>
  <el-container class="v-demo__container">
    <el-aside width="auto">
      <nav-side :collapse="isCollapse"></nav-side>
    </el-aside>

    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import NavHeader from './navHeader/index.vue'
import NavSide from './navSide/index.vue'

let isCollapse = ref(false)
</script>

<style lang='scss' scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  border-bottom: 1px solid #e8e8e8;
}
</style>
