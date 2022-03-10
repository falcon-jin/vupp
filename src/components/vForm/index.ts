import App from "vue";
import vForm from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-form", vForm);
  },
};
