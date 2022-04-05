import type {App} from "vue";
import vNotification from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-notification", vNotification);
  },
};
