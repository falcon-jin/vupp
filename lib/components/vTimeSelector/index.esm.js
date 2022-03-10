import { defineComponent, ref, watch, toRefs, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, mergeProps, unref, isRef } from "vue";
var TimeProps = {
  startPlaceholder: {
    type: String,
    default: "\u5F00\u59CB\u65F6\u95F4"
  },
  startTimeStartAt: {
    type: String,
    default: "08:00"
  },
  startTimeEndAt: {
    type: String,
    default: "18:00"
  },
  startStep: {
    type: String,
    default: "00:15"
  },
  endPlaceholder: {
    type: String,
    default: "\u7ED3\u675F\u65F6\u95F4"
  },
  endTimeStartAt: {
    type: String,
    default: "08:00"
  },
  endTimeEndAt: {
    type: String,
    default: "18:00"
  },
  endStep: {
    type: String,
    default: "00:15"
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
const _hoisted_1 = { class: "v-time-selector__wrapper" };
const _hoisted_2 = { class: "v-time-selector__start" };
const _hoisted_3 = { class: "v-time-selector__end" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: TimeProps,
  emits: ["startChange", "endChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let _startTime = ref("");
    let _endTime = ref("");
    let _endTimeDisabled = ref(true);
    watch(() => _startTime.value, (val) => {
      if (val === "") {
        _endTime.value = "";
        _endTimeDisabled.value = true;
      } else {
        _endTimeDisabled.value = false;
        emits("startChange", val);
      }
    });
    watch(() => _endTime.value, (val) => {
      if (val !== "") {
        emits("endChange", {
          start: _startTime.value,
          end: val
        });
      }
    });
    toRefs(props);
    return (_ctx, _cache) => {
      const _component_el_time_select = resolveComponent("el-time-select");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_el_time_select, mergeProps({
            modelValue: unref(_startTime),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(_startTime) ? _startTime.value = $event : _startTime = $event),
            "max-time": unref(_endTime),
            class: "mr-4",
            placeholder: _ctx.startPlaceholder,
            start: _ctx.startTimeStartAt,
            step: _ctx.startStep,
            end: _ctx.startTimeEndAt
          }, _ctx.$attrs.startOptions), null, 16, ["modelValue", "max-time", "placeholder", "start", "step", "end"])
        ]),
        createElementVNode("div", _hoisted_3, [
          createVNode(_component_el_time_select, mergeProps({
            modelValue: unref(_endTime),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(_endTime) ? _endTime.value = $event : _endTime = $event),
            "min-time": unref(_startTime),
            placeholder: _ctx.endPlaceholder,
            start: _ctx.endTimeStartAt,
            step: _ctx.endStep,
            end: _ctx.endTimeEndAt
          }, _ctx.$attrs.endOptions, { disabled: unref(_endTimeDisabled) }), null, 16, ["modelValue", "min-time", "placeholder", "start", "step", "end", "disabled"])
        ])
      ]);
    };
  }
});
var vTimeSelector = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-686002df"]]);
var index = {
  install(app) {
    app.component("v-time-selector", vTimeSelector);
  }
};
export { index as default };
