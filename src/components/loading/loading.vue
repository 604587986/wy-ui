<template>
  <div class="wy-loading">
    <span class="wy-loading-spinners" :style="style">
      <i class="wy-loading-spinner" v-for="item in balde" :key="item"></i>
    </span>
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = "wy-loading";

export default {
  name: COMPONENT_NAME,
  data() {
    return {
      balde: 12
    };
  },
  props: {
    size: {
      type: Number
    }
  },
  computed: {
    style() {
      if (!this.size) {
        return;
      }
      const value = `${this.size}px`;
      return {
        width: value,
        height: value
      };
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@require '../../common/stylus/variable.styl';

.wy-loading {
  font-size: $fontsize-large-xxx;
}

.wy-loading-spinners {
  position: relative;
  display: block;
  width: 1em;
  height: 1em;
}

.wy-loading-spinner {
  position: absolute;
  left: 44.5%;
  top: 37%;
  width: 2PX; // for rem
  height: 25%;
  border-radius: 50% / 20%;
  opacity: 0.25;
  background-color: currentColor;
  animation: spinner-fade 1s linear infinite;

  for num in (1 .. 12) {
    &:nth-child({num}) {
      animation-delay: ((num - 1) / 12)s;
      transform: rotate(30deg * (num - 6)) translateY(-150%);
    }
  }
}

@keyframes spinner-fade {
  0% {
    opacity: 0.85;
  }

  50% {
    opacity: 0.25;
  }

  100% {
    opacity: 0.25;
  }
}
</style>
