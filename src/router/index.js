import { createWebHistory, createRouter } from "vue-router";

import LandingPageView from "@/views/LandingPageView.vue";
import SignInView from "@/views/SignInView.vue";
import ThankYouView from "@/views/ThankYouView.vue";
import DashboardView from "@/views/DashboardView.vue";
import OrdersView from "@/views/OrdersView.vue";
import ReceiptView from "@/views/ReceiptView.vue";
import ScannerView from "@/views/ScannerView.vue";
import testScanner from "@/views/testScanner.vue";


const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPageView
    },
    {
        path: '/test',
        name: "Test",
        component: testScanner
    },
    {
        path: "/signin",
        name: "SignIn",
        component: SignInView
    },
    {
        path: '/dashboard',
        children: [
          { path: '', component: DashboardView },
          { path: 'orders', component: OrdersView },
          { path: 'orders/:id', component: ReceiptView },
          { path: "scan", component: ScannerView},
        ], 
      },
    {
        path: "/thank-you/:id",
        name: "ThankYou",
        component: ThankYouView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router