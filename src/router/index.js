import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";
import Connect from "@/components/Connect";
import Call from "@/components/Call";
import Toolbar from "@/components/Toolbar";
// import Main from '@/components/Main';
import Transfer from "@/components/Transfer";
// import Resources from '@/components/Resources';

import Error404 from "@/components/Error404";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    props: true
  },
  {
    path: "/connect",
    name: "Connect",
    component: Connect,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/call",
    name: "Call",
    component: Call,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/toolbar",
    name: "Toolbar",
    component: Toolbar,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: Transfer,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/404",
    name: "404",
    component: Error404
  },
  {
    path: "*",
    redirect: "/404"
  }
];

export default new Router({ routes, mode: "history" });
