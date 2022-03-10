<template>
<v-calendar 
  :events="events"
  @dateClick="handleDateClick"
  @eventClick="handleEventClick"
  displayEventEnd
  :eventContent="eventContent"
></v-calendar>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
// import { IEventItem } from '../../components/vCalendar/src/types';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, EventContentArg } from '@fullcalendar/core';

let events = ref<any[]>([
  {
    title: '购物',
    start: '2022-03-01 18:00',
    end: '2022-03-02 23:00',
    editable: true,
  },
  {
    title: 'code',
    start: '2022-03-01 08:00',
    end: '2022-03-01 19:00',
  },
  {
    title: '睡觉',
    start: '2022-03-11 08:00',
    end: '2022-03-11 18:00',
  },
])

const handleDateClick = (info: DateClickArg) => {
  console.log('点击日期', info);
  events.value.push({
    title: '学习',
    start: info.dateStr + ' 08:00',
    end: info.dateStr + ' 18:00',
    editable: true,
  })
}
const handleEventClick = (info: EventClickArg) => {
  console.log(info);
}

// 自定义事件内容格式
let eventContent = (arg: EventContentArg) => {
  let _el = document.createElement('div');
  let timeTextArr = arg.timeText.split(' - ');
  let [ start, end ] = [ timeTextArr[0], timeTextArr[1] ];
  _el.innerHTML = `
    <h4>${arg.event._def.title}</h4>
    <div>开始: ${start}</div>
    <div>结束: ${end}</div>
  `
  return {
    domNodes: [_el]
  } 
}
</script>

<style lang='scss' scoped>

</style>
