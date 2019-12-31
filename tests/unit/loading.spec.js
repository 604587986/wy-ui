import Vue from 'vue'
import Loading from '@/modules/loading'
import { expect } from 'chai'
import instantiateComponent from '@/common/helpers/instantiate-component'

describe('Loading.vue', () => {
  let vm
  afterEach(() => {
    if (vm) {
      vm.$parent.destroy()
      vm = null
    }
  })
  it('use', () => {
    Vue.use(Loading)
    expect(Vue.component(Loading.name))
      .to.be.a('function')
  })
  it('should render correct contents - no size', () => {
    vm = instantiateComponent(Vue, Loading, {})
    expect(vm.$el.className)
      .to.equal('wy-loading')
    expect(vm.$el.querySelector('.wy-loading-spinners').style.width)
      .to.equal('')
  })
  it('should render correct contents - with size', () => {
    vm = instantiateComponent(Vue, Loading, {
      props: {
        size: 30
      }
    })
    expect(vm.$el.querySelector('.wy-loading-spinners').style.width)
      .to.equal('30px')
  })
})
