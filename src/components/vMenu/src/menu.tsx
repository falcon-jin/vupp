import { defineComponent, Proptype, useAttrs } from "vue";
import MenuProps, { IMenuData } from "./types";
import * as Icons from "@element-plus/icons-vue";
import "./style/index.scss";

export default defineComponent({
  props: MenuProps,

  setup(props, ctx) {
    let renderMenu = (data: IMenuData[]) => {
      return data.map((item: IMenuData) => {
        item.iconD = (Icons as any)[item[props.icon]];

        // 插槽处理
        let slots = {
          title: () => {
            return (
              <>
                <item.iconD />
                <span>{item[props.name]}</span>
              </>
            );
          },
        };
        // 递归渲染子菜单
        if (item[props.children] && item[props.children].length) {
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              {renderMenu(item[props.children])}
            </el-sub-menu>
          );
        }
        // 根菜单渲染
        return (
          <el-menu-item index={item[props.index]}>
            <item.iconD />
            <span>{item[props.name]}</span>
          </el-menu-item>
        );
      });
    };
    // 注入属性
    let attrs = useAttrs();

    return () => {
      return (
        <div class="v-infinite-menu__wrapper">
          <el-menu
            default-active={props.defaultActive}
            router={props.router}
            {...attrs}
          >
            {renderMenu(props.data)}
          </el-menu>
        </div>
      );
    };
  },
});
