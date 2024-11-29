import { createWebHistory, createRouter } from "vue-router";


import HomeView from "@/views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_UR),
    routes
})

export default router