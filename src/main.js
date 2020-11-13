import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'vuetify/dist/vuetify.css'
import "./styles/global.scss";
import "./styles/style.scss";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(VueAxios, axios)

Vue.use(Loading, {
  color: "#007fff",
  loader: "dots",
  width: 80
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
