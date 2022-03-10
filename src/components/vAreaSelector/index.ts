import App from "vue";
import vAreaSelector from "./src/index.vue";

// app.use(vAreaSelector)
export default {
  install(app: App) {
    app.component("v-area-selector", vAreaSelector);
  },
};
