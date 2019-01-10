<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate">
        {{ title }}
      </el-checkbox>
    </p>

    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-input
        placeholder="输入关键字进行过滤" clearable
        v-model="filterText" class="el-transfer-panel__filter" size="small" prefix-icon="el-icon-search">
      </el-input>
      <div class="tree-wrapper">
        <custom-tree
          :data="data"
          show-checkbox
          ref="tree"
          :node-key="nodeKey"
          :props="props"
          :filter-node-method="filterNode" class="is-filterable" @check-change="handleCheckChange">
        </custom-tree>
      </div>
    </div>
    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import CustomTree from '@/components/Renderer/items/tree/index'
import ElCheckbox from 'element-ui/packages/checkbox'
import ElInput from 'element-ui/packages/input'
import Locale from 'element-ui/src/mixins/locale'

export default {
  mixins: [Locale],

  name: 'ElTransferPanel',

  componentName: 'ElTransferPanel',

  components: {
    CustomTree,
    ElCheckbox,
    ElInput
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    props: Object,
    filter: Array,
    anti: Boolean,
    nodeKey: {
      type: String,
      default: 'id'
    }
  },

  data() {
    return {
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true,
      filterText: '',
      isIndeterminate: false
    }
  },
  watch: {
    filter() {
      this.updateAllChecked()
      this.$refs.tree.filter()
      this.$refs.tree.setCheckedKeys([-123 * Math.random()])
    },

    filterText() {
      this.$refs.tree.filter()
    }
  },

  computed: {
    labelProp() {
      return this.props.label || 'label'
    },

    keyProp() {
      return this.props.key || 'key'
    },

    disabledProp() {
      return this.props.disabled || 'disabled'
    },

    hasFooter() {
      return !!this.$slots.default
    }
  },

  mounted() {
    this.$refs.tree.filter()
  },

  methods: {
    handleCheckChange(data, checked, indeterminate) {
      this.updateAllChecked()
      this.$emit('checked-change')
      const tree = this.$refs.tree
      const node = tree.getNode(data)
      const parent = node.parent
      const nodes = parent.childNodes
      let visibleNum = nodes.reduce((pre, next) => {
        if (next.visible) return pre + 1
        return pre
      }, 0)
      if (visibleNum === 1) {
        if (!checked) {
          if(!node.indeterminate) {
            parent.indeterminate = false
            parent.checked = false
          }
        }else{
          parent.indeterminate = false
          parent.checked = true
        }
      }
    },

    filterNode(value, data) {
      const txtFilterRes = data.label.indexOf(this.filterText) !== -1
      let arrFilterRes = this.filter.some(v => v.id === data.id)

      if (this.anti) {
        arrFilterRes = !arrFilterRes
      }
      return arrFilterRes && txtFilterRes
    },

    updateAllChecked() {
      const tree = this.$refs.tree
      const checkedLen = tree.getCheckedKeys().length
      const visibleLen = tree.getVisibleKeys().length
      this.isIndeterminate = checkedLen > 0 && checkedLen < visibleLen
      this.allChecked = checkedLen > 0 && checkedLen >= visibleLen
    },

    handleAllCheckedChange(value) {
      if (value) {
        this.$refs.tree.setCheckedKeys(this.$refs.tree.getVisibleKeys())
      }else{
        this.$refs.tree.setCheckedKeys([-123 * Math.random()])
      }
    }
  }
}
</script>
