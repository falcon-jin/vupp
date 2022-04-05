import type {App} from "vue";
import v from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-", v);
  },
};
