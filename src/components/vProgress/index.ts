import App from "vue";
import vProgress from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-progress", vProgress);
  },
};
