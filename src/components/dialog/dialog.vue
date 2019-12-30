<template>
  <transition name="wy-dialog-fade">
    <wy-popup
      type="dialog"
      :z-index="zIndex"
      :mask="true"
      :center="true"
      v-show="isVisible"
      @mask-click="maskClick"
    >
      <div class="wy-dialog-main">
        <span class="wy-dialog-close" v-show="showClose" @click="close">
          <i class="cubeic-close"></i>
        </span>
        <div :class="containerClass">
          <p class="wy-dialog-icon" v-if="icon">
            <i :class="icon"></i>
          </p>
          <h2 v-if="title || $slots.title" class="wy-dialog-title">
            <slot name="title">
              <p class="wy-dialog-title-def">{{title}}</p>
            </slot>
          </h2>
          <div class="wy-dialog-content">
            <slot name="content">
              <div class="wy-dialog-content-def">
                <p v-html="content" v-if="content"></p>
                <input class="prompt-input" v-bind="prompt" v-model="promptValue" v-if="isPrompt" />
              </div>
            </slot>
          </div>
          <div class="wy-dialog-btns" :class="{'border-right-1px': isConfirm || isPrompt}">
            <slot name="btns">
              <a
                :href="_cancelBtn.href"
                class="wy-dialog-btn border-top-1px"
                :class="{'wy-dialog-btn_highlight': _cancelBtn.active, 'wy-dialog-btn_disabled': _cancelBtn.disabled}"
                v-if="isConfirm || isPrompt"
                @click="cancel"
              >{{_cancelBtn.text}}</a>
              <a
                :href="_confirmBtn.href"
                class="wy-dialog-btn border-top-1px"
                :class="{'wy-dialog-btn_highlight': _confirmBtn.active, 'wy-dialog-btn_disabled': _confirmBtn.disabled}"
                @click="confirm"
              >{{_confirmBtn.text}}</a>
            </slot>
          </div>
        </div>
      </div>
    </wy-popup>
  </transition>
</template>

<script type="text/ecmascript-6">
import wyPopup from "../popup/popup.vue";
import visibilityMixin from "../../common/mixins/visibility";
import popupMixin from "../../common/mixins/popup";

const COMPONENT_NAME = "wy-dialog";
const EVENT_CONFIRM = "confirm";
const EVENT_CANCEL = "cancel";
const EVENT_CLOSE = "close";

const defHref = "javascript:;";
const defConfirmBtn = {
  textType: "ok",
  active: true,
  disabled: false,
  href: defHref,
  text: "确定"
};
const defCancelBtn = {
  textType: "cancel",
  active: false,
  disabled: false,
  href: defHref,
  text: "取消"
};
const parseBtn = function(btn, defBtn) {
  if (typeof btn === "string") {
    btn = {
      text: btn
    };
  }
  const text = defBtn && defBtn.text;
  return Object.assign({}, defBtn, { text }, btn);
};

