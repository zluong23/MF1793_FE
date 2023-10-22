<template>
  <div class="l-combobox2">
    <input class="l-combobox2__input" :value="itemSelected[propText]" />
    <button class="l-combobox2__button" @click="onShowData">
      <div class="icon"></div>
    </button>
    <div class="l-combobox2__data" v-show="showData">
      <a
        class="l-combobox2__item"
        v-for="(item, index) in data"
        :key="index"
        @click="onSelectItem(item)"
      >
        <div class="l-combobox2__text">{{ item[propText] }}</div>
        <div class="l-combobox2__icon"></div>
      </a>
    </div>
  </div>
</template>
<script>

export default {
  name: "MISACombobox",
  props: ["api", "propText", "propValue"],
  created() {
    this.loadData();
  },
  methods: {
    onShowData() {
      this.showData = !this.showData;
    },
    loadData() {
      this.$maxios.get(this.api).then((res) => {
        this.data = res.data;
        console.log(this.data);
        const indexSelected = this.data.findIndex(
          (i) => i[this.propValue] == this.modelValue
        );
        this.itemSelected = this.data[indexSelected];
      });
    },
    onSelectItem(item) {
      this.itemSelected = item;
      this.showData = false;
      this.$emit("update:modedlValue", item[this.propValue]);
    },
  },
  data() {
    return {
      data: [],
      showData: false,
      itemSelected: {},
    };
  },
};
</script>
<style>
@import url(../css/layout/main.css);
</style>
