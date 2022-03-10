import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import App from "./App.vue";
import "./mock";

// import vupp from "../../src/index"; // dev
// import vupp from "../../lib/vupp.esm"; // all
// import "../../lib/style.css";
import vupp from "vupp"; // all
import "vupp/lib/style.css";
// import vMenu from "../../lib/components/vMenu/index.esm";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(vupp);
// app.use(vMenu);
app.mount("#app");