export default {
  name: COMPONENT_NAME,
  mixins: [visibilityMixin, popupMixin],
  props: {
    type: {
      type: String,
      default: "alert"
    },
    prompt: {
      type: Object,
      default() {
        return {
          value: "",
          placeholder: ""
        };
      }
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: false
    },
    confirmBtn: {
      type: [Object, String],
      default() {
        return {
          ...defConfirmBtn
        };
      }
    },
    cancelBtn: {
      type: [Object, String],
      default() {
        return {
          ...defCancelBtn
        };
      }
    }
  },
  data() {
    return {
      defHref,
      promptValue: this.prompt.value
    };
  },
  computed: {
    _confirmBtn() {
      return parseBtn.call(this, this.confirmBtn, defConfirmBtn);
    },
    _cancelBtn() {
      return parseBtn.call(this, this.cancelBtn, defCancelBtn);
    },
    isConfirm() {
      return this.type === "confirm";
    },
    isPrompt() {
      return this.type === "prompt";
    },
    containerClass() {
      return `wy-dialog-${this.type}`;
    }
  },
  watch: {
    "prompt.value": {
      handler: function(newVal) {
        this.promptValue = newVal;
      }
    }
  },
  methods: {
    maskClick(e) {
      this.maskClosable && this.cancel(e);
    },
    confirm(e) {
      if (this._confirmBtn.disabled) {
        return;
      }
      this.hide();
      this.$emit(EVENT_CONFIRM, e, this.promptValue);
    },
    cancel(e) {
      if (this._cancelBtn.disabled) {
        return;
      }
      this.hide();
      this.$emit(EVENT_CANCEL, e);
    },
    close(e) {
      this.hide();
      this.$emit(EVENT_CLOSE, e);
    }
  },
  components: {
    wyPopup
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@require '../../common/stylus/variable.styl';
@require '../../common/stylus/mixin.styl';

.wy-dialog-main {
  width: 270px;
  padding: 0;
  text-align: center;
  overflow: hidden;
  border-radius: 2px;
  background-color: $dialog-bgc;
}

.wy-dialog-confirm, .wy-dialog-alert {
  position: relative;
  overflow: hidden;
}

.wy-dialog-icon {
  margin-top: 20px;
  margin-bottom: 16px;
  line-height: 1;
  color: $dialog-icon-color;
  font-size: $fontsize-large-xxxx;

  i {
    display: inline-block;
    width: 30px;
    height: 30px;
    padding: 10px;
    box-sizing: content-box;
    border-radius: 50%;
    background-color: $dialog-icon-bgc;
    font-size: 100%;
  }

  + {
    .wy-dialog-title {
      .wy-dialog-title-def {
        margin-top: 0;
      }
    }
  }

  + {
    .wy-dialog-content {
      margin-top: -4px;
    }
  }
}

.wy-dialog-title {
  color: $dialog-title-color;
  font-size: $fontsize-large;
  line-height: 1;

  + {
    .wy-dialog-content {
      margin-top: 12px;
    }
  }
}

.wy-dialog-title-def {
  margin: 30px 16px 0;
  overflow: hidden;
  white-space: nowrap;
}

.wy-dialog-content {
  margin: 16px 0;
  text-align: left;
  color: $dialog-color;
  font-size: $fontsize-medium;
  line-height: 22px;

  .prompt-input {
    display: block;
    width: 100%;
    min-width: 0;
    padding: 10px;
    box-sizing: border-box;
    color: #666;
    line-height: inherit;
    background-color: inherit;
    border-radius: 2px;
    position: relative;
    border: 1px solid #ccc;
  }
}

.wy-dialog-content-def {
  padding: 0 16px;

  > p {
    display: table;
    margin: auto;

    + .wy-input {
      margin-top: 12px;
    }
  }
}

.wy-dialog-confirm, .wy-dialog-prompt {
  .wy-dialog-btns {
    .wy-dialog-btn {
      width: 50%;
      float: left;
    }

    &.border-right-1px {
      &::after {
        right: 50%;
        border-color: $dialog-btns-split-color;
      }
    }
  }
}

.wy-dialog-close {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  color: $dialog-close-color;
  font-size: $fontsize-large-x;
}

.wy-dialog-btns {
  overflow: hidden;
  width: 100%;
  font-size: 0;
}

.wy-dialog-btn {
  display: inline-block;
  width: 100%;
  padding: 17px 10px;
  margin: 0;
  font-size: $fontsize-large;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  color: $dialog-btn-color;
  background-color: $dialog-btn-bgc;
  background-clip: padding-box;
  box-sizing: border-box;

  &:active {
    background-color: $dialog-btn-active-bgc;
  }
}

.wy-dialog-btn_highlight {
  color: $dialog-btn-highlight-color;

  &:active {
    background-color: $dialog-btn-highlight-active-bgc;
  }
}

.wy-dialog-btn_disabled {
  color: $dialog-btn-disabled-color;

  &:active {
    background-color: $dialog-btn-disabled-active-bgc;
  }
}

.wy-dialog-fade-enter-active {
  animation: dialog-fadein 0.4s;

  .wy-dialog-main {
    animation: dialog-zoom 0.4s;
  }
}

@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
