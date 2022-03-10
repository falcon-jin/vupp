import App from "vue";
import vAreaSelector from "./components/vAreaSelector";
import vIconSelector from "./components/vIconSelector";
import vTrend from "./components/vTrend";
import vNotification from "./components/vNotification";
import vList from "./components/vList";
import vMenu from "./components/vMenu";
import vProgress from "./components/vProgress";
import vTimeSelector from "./components/vTimeSelector";
import vDateSelector from "./components/vDateSelector";
import vCitySelector from "./components/vCitySelector";
import vForm from "./components/vForm";
import vModalForm from "./components/vModalForm";
import vTable from "./components/vTable";
import vCalendar from "./components/vCalendar";

import * as Icons from "@element-plus/icons-vue";
import "./styles/base.scss";
import "./styles/ui.scss";

import { toLine } from "./utils";

const components = [
  vAreaSelector,
  vIconSelector,
  vTrend,
  vNotification,
  vList,
  vMenu,
  vProgress,
  vTimeSelector,
  vDateSelector,
  vCitySelector,
  vForm,
  vModalForm,
  vTable,
  vCalendar,
];

export default {
  install(app: App) {
    // 全局注册图标
    for (let i in Icons) {
      app.component(`el-icon-${toLine(i)}`, (Icons as any)[i]);
    }
    components.map((cpn) => {
      app.use(cpn);
    });
  },
};
