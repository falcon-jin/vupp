import App from "vue";
import vTrend from "./src/index.vue";

// app.use(vIconSelector)
export default {
  install(app: App) {
    app.component("v-trend", vTrend);
  },
};
