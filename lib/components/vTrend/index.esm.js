import { defineComponent, useSlots, computed, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, renderSlot, toDisplayString, createBlock, resolveDynamicComponent } from "vue";
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
const _hoisted_1 = { class: "v-trend__wrapper" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { class: "v-trend__icon" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    type: { default: "up" },
    text: { default: "\u6587\u672C" },
    upIcon: { default: "ArrowUp" },
    downIcon: { default: "ArrowDown" },
    upIconColor: { default: "#409EFF" },
    downIconColor: { default: "#F56C6C" },
    upTextColor: { default: "" },
    downTextColor: { default: "" },
    reverse: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    let slots = useSlots();
    let textColor = computed(() => {
      return props.type === "up" ? props.upTextColor : props.downTextColor;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", {
          class: "v-trend__text",
          style: normalizeStyle({ color: unref(textColor) })
        }, [
          unref(slots).default ? (openBlock(), createElementBlock("span", _hoisted_2, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])) : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(__props.text), 1))
        ], 4),
        createElementVNode("div", _hoisted_4, [
          __props.type === "up" ? (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.upIcon)}`), {
            key: 0,
            style: normalizeStyle({ color: !__props.reverse ? __props.upIconColor : __props.downIconColor })
          }, null, 8, ["style"])) : (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.downIcon)}`), {
            key: 1,
            style: normalizeStyle({ color: !__props.reverse ? __props.downIconColor : __props.upIconColor })
          }, null, 8, ["style"]))
        ])
      ]);
    };
  }
});
var vTrend = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65a30c81"]]);
var index = {
  install(app) {
    app.component("v-trend", vTrend);
  }
};
export { index as default };
