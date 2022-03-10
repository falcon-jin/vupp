import App from "vue";
import vList from "./src/index.vue";

// app.use(vIconSelector)
export default {
  install(app: App) {
    app.component("v-list", vList);
  },
};
