import './assets/css/index.scss'

import FormBuilder from '@/components/FormBuilder'
import FormRenderer from '@/components/FormRenderer'
import SvgIcon from './icons/index.js'

const install = function(Vue) {
  Vue.component(FormBuilder.name, FormBuilder)
  Vue.component(FormRenderer.name, FormRenderer)
  Vue.component(SvgIcon.name, SvgIcon)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
