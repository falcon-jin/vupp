import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    port: 8081,
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.99.223:3000", //代理接口
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  build: {
    outDir: "../website",
  },
  // resolve: {
  //   alias: {
  //     "@": resolve(__dirname, "src"), // 路径别名
  //   },
  //   extensions: [".js", ".json", ".ts"],
  // },
});
