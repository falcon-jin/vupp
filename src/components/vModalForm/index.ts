import type {App} from "vue";
import vModalForm from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-modal-form", vModalForm);
  },
};
