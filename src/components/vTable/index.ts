import App from "vue";
import vTable from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-table", vTable);
  },
};
