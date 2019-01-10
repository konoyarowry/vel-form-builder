<template>
  <div class="el-transfer">
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      :data="sourceData"
      :node-key="nodeKey"
      :title="titles[0] || t('el.transfer.titles.0')"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onSourceCheckedChange"
      :filter="value"
      :anti="true">
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div class="el-transfer__buttons">
      <el-button
        type="primary"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0">
        <i class="el-icon-arrow-left"></i>
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </el-button>
      <el-button
        type="primary"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0">
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      :data="targetData"
      :node-key="nodeKey"
      :title="titles[1] || t('el.transfer.titles.1')"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onTargetCheckedChange"
      :filter="value">
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script>
import ElButton from 'element-ui/packages/button'
import Emitter from 'element-ui/src/mixins/emitter'
import Locale from 'element-ui/src/mixins/locale'
import TransferPanel from './transfer-panel.vue'
import Migrating from 'element-ui/src/mixins/migrating'

export default {
  name: 'CustomTransfer',

  mixins: [Emitter, Locale, Migrating],

  components: {
    TransferPanel,
    ElButton
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    buttonTexts: {
      type: Array,
      default() {
        return []
      }
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return []
      }
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return []
      }
    },
    renderContent: Function,
    value: {
      type: Array,
      default() {
        return []
      }
    },
    format: {
      type: Object,
      default() {
        return {}
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        }
      }
    },
    targetOrder: {
      type: String,
      default: 'original'
    },
    nodeKey: {
      type: String,
      default: 'id'
    }
  },

  data() {
    return {
      leftChecked: [],
      rightChecked: [],
      leftTree: '',
      rightTree: ''
    }
  },

  computed: {
    dataObj() {
      const key = this.props.key
      return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {})
    },

    sourceData() {
      return this.data
    },

    targetData() {
      return this.data
    },

    hasButtonTexts() {
      return this.buttonTexts.length === 2
    }
  },

  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', val)
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      }
    },

    onSourceCheckedChange() {
      const nodes = this.$refs.leftPanel.$refs.tree.getCheckedNodes()
      this.leftChecked = nodes
      this.$emit('left-check-change', nodes)
    },

    onTargetCheckedChange(tree, val) {
      const nodes = this.$refs.rightPanel.$refs.tree.getCheckedNodes()
      this.rightChecked = nodes
      this.$emit('right-check-change', nodes)
    },

    addToLeft() {
      let currentValue = this.value.slice()
      const valueObj = {}
      currentValue.forEach(v => {
        valueObj[v.id] = v
      })
      const rightObj = {}
      this.rightChecked.forEach(v => {
        rightObj[v.id] = v
      })
      for (let i in rightObj) {
        delete valueObj[i]
      }
      const newValue = []
      for (let i in valueObj) {
        newValue.push(valueObj[i])
      }
      this.$emit('input', newValue)
      this.$emit('change', newValue, 'right', this.leftChecked)
    },

    addToRight() {
      let currentValue = this.value.slice()
      const obj = {}
      currentValue.concat(this.leftChecked).forEach(v => {
        obj[v.id] = v
      })
      const newValue = []
      for (let i in obj) {
        newValue.push(obj[i])
      }
      this.$emit('input', newValue)
      this.$emit('change', newValue, 'right', this.leftChecked)
    }
  }
}
</script>
