import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_KEY,
    libraries: "places"
  }
})

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
}).$mount("#app");
