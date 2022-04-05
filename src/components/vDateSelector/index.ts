import type {App} from "vue";
import vDateSelector from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-date-selector", vDateSelector);
  },
};
