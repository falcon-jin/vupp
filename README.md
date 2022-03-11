## VUPP

> Vue3 + Element Plus + Typescript 疯装的业务组件库.
> 由 [`der-cli`](https://der-cli.vercel.app) 保驾护航

### 开始

快速启动一个 [vite]() 项目:

```shell
$ yarn create vite demo --template vue-ts

$ cd demo
$ yarn
$ yarn dev
```

#### 安装依赖

```shell
$ yarn add element-plus @element-plus/icons-vue
$ yarn add vupp
```

#### 使用

> 示例请参考[examples](./examples/src/views/).

```js
// src/main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import App from "./App.vue";

import vupp from "vupp"; // all in
import "vupp/lib/style.css";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(vupp);
app.mount("#app");
```

使用

```vue
<template>
  <v-date-selector
    @startChange="handleStartChange"
    @endChange="handleEndChange"
    :startOptions="startOptions"
  />
  <br />
  <v-date-selector
    :disableBeforeToday="false"
    @startChange="handleStartChange"
    @endChange="handleEndChange"
  />
</template>

<script setup lang="ts">
const handleStartChange = (data: Date) => {
  console.log("startChange", data);
};
const handleEndChange = (data: any) => {
  console.log("startChange", data);
};

// extend
let startOptions = {
  clearable: false,
};
</script>
```

## Licence

[GPL](LICENSE)
