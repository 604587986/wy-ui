import Vue from 'vue'
import Popup from '@/modules/popup'
import sinon from 'sinon'
import chai, { expect } from 'chai'
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
import instantiateComponent from '@/common/helpers/instantiate-component'

describe('Popup', () => {
  describe('Popup.vue', () => {
    let vm
    afterEach(() => {
      if (vm) {
        vm.$parent.destroy()
        vm = null
      }
    })

    it('use', () => {
      Vue.use(Popup)
      expect(Vue.component(Popup.name))
        .to.be.a('function')
    })

    it('should render correct contents - no type', () => {
      vm = instantiateComponent(Vue, Popup, {
        props: {
          type: ''
        }
      })
      expect(vm.$el.className)
        .to.equal('wy-popup wy-popup_mask')
      expect(vm.$el.querySelector('.wy-popup-container').className)
        .to.equal('wy-popup-container wy-popup-center')
    })

    it('should render correct contents', () => {
      vm = instantiateComponent(Vue, Popup, {
        props: {
          type: 'xx',
          content: 'popup content',
          position: 'top',
          maskClosable: true
        }
      })
      vm.show()
      expect(vm.$el.className)
        .to.equal('wy-popup wy-popup_mask wy-xx')
      expect(vm.$el.querySelector('.wy-popup-container').className)
        .to.equal('wy-popup-container wy-popup-top')
      expect(vm.$el.querySelector('.wy-popup-content').innerHTML)
        .to.equal('popup content')
      vm.$el.querySelector('.wy-popup-mask').click()
      expect(vm.isVisible)
        .to.be.false
    })

    it('should toggle by change v-model visible', function (done) {
      this.timeout(1000)

      const toggleHandler = sinon.spy()
      vm = instantiateComponent(Vue, Popup, {
        props: {
          visible: true
        },
        on: {
          toggle: toggleHandler
        }
      })

      vm.$parent.updateRenderData({
        props: {
          visible: false
        },
        on: {
          toggle: toggleHandler
        }
      })

      vm.$parent.$forceUpdate()

      setTimeout(() => {
        expect(toggleHandler).to.be.callCount(2)

        done()
      }, 50)
    })

    it('events', () => {
      const clickHandler = sinon.spy()
      vm = instantiateComponent(Vue, Popup, {
        props: {
          type: 'xx',
          content: 'popup content'
        },
        on: {
          'mask-click': clickHandler
        }
      })
      vm.$el.querySelector('.wy-popup-mask').click()
      expect(clickHandler)
        .to.have.been.calledOnce
    })
  })

  describe('Popup API', () => {
    it('$createPopup API', () => {
      const clickHandler = sinon.spy()
      let ins
      const vm = new Vue({
        template: '<div>xx</div>',
        methods: {
          showAPI() {
            ins = this.$createPopup({
              type: 'xx',
              content: 'popup api content',
              onMaskClick: clickHandler
            })
            ins.show()
          }
        }
      })
      vm.showAPI()
      expect(ins.isVisible)
        .to.be.true
      expect(ins.$el.parentElement)
        .to.equal(document.body)
      expect(ins.$el.querySelector('.wy-popup-content').innerHTML)
        .to.equal('popup api content')
      ins.$el.querySelector('.wy-popup-mask').click()
      expect(clickHandler)
        .to.have.been.calledOnce
      ins.remove()
      expect(ins.$el.parentElement)
        .to.be.null
      vm.$destroy()
    })
  })
})
