import { defineComponent, resolveComponent, openBlock, createBlock, mergeProps, withCtx, createVNode, resolveDynamicComponent, unref, renderSlot } from "vue";
const toLine = (value) => {
  return value.replace(/[A-Z]g/, "-$1").toLocaleLowerCase();
};
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    icon: { default: "Bell" },
    value: { default: 0 },
    max: { default: 99 },
    dot: { type: Boolean, default: false },
    type: { default: "danger" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_badge = resolveComponent("el-badge");
      const _component_el_popover = resolveComponent("el-popover");
      return openBlock(), createBlock(_component_el_popover, mergeProps({
        "popper-class": "v-notification__wrapper",
        width: 300,
        trigger: "click"
      }, _ctx.$attrs), {
        reference: withCtx(() => [
          createVNode(_component_el_badge, {
            type: __props.type,
            value: __props.value,
            "is-dot": __props.dot,
            max: __props.max
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.icon)}`)))
            ]),
            _: 1
          }, 8, ["type", "value", "is-dot", "max"])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 16);
    };
  }
});
var vNotification = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-808ea8b6"]]);
var index = {
  install(app) {
    app.component("v-notification", vNotification);
  }
};
export { index as default };
