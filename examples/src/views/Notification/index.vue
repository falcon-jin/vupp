<template>
  <v-notification placement="bottom">
    <template #default>
      <v-list 
        :data="datas" 
        :actions="actions"
        @handleClick="handleClickItem"
        @handleAction="handleClickAction"
      />
    </template>
  </v-notification> <br><br>
  <!-- <v-notification :value='50'/> <br><br>
  <v-notification :value='100'/> <br><br>
  <v-notification :value='100' dot/> <br><br>
  <v-notification icon="ChatRound" :max="50" :value='51'/> -->
</template>

<script setup lang='ts'>
import { datas, actions } from './data'

const handleClickItem = (data: any) => {
  console.log(data);
}

const handleClickAction = (data: any) => {
  console.log(data);
}

</script>

<style lang='scss' scoped>

</style>
