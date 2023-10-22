<template>
  <div class="container">
    <TheHeader></TheHeader>
    <TheMenu></TheMenu>
    <router-view />
    <TheToast v-if="showToast"></TheToast>
    <TheNotification
      v-if="showNotification"
      :msgs="msgForNotification"
      :closeNotification="oncloseNotification"
    ></TheNotification>
  </div>
</template>

<script>
import TheMenu from "../src/form/menu";
import TheHeader from "../src/form/header.vue";
import TheToast from "../src/form/toastmeesage.vue";
import TheNotification from "../src/form/notification.vue";

export default {
  name: "App",
  components: {
    TheMenu,
    TheHeader,
    TheToast,
    TheNotification,
  },
  created() {
    this.$manhemitter.on("onShowNotification", this.onShowNotification);
  },
  methods: {
    onShowNotification(msg) {
      console.log(msg);
      this.showNotification = true;
      this.msgForNotification = [];
      this.msgForNotification.push(msg);
    },
    oncloseNotification() {
      this.showNotification = false;
    },
  },
  data() {
    return {
      showToast: false,
      showNotification: false,

      msgForNotification: [],
    };
  },
};
</script>

<style>
@import url(../src/css/layout/main.css);
</style>
