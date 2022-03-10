import { PropType } from "vue";

export interface IEventItem {
  title: string;
  start: string;
  end: string;
  editable?: boolean; // 可拖拽
}

export default {
  locale: {
    // 语言
    type: String,
    default: "zh-cn",
  },
  initialView: {
    // 视图模式
    type: String,
    default: "dayGridMonth",
  },
  buttonText: {
    // 按钮文字
    type: Object,
    default: () => {
      return {
        today: "今天",
        month: "月",
        week: "周",
        day: "日",
        prevYear: "上一年",
        nextYear: "下一年",
        prev: "上一月",
        next: "下一月",
      };
    },
  },
  headerToolbar: {
    // 头部工具栏
    type: Object,
    default: () => {
      return {
        start: "title",
        center: "",
        end: "prev today next",
      };
    },
  },
  footerToolbar: {
    // 底部工具栏
    type: Object,
    default: () => {
      return {};
    },
  },
  // 事件源
  events: {
    type: Array as PropType<IEventItem[]>,
    default: () => [],
  },
  // 日历显示结束时间
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
  // 自定义事件内容
  eventContent: {
    type: Function,
  },
};
