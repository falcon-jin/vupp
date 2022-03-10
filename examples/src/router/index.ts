import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../components/container/src/index.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/icon-selector",
        name: "vIconSelector",
        component: () => import("../views/IconSelector/index.vue"),
      },
      {
        path: "/area-selector",
        name: "vAreaSelector",
        component: () => import("../views/AreaSelector/index.vue"),
      },
      {
        path: "/trend",
        name: "vTrend",
        component: () => import("../views/Trend/index.vue"),
      },
      {
        path: "/notification",
        name: "vNotification",
        component: () => import("../views/Notification/index.vue"),
      },
      {
        path: "/menu",
        name: "vMenu",
        component: () => import("../views/Menu/index.vue"),
      },
      {
        path: "/form",
        name: "vForm",
        component: () => import("../views/Form/index.vue"),
      },
      {
        path: "/modal-form",
        name: "vModalForm",
        component: () => import("../views/ModalForm/index.vue"),
      },
      {
        path: "/table",
        name: "vTable",
        component: () => import("../views/Table/index.vue"),
      },
      {
        path: "/calendar",
        name: "vCalendar",
        component: () => import("../views/Calendar/index.vue"),
      },
      {
        path: "/progress",
        name: "vProgress",
        component: () => import("../views/Progress/index.vue"),
      },
      {
        path: "/time-selector",
        name: "vTimeSelector",
        component: () => import("../views/TimeSelector/index.vue"),
      },
      {
        path: "/date-selector",
        name: "vDateSelector",
        component: () => import("../views/DateSelector/index.vue"),
      },
      {
        path: "/city-selector",
        name: "vCitySelector",
        component: () => import("../views/CitySelector/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
