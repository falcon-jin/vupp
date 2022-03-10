import App from "vue";
import vIconSelector from "./src/index.vue";

// app.use(vIconSelector)
export default {
  install(app: App) {
    app.component("v-icon-selector", vIconSelector);
  },
};
