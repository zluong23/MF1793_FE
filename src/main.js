import { createApp } from "vue";
import App from "./App.vue";

import MyDialog from "./form/dialog.vue";
import MyToast from "./form/toastmeesage.vue";
// import MCombobox from 'ms-combobox'
import MyCombobox from "./form/cbb.vue";
// import VueAxios from 'vue-axios'
import axios from "axios";
// import{createRouter,createWebHis}
import { createRouter, createWebHistory } from "vue-router";
import manhemitter from 'tiny-emitter/instance'

import EmployeeList from "./form/body.vue";
import Setting from "./views/setting.vue";
import Bank from "./views/bank.vue";
import Money from "./views/money.vue";


const routers = [
  {
    path: "/",
    component: EmployeeList,
  },
  {
    path: "/setting",
    component: Setting,
  },
  {
    path: "/money",
    component: Bank,
  },
  {
    path: "/bank",
    component: Money,

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});
const app = createApp(App);

app.component("l-dialog", MyDialog);
app.component("m-combobox", MyCombobox);
app.component("m-toast", MyToast);
// app.use(VueAxios,{ $maxios: axios})
app.config.globalProperties.$maxios = axios;
app.config.globalProperties.$manhemitter = manhemitter;
app.use(router);
app.mount("#app");

// app.component("m-combobox",MCombobox)
