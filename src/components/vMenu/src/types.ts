import { PropType } from "vue";

export interface IMenuData {
  icon?: string;
  iconD?: string;
  name: string;
  index: string;
  path?: string; // Todo
  children?: IMenuData[];
}

export default {
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  router: {
    type: Boolean,
    default: false,
  },
  defaultActive: {
    type: String,
    default: "",
  },
  // custom menu title key
  name: {
    type: String,
    default: "name",
  },
  // custom menu index key
  index: {
    type: String,
    default: "index",
  },
  // custom menu icon key
  icon: {
    type: String,
    default: "icon",
  },
  // custom menu children key
  children: {
    type: String,
    default: "children",
  },
};
