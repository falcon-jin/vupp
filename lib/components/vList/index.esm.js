import { defineComponent, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, toDisplayString, createTextVNode, createCommentVNode, normalizeClass, resolveDynamicComponent, unref } from "vue";
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
const _hoisted_1 = { class: "v-list__wrapper" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "v-list__body--avatar" };
const _hoisted_4 = { class: "v-list__body--content" };
const _hoisted_5 = {
  key: 0,
  class: "v-list__body--content-title"
};
const _hoisted_6 = {
  key: 1,
  class: "v-list__body--content-desc"
};
const _hoisted_7 = {
  key: 2,
  class: "v-list__body--content-time"
};
const _hoisted_8 = { class: "v-list__action" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = {
  key: 0,
  class: "v-list__action--item-icon"
};
const _hoisted_11 = { class: "v-list__action--icon-text" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    data: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  emits: [
    "handleClick",
    "handleAction"
  ],
  setup(__props, { emit: emits }) {
    const handleClickItem = (item, index2) => {
      emits("handleClick", { item, index: index2 });
    };
    const handleClickAction = (action, index2) => {
      emits("handleAction", { index: index2, action });
    };
    return (_ctx, _cache) => {
      const _component_el_avatar = resolveComponent("el-avatar");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_el_tabs, null, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (item, index2) => {
              return openBlock(), createBlock(_component_el_tab_pane, {
                key: index2,
                label: item.title
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_scrollbar, { "max-height": "300px" }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.content, (itemc, indey) => {
                        return openBlock(), createElementBlock("div", {
                          class: "v-list__body",
                          key: indey,
                          onClick: ($event) => handleClickItem(itemc, indey)
                        }, [
                          createElementVNode("div", _hoisted_3, [
                            createVNode(_component_el_avatar, {
                              icon: "el-icon-user-solid",
                              size: "default",
                              shape: "circle",
                              src: itemc.avatar,
                              fit: "fill"
                            }, null, 8, ["src"])
                          ]),
                          createElementVNode("div", _hoisted_4, [
                            itemc.title ? (openBlock(), createElementBlock("div", _hoisted_5, [
                              createElementVNode("div", null, toDisplayString(itemc.title), 1),
                              itemc.tag ? (openBlock(), createBlock(_component_el_tag, {
                                key: 0,
                                size: "small",
                                type: itemc.tagType
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(itemc.tag), 1)
                                ]),
                                _: 2
                              }, 1032, ["type"])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true),
                            itemc.desc ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(itemc.desc), 1)) : createCommentVNode("", true),
                            itemc.time ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(itemc.time), 1)) : createCommentVNode("", true)
                          ])
                        ], 8, _hoisted_2);
                      }), 128)),
                      createElementVNode("div", _hoisted_8, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (a, index22) => {
                          return openBlock(), createElementBlock("div", {
                            class: normalizeClass(["v-list__action--item", { "action_border": index22 !== __props.actions.length - 1 }]),
                            key: index22,
                            onClick: ($event) => handleClickAction(a, index22)
                          }, [
                            a.icon ? (openBlock(), createElementBlock("div", _hoisted_10, [
                              (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(a.icon)}`)))
                            ])) : createCommentVNode("", true),
                            createElementVNode("div", _hoisted_11, toDisplayString(a.text), 1)
                          ], 10, _hoisted_9);
                        }), 128))
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["label"]);
            }), 128))
          ]),
          _: 1
        })
      ]);
    };
  }
});
var vList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-254b5577"]]);
var index = {
  install(app) {
    app.component("v-list", vList);
  }
};
export { index as default };
