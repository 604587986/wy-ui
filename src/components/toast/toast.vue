<template>
  <transition name="wy-toast-fade">
    <wy-popup
      type="toast"
      :z-index="zIndex"
      :mask="mask"
      v-show="isVisible"
      @mask-click="maskClick"
    >
      <i v-if="!isLoading && iconClass.length" class="wy-toast-icon" :class="iconClass"></i>
      <wy-loading v-if="isLoading"></wy-loading>
      <div v-show="txt" class="wy-toast-tip" v-html="txt"></div>
    </wy-popup>
  </transition>
</template>
<script type="text/ecmascript-6">
import wyLoading from "../loading/loading.vue";
import wyPopup from "../popup/popup.vue";
import visibilityMixin from "../../common/mixins/visibility";
import popupMixin from "../../common/mixins/popup";

const COMPONENT_NAME = "wy-toast";

const EVENT_TIMEOUT = "timeout";

export default {
  name: COMPONENT_NAME,
  mixins: [visibilityMixin, popupMixin],
  props: {
    type: {
      type: String,
      default: "loading"
    },
    icon: {
      type: String,
      default: ""
    },
    mask: {
      type: Boolean,
      default: false
    },
    txt: {
      type: String,
      default: ""
    },
    time: {
      type: Number,
      default: 3000
    },
    // By default, Toast has the bigest z-index among popoup-based components.
    zIndex: {
      type: Number,
      default: 900
    }
  },
  computed: {
    iconClass() {
      const iconClass = [];
      if (this.icon) {
        iconClass.push(this.icon);
      }
      const classMap = {
        correct: "iconfont icon-success",
        error: "iconfont icon-error",
        warn: "iconfont icon-warn"
      };
      const icon = classMap[this.type];
      if (icon) {
        iconClass.push(icon);
      }
      return iconClass;
    },
    isLoading() {
      return this.type === "loading";
    }
  },
  methods: {
    maskClick() {
      this.maskClosable && this.hide();
    },
    show() {
      this.isVisible = true;
      this.clearTimer();
      this.$nextTick(() => {
        if (this.time !== 0) {
          this.timer = setTimeout(() => {
            this.hide();
            this.$emit(EVENT_TIMEOUT);
          }, this.time);
        }
      });
    },
    hide() {
      this.isVisible = false;
      this.clearTimer();
    },
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  components: {
    wyPopup,
    wyLoading
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@require '../../common/stylus/variable.styl';

.wy-toast {
  &.wy-popup {
    z-index: 900;
  }

  .wy-popup-content {
    display: flex;
    align-items: center;
    padding: 13px 16px;
    color: $toast-color;
    background-color: $toast-bgc;
    border-radius: 2px;
  }

  .wy-toast-icon {
    width: 24px;
    height: 24px;
    font-size: $fontsize-large-xxx;
  }
}

.wy-toast-tip {
  line-height: 20px;
  font-size: $fontsize-medium;
  max-width: 12em;
  max-height: 40px;
  overflow: hidden;
}

.wy-toast-icon, .wy-loading {
  ~ .wy-toast-tip {
    margin-left: 8px;
  }
}

.wy-toast-fade-enter-active {
  animation: toast-in 0.2s;
}

.wy-toast-fade-leave-active {
  animation: toast-out 0.2s;
}

@keyframes toast-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes toast-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
