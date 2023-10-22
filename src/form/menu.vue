<template>
  <aside>
    <div>
    <router-link to="/">
     
        <span class="icon_home"> </span>
        <p>Trang chủ</p>

      </router-link>
      <router-link to="/money" >
        <span class="icon_report">  </span>
        <p >Tiền mặt</p>
      </router-link >
      <router-link to="/bank">
        <span class="icon_ures">  </span>
        <p style="margin-left: 7px;">Ngân hàng</p>
      </router-link>

      <router-link to="/setting">
        <span class="icon_settings "> </span>
        <p  style="margin-left: 6px;">Cài đặt</p>
      </router-link>
    
      <!-- <a href="#">
        <span class="icon_settings "> </span>
     
      </a> -->
    </div>
  </aside>
</template>
<script>
export default {
  name: "TheMenu",
};
</script>
<style></style>
