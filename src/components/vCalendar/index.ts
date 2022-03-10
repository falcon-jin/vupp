import App from "vue";
import vCalendar from "./src/index.vue";

export default {
  install(app: App) {
    app.component("v-calendar", vCalendar);
  },
};
