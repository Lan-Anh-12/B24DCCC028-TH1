import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/doanso", component: "doanso" },
    { path: "/todolist", component: "todolist" },
  ],
  npmClient: 'pnpm',
});
