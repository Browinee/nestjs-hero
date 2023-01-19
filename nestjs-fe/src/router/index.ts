import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes = [] as RouteRecordRaw[];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
