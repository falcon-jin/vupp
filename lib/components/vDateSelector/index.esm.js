import { defineComponent, ref, watch, toRefs, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, mergeProps, unref, isRef } from "vue";
var DateProps = {
  startPlaceholder: {
    type: String,
    default: "\u5F00\u59CB\u65E5\u671F"
  },
  endPlaceholder: {
    type: String,
    default: "\u7ED3\u675F\u65E5\u671F"
  },
  disableBeforeToday: {
    type: Boolean,
    default: true
  }
};
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = { class: "v-date-selector__wrapper" };
const _hoisted_2 = { class: "v-date-selector__start" };
const _hoisted_3 = { class: "v-date-selector__end" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: DateProps,
  emits: ["startChange", "endChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let _startDate = ref(null);
    let _endDate = ref(null);
    let startDisabled = (time) => {
      if (props.disableBeforeToday) {
        return time.getTime() < Date.now() - 1e3 * 60 * 60 * 24;
      }
    };
    let endDisabled = (time) => {
      if (_startDate.value && props.disableBeforeToday) {
        return time.getTime() < _startDate.value.getTime() + 1e3 * 60 * 60 * 24;
      }
    };
    watch(() => _startDate.value, (val) => {
      if (!val) {
        _endDate.value = null;
      }
      emits("startChange", val);
    });
    watch(() => _endDate.value, (val) => {
      if (val) {
        emits("endChange", {
          start: _startDate.value,
          end: val
        });
      }
    });
    toRefs(props);
    return (_ctx, _cache) => {
      const _component_el_date_picker = resolveComponent("el-date-picker");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_el_date_picker, mergeProps({
            modelValue: unref(_startDate),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(_startDate) ? _startDate.value = $event : _startDate = $event),
            type: "date",
            placeholder: _ctx.startPlaceholder,
            disabledDate: unref(startDisabled)
          }, _ctx.$attrs.startOptions), null, 16, ["modelValue", "placeholder", "disabledDate"])
        ]),
        createElementVNode("div", _hoisted_3, [
          createVNode(_component_el_date_picker, mergeProps({
            modelValue: unref(_endDate),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(_endDate) ? _endDate.value = $event : _endDate = $event),
            type: "date",
            placeholder: _ctx.endPlaceholder,
            disabled: unref(_startDate) === null,
            disabledDate: unref(endDisabled)
          }, _ctx.$attrs.endOptions), null, 16, ["modelValue", "placeholder", "disabled", "disabledDate"])
        ])
      ]);
    };
  }
});
var vDateSelector = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39fb0132"]]);
var index = {
  install(app) {
    app.component("v-date-selector", vDateSelector);
  }
};
export { index as default };
