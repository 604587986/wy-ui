<template>
  <div id="app">
    <div>
      <h1>toast</h1>
      <div>
        <button @click="show">show toast (无 mask)</button>
        <button @click="show1">show toast (有 mask)</button>
      </div>
      <br />
      <button @click="show2">show toast (correct)</button>
      <button @click="show3">show toast (error)</button>
      <button @click="show4">show toast (warn)</button>
      <br />
      <br />
      <button @click="show5">show toast (动态)</button>
    </div>
    <br />
    <br />
    <br />
    <div>
      <h1>dialog</h1>
      <button @click="dialog">show dialog</button>
      <button @click="dialog1">show dialog (提交内容)</button>
      <button @click="dialog2">show dialog (slot)</button>
    </div>
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
  data() {
    return {
      num: 5
    };
  },
  methods: {
    show() {
      const toast = this.$createToast({
        txt: "toast without mask"
      });
      toast.show();
    },
    show1() {
      const toast = this.$createToast({
        txt: "toast with mask",
        mask: true
      });
      toast.show();
    },
    show2() {
      const toast = this.$createToast({
        txt: "toast correct",
        type: "correct"
      });
      toast.show();
    },
    show3() {
      const toast = this.$createToast({
        txt: "toast error",
        type: "error"
      });
      toast.show();
    },
    show4() {
      const toast = this.$createToast({
        txt: "toast warn",
        type: "warn"
      });
      toast.show();
    },
    show5() {
      this.num = 5;
      const toast = this.$createToast({
        type: "txt",
        $props: {
          txt: "num"
        },
        time: 0
      });
      toast.show();
      let timer = setInterval(() => {
        if (this.num <= 1) {
          clearInterval(timer);
          toast.hide();
        }

        this.num--;
      }, 1000);
    },
    dialog() {
      const dialog = this.$createDialog({
        icon: "iconfont icon-tishi",
        title: "alert",
        type: "alert"
      });
      dialog.show();
    },
    dialog1() {
      const dialog = this.$createDialog({
        type: "prompt",
        title: "提交内容",
        prompt: {
          value: "",
          placeholder: "请输入"
        }
      });
      dialog.show();
    },
    dialog2() {
      this.$createDialog(
        {
          type: "alert",
          confirmBtn: {
            text: "我知道了",
            active: true
          }
        },
        createElement => {
          return [
            createElement(
              "div",
              {
                class: {
                  "my-title": true
                },
                slot: "title"
              },
              [
                createElement("p", "标题"),

                createElement("img", {
                  style: {
                    width: "100%"
                  },
                  attrs: {
                    src:
                      "//www.baidu.com/img/2020dong_52a6c87350a54e5d62ddb71a99f29b9d.gif"
                  }
                })
              ]
            ),
            createElement(
              "p",
              {
                style: {
                  textAlign: "center"
                },
                slot: "content"
              },
              "内容"
            )
          ];
        }
      ).show();
    }
  }
};
</script>

<style lang="stylus" scoped>
button {
  margin-right: 10px;
}
</style>
