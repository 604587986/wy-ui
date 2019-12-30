<template>
  <div id="app">
    <button @click="show">show</button>
    <button @click="show2">show</button>
  </div>
</template>

<script>
import Vue from "vue";
import Toast from "./modules/toast";
import Dialog from "./modules/dialog";
Vue.use(Toast);
Vue.use(Dialog);

export default {
  name: "app",
  components: {},
  methods: {
    show() {
      const toast = this.$createToast({
        txt: "toast content"
      });
      toast.show();
    },
    show2() {
      this.$createDialog({
        type: "alert",
        title: "我是标题",
        content: "我是内容",
        icon: "iconfont icon-tishi"
      }).show();
    }
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
