import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// swiper轮播图
import VueAweSomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAweSomeSwiper)

// axios
import api from './utils/api'
import SERVER from './utils/api/config'

// vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

import { Lazyload } from 'vant';
Vue.use(Lazyload);

// 图标字体
import './sass/iconfont/iconfont.css'
import './sass/iconfont/iconfont.js'

/**
 * axios
 * @type {AxiosStatic}
 */
Vue.prototype.$api = api
Vue.prototype.$SERVER = SERVER

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

