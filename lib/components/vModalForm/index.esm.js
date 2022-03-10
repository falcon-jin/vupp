import { defineComponent, ref, watch, resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, unref, isRef, withCtx, mergeProps, renderSlot } from "vue";
var IModeFormProps = {
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  scroll: {
    type: Boolean,
    default: false
  },
  handleOnPreview: {
    type: Function
  },
  handleOnRemove: {
    type: Function
  },
  handleOnSuccess: {
    type: Function
  },
  handleOnError: {
    type: Function
  },
  handleOnProgress: {
    type: Function
  },
  handleOnChange: {
    type: Function
  },
  handleOnExceed: {
    type: Function
  },
  handleBeforeUpload: {
    type: Function
  },
  handleBeforeRemove: {
    type: Function
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: IModeFormProps,
  emits: ["update:visible"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let form = ref();
    let _visible = ref(props.visible);
    watch(() => props.visible, (val) => {
      _visible.value = val;
    });
    watch(() => _visible.value, (val) => {
      emits("update:visible", val);
      _visible.value = val;
    });
    return (_ctx, _cache) => {
      const _component_v_form = resolveComponent("v-form");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["v-model-form__wrapper", { "v-modal-form__dialog-body--height": _ctx.scroll }])
      }, [
        createVNode(_component_el_dialog, {
          modelValue: unref(_visible),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(_visible) ? _visible.value = $event : _visible = $event)
        }, {
          default: withCtx(() => [
            createVNode(_component_v_form, mergeProps({
              ref_key: "form",
              ref: form,
              options: _ctx.options
            }, _ctx.$attrs, {
              "on-preview": _ctx.handleOnPreview,
              "on-remove": _ctx.handleOnRemove,
              "on-success": _ctx.handleOnSuccess,
              "on-error": _ctx.handleOnError,
              "on-progress": _ctx.handleOnProgress,
              "on-change": _ctx.handleOnChange,
              "on-exceed": _ctx.handleOnExceed,
              "before-upload": _ctx.handleBeforeUpload,
              "before-remove": _ctx.handleBeforeRemove
            }), {
              uploadArea: withCtx(() => [
                renderSlot(_ctx.$slots, "uploadArea")
              ]),
              uploadTip: withCtx(() => [
                renderSlot(_ctx.$slots, "uploadTip")
              ]),
              _: 3
            }, 16, ["options", "on-preview", "on-remove", "on-success", "on-error", "on-progress", "on-change", "on-exceed", "before-upload", "before-remove"])
          ]),
          footer: withCtx(() => [
            renderSlot(_ctx.$slots, "footer", { form: unref(form) })
          ]),
          _: 3
        }, 8, ["modelValue"])
      ], 2);
    };
  }
});
var index = {
  install(app) {
    app.component("v-modal-form", _sfc_main);
  }
};
export { index as default };
