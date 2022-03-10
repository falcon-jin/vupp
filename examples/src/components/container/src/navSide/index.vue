<template>
<el-scrollbar max-height="100%">
  <v-menu 
    :data="data" 
    :defaultActive="$route.path"
    :collapse="collapse"
    router
  />
</el-scrollbar>
  
</template>

<script setup lang='ts'>
let props = defineProps<{
  collapse: boolean
}>()

let data = [
  {
    icon: 'HomeFilled',
    name: 'Home 主页',
    index: '/',
  },
  {
    icon: 'Promotion',
    name: 'Icon Selector 图标',
    index: '/icon-selector',
  },
  {
    icon: 'LocationFilled',
    name: 'Area Selector 省市区',
    index: '/area-selector',
  },
  {
    icon: 'Place',
    name: 'City Selector 城市',
    index: '/city-selector',
  },
  {
    icon: 'Menu',
    name: 'Menu 侧边菜单',
    index: '/menu',
  },
  {
    icon: 'BellFilled',
    name: 'Notification 通知',
    index: '/notification',
  },
  {
    icon: 'Postcard',
    name: 'Form 表单',
    index: '/form',
  },
  {
    icon: 'Tickets',
    name: 'ModalForm 弹框表单',
    index: '/modal-form',
  },
  {
    icon: 'Grid',
    name: 'Table 表格',
    index: '/table',
  },
  {
    icon: 'Calendar',
    name: 'Calendar 日历',
    index: '/calendar',
  },
  {
    icon: 'TrendCharts',
    name: 'Trend 趋势',
    index: '/trend',
  },
  {
    icon: 'RefreshRight',
    name: 'Progress 进度条',
    index: '/progress',
  },
  {
    icon: 'Timer',
    name: 'Time Selector 时间',
    index: '/time-selector',
  },
  {
    icon: 'PieChart',
    name: 'Date Selector 日期',
    index: '/date-selector',
  },
]
</script>

<style lang='scss' scoped>
.el-menu {
  height: 100%;
}
</style>
