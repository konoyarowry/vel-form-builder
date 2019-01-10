import CheckBox from './items/CheckBox'
import DatePicker from './items/DatePicker'
import Input from './items/Input'
import Radio from './items/Radio'
import Select from './items/Select'
import Textarea from './items/Textarea'
import MultiSelect from './items/MultiSelect'
import Tree from './items/Tree'
import Transfer from './items/transfer/Transfer'
import Upload from './items/Upload'
import ColorPicker from './items/ColorPicker'
import mixins from './mixins'

const components = {
  CheckBox, DatePicker, Input, Radio, Select, Textarea, MultiSelect, Tree, Transfer, Upload, ColorPicker
}

export default {
  name: 'Renderer',
  mixins: [mixins],
  props: {
    options: {
      default() {
        return {}
      }
    },
    canConfigure: {
      default: false
    },
    index: Number,
    formData: {
      default() {
        return {}
      }
    },
    bindData: {
      default() {
        return {}
      }
    }
  },
  render(h) {
    if (!components.hasOwnProperty(this.options.component)) {
      return h('div')
    }
    const self = this
    return h('el-form-item', {
      props: {
        ...this.options.formItemConfig.base, prop: this.options.config.name
      },
      staticClass: 'renderer-item'
    }, [h(components[this.options.component], {
      props: {
        config: this.options.config,
        formItemConfig: this.options.formItemConfig,
        formData: this.formData,
        options: this.options.config.bind ? this.bindData[this.options.component] && this.bindData[this.options.component][this.options.config.keyBindData] : this.options.config.options
      },
      on: {
        check() {
          self.$emit('check')
        }
      }
    })].concat(this.getTextTip(h), this.getConfigBtns(h)))
  }
}
