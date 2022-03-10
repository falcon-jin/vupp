<template>
  <div>
    <div class="flex">
      <v-trend text="营业额"></v-trend>
      <v-trend text="销售额" type="down"></v-trend>
    </div>
    <div class="flex">
      <v-trend text="营业额" upIconColor="cyan"></v-trend>
      <v-trend text="销售额" type="down" downIconColor="green"></v-trend>
    </div>
    <div class="flex">
      <v-trend>营业额</v-trend>
      <v-trend type="down">销售额</v-trend>
    </div>
    <div class="flex">
      <v-trend reverse>营业额</v-trend>
      <v-trend reverse type="down">销售额</v-trend>
      <v-trend reverse type="down" upIconColor="cyan" downIconColor="green">Up and Down</v-trend>
    </div>
    <div class="flex">
      <v-trend upTextColor="blue">营业额</v-trend>
      <v-trend type="down" downTextColor="orange">销售额</v-trend>
      <v-trend 
        reverse 
        type="down" 
        upIconColor="cyan" 
        downIconColor="green"
        upTextColor="pink"
        downTextColor="orange"
      >Up and Down</v-trend>
    </div>
    <div class="flex">
      <v-trend upIcon="CaretTop">营业额</v-trend>
      <v-trend downIcon="CaretBottom" type="down">销售额</v-trend>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.flex {
  display: flex;

  div {
    margin-right: 10px;
  }
}
</style>
