import Vue from 'vue'

import ElementUI from 'element-ui'

import FormBuilder from '@/components/FormBuilder'
import FormRenderer from '@/components/FormRenderer'
import SvgIcon from '../src/icons/index.js'

import '../src/styles/element-variables.scss'

// import './icons'
// 已经封装好了，直接把.svg放在icons/svg就可以使用了，具体实现 <svg-icon :class-name="className" icon-class="nav"></svg-icon>

import App from './App'
import router from './router'

Vue.config.productionTip = false

// rem设置 根据载入的设备的宽度去更改html的width
let width = document.documentElement.clientWidth
document.write(`<style>html{font-size:${width / 10}px}</style>`)

Vue.use(ElementUI)
Vue.component(FormBuilder.name, FormBuilder)
Vue.component(FormRenderer.name, FormRenderer)
Vue.component(SvgIcon.name, SvgIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
