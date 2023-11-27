<template>
  <!--  -->
  <div class="dialog2-container">
    <div class="card-dialog2">
      <p class="card-title">Thông tin</p>
      <button
        @click="btnCloseNotification"
        class="icon-close__notification"
      ></button>
      <div class="card-title2">
        <!-- <div class="l-icon__notification" :class="{'icon--add':type == 'add' , 'icon--hoi':type == 'hoi'}">

        </div> -->
        <li v-for="item in msgs" :key="item">{{ item }}</li>
      </div>

      <button class="btn-dialog3" @click="btnOk">Đồng ý</button>
    </div>
  </div>
  <!-- v-if="isShowDialog2" -->
</template>
<script>
export default {
  name: "MNotification",
  props: {
    type: {
      type: String,
      default: "add",
      require: false,
    },
    closeNotification: {
      type: Function,
      default: () => {},
      required: false,
    },
    msgs: {
      type: Array,
      default: () => {
        return [];
      },
      require: true,
    },
    images: {
      type: Array,
      default: () => {
        return [];
      },
      require: true,
    },
  },

  data() {
    return {
      onNotification: false,
    };
  },
  methods: {
    btnOk() {
      this.closeNotification();
    },
    btnCloseNotification() {
      this.closeNotification();
      console.log(this.closeNotification);
    },
  },
};
</script>
<style>
@import url(../css/layout/main.css);
</style>
