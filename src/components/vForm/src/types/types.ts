import { PropType, CSSProperties } from "vue";
import { RuleItem } from "./rule";

// Form config
export interface IFormOptions {
  type: // 表单项元素
  | "cascader"
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "data-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "time-select"
    | "transfer"
    | "upload"
    | "editor";
  value?: any; // 表单值
  label?: string; // 表单项标签
  placeholder?: string;
  prop?: string; // 表单项标识
  rules?: RuleItem[]; // 表单项验证规则
  attrs?: {
    // Todo 补充更多属性
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
    style?: CSSProperties; // css
  }; // 表单特有属性
  children?: IFormOptions[]; // 子表单项
  uploadAttrs?: {
    // 上传属性
    action: string;
    header?: string;
    method?: "post" | "put" | "patch";
    name?: string;
    data?: any;
    multiple?: boolean;
    withCredentials?: boolean;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string;
    thumbnailMode?: boolean;
    fileList?: Array[];
    listType?: "text" | "picture" | "picture-card";
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
  };
}

export default {
  options: {
    type: Array as PropType<IFormOptions[]>,
    required: true,
    default: () => [],
  },
  httpRequest: {
    // 用户自定义上传行为
    type: Function,
  },
};
