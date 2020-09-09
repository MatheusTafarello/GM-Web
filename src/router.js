import Vue from "vue";
import Router from "vue-router";

import { isSignedIn } from "@/services/auth";

import Login from "@/components/Login/Login.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
import RegisterAuthor from "@/components/Register/Author/RegisterAuthor.vue"
import AssistedTable from "@/components/Table/Assisted/AssistedTable.vue"
import AuthorTable from "@/components/Table/Author/AuthorTable.vue"
import UserTable from "@/components/Table/User/UserTable.vue"

Vue.use(Router);

const loggedInGuard = (to, from, next) => {
  if (isSignedIn()) {
    next();
  }
  else next("/");
}


export default new Router({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      beforeEnter: loggedInGuard,
      component: Dashboard,
    },
    {
      path: "/register_author",
      beforeEnter: loggedInGuard,
      component: RegisterAuthor
    },
    {
      path: "/manage_assisteds",
      beforeEnter: loggedInGuard,
      component: AssistedTable
    },
    {
      path: "/manage_authors",
      beforeEnter: loggedInGuard,
      component: AuthorTable
    },
    {
      path: "/manage_users",
      beforeEnter: loggedInGuard,
      component: UserTable
    }
  ],
});
