import App from "vue";
import vMenu from "./src/index.vue";
import vInfiniteMenu from "./src/menu.tsx";

export default {
  install(app: App) {
    app.component("v-menu", vMenu);
    app.component("v-infinite-menu", vInfiniteMenu);
  },
};
