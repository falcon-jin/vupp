import type {App} from "vue";
import vMenu from "./src/index.vue";
// @ts-ignore
import vInfiniteMenu from "./src/menu.tsx";

export default {
  install(app: App) {
    app.component("v-menu", vMenu);
    app.component("v-infinite-menu", vInfiniteMenu);
  },
};
