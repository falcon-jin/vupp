<template>
<div class="v-calendar__wrapper" id="v-calendar">

</div>
</template>

<script setup lang='ts'>
import '@fullcalendar/core/vdom'
import { ref, onMounted, watch } from 'vue';
import { Calendar, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGrid from '@fullcalendar/daygrid';
import interaction, { DateClickArg } from '@fullcalendar/interaction';
import ICalendarProps, { IEventItem } from './types'

const props = defineProps(ICalendarProps);
const emits = defineEmits(['dateClick', 'eventClick'])

let _calendarInstanc = ref<Calendar>();

let renderCalendar = () => {
  let _el = document.getElementById('v-calendar');
  if (_el) {
    _calendarInstanc.value = new Calendar(_el, {
      plugins: [dayGrid, interaction],
      locale: props.locale,
      initialView: props.initialView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [{
        events(e, cb) {
          if(props.events.length) {
            cb(props.events);
          } else {
            cb([]);
          }
        }
      }],
      dateClick(info: DateClickArg) {
        emits('dateClick', info);
      },
      eventClick(info: EventClickArg) {
        emits('eventClick', info);
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent
    });
    _calendarInstanc.value.render();
  }
}

watch(() => props.events, () => {
  renderCalendar()
}, { deep: true })
onMounted(() => {
  renderCalendar();
})
</script>

<style lang='scss' scoped>

</style>
