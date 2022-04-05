import type {App} from "vue";
import vTimeSelector from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-time-selector", vTimeSelector);
  },
};
