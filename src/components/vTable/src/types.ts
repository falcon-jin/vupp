import { PropType } from "vue";

export interface ITableOptions {
  label: string; // 表头
  prop: string; // 字段名称
  width?: number | string; // 列宽
  align?: "left" | "center" | "right"; // 对齐方式
  fixed?: true | "left" | "right"; // 固定列
  slot?: string; // 自定义列表名称(插槽名)
  action?: boolean; // 该列是否为操作项
  editable?: boolean; // 该列是否可编辑
  sortable?: boolean; // 该列是否可排序
}

export default {
  options: {
    // 表格配置
    type: Array as PropType<ITableOptions[]>,
    required: true,
  },
  data: {
    // 表格数据
    type: Array as PropType<any[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // 编辑
  editIcon: {
    // 可编辑项图标
    type: String,
    default: "edit",
  },
  editRow: {
    // 可编辑项行
    type: Boolean,
    default: false,
  },
  editRowIndex: {
    // 可编辑项行索引
    type: String,
    default: "",
  },
  // loading
  elementLoadingText: {
    type: String,
  },
  elementLoadingSpinner: {
    type: String,
  },
  elementLoadingBackground: {
    type: String,
  },
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 分页
  pagination: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30, 40, 50],
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  paginationAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "right",
  },
};
