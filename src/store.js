import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      schoolName: '', // 更改学校名称
      typeName: '', // 分类
      userInfo: '', // 用户信息
      o_num: '', // 商品数量
      active: '' // 改变图标颜色
  },
  mutations: {
    setSchool(state, payload) {
      state.schoolName = payload
    },
    setTypeName(state, payload) {
      state.typeName = payload
    },
    setUserInfo(state, payload) {
        state.userInfo = payload == null ? {} : payload
    },
    setCommodityNum(state, payload) {
        state.o_num = payload
    },
    setActive(state, payload) {
        state.active = payload
    }
  },
  actions: {}
});
