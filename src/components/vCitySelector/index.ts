import type {App} from "vue";
import vCitySelector from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-city-selector", vCitySelector);
  },
};
