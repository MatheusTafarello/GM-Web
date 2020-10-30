import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
}).$mount("#app");
