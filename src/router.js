import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/type",
        name: "type",
        component: () => import( "./views/Type.vue")
      },
      {
        path: "/city",
        name: "city",
        component: resolve => {
            require(['./views/City.vue'], resolve)
        }
      },
      {
          path: "/school/:id",
          name: "school",
          component: () => import("./views/School.vue")
      },
      {
          path: "/detail/:id",
          name: "detail",
          component: resolve => {
              require(['./views/detail/Detail.vue'], resolve)
          }
      },
      {
          path: "/login",
          name: "login",
          component: () => import( "./views/Login.vue")
      },
      {
          path: "/register",
          name: "register",
          component: () => import( "./views/Register.vue")
      },
      {
          path: "/user",
          name: "user",
          component: resolve => {
              require(['./views/User.vue'], resolve)
          }
      },
      {
          path: "/store/:id",
          name: "store",
          component: resolve => {
              require(['./views/Store.vue'], resolve)
          }
      },
      {
          path: "/buy/:id",
          name: "buy",
          component: resolve => {
              require(['./views/Buy.vue'], resolve)
          }
      },
      {
          path: "/release",
          name: "release",
          component: resolve => {
              require(['./views/release.vue'], resolve)
          }
      },
      {
          path: "/cart",
          name: "cart",
          component: resolve => {
              require(['./views/cart.vue'], resolve)
          }
      },
      {
          path: "/collection",
          name: "collection",
          component: resolve => {
              require(['./views/collection.vue'], resolve)
          }
      },
      {
          path: "/order/:id",
          name: "order",
          component: resolve => {
              require(['./views/order/order.vue'], resolve)
          }
      },
      {
          path: "/identify",
          name: "identify",
          component: resolve => {
              require(['./views/identify.vue'], resolve)
          }
      },
      {
          path: "/search",
          name: "search",
          component: resolve => {
              require(['./views/search.vue'], resolve)
          }
      },
      {
          path: "/result",
          name: "result",
          component: resolve => {
              require(['./views/result.vue'], resolve)
          }
      },
  ]
});
