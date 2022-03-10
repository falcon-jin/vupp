import { defineComponent, ref, onMounted, resolveComponent, openBlock, createElementBlock, createVNode, mergeProps, unref } from "vue";
var ProgressProps = {
  percentage: {
    type: Number,
    default: 0
  },
  isAnimation: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3e3
  }
};
const _hoisted_1 = { class: "v-progress__wrapper" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: ProgressProps,
  setup(__props) {
    const props = __props;
    let _percentage = ref(0);
    let _timer = ref(null);
    onMounted(() => {
      if (props.isAnimation) {
        let _t = Math.ceil(props.duration / props.percentage);
        _timer = setInterval(() => {
          _percentage.value += 1;
          if (_percentage.value >= props.percentage) {
            _percentage.value = props.percentage;
            clearInterval(_timer);
            _timer = null;
          }
        }, _t);
      } else {
        _percentage.value = props.percentage;
      }
    });
    return (_ctx, _cache) => {
      const _component_el_progress = resolveComponent("el-progress");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_el_progress, mergeProps({ percentage: unref(_percentage) }, _ctx.$attrs), null, 16, ["percentage"])
      ]);
    };
  }
});
var index = {
  install(app) {
    app.component("v-progress", _sfc_main);
  }
};
export { index as default };
