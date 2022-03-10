import { PropType } from "vue";
import { IFormOptions } from "@/components/vForm/src/types/types";

export default {
  visible: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<IFormOptions[]>,
    required: true,
    default: () => [],
  },
  scroll: {
    type: Boolean,
    default: false,
  },
  handleOnPreview: {
    type: Function,
  },
  handleOnRemove: {
    type: Function,
  },
  handleOnSuccess: {
    type: Function,
  },
  handleOnError: {
    type: Function,
  },
  handleOnProgress: {
    type: Function,
  },
  handleOnChange: {
    type: Function,
  },
  handleOnExceed: {
    type: Function,
  },
  handleBeforeUpload: {
    type: Function,
  },
  handleBeforeRemove: {
    type: Function,
  },
};
