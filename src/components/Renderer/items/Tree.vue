<template>
  <el-popover
    trigger="manual"
    v-model="visible"
    ref="popover">
    <el-button slot="reference" @click="onClick" ref="button" class="tree-main-btn">
      {{formData[config.name] | nodesToStr(config.placeholder) }}
    </el-button>
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" ref="input" @focus="visible=true" @blur="onBlur" clearable>
    </el-input>
    <el-tree
      :data="options"
      :filter-node-method="filterNode"
      :props="defaultProps"
      show-checkbox
      :node-key="nodeKey"
      ref="tree" v-if="visible">
    </el-tree>
    <div style="padding-left: 10px;margin:20px 0 10px">
      <el-button type="primary" @click="ok" size="small">确认</el-button>
      <el-button @click="$refs.input.blur()" size="small">取消</el-button>
    </div>
  </el-popover>
</template>

<script>
import utils from '@/components/FormBuilder/utils'
import treeMixins from '@/components/Renderer/mixins/tree'
export default {
  name: 'Tree',
  props: ['config', 'formData', 'options'],
  mixins: [treeMixins],
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    visible(val) {
      if(!val)return
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.formData[this.config.name])
      })
    }
  },
  methods: {
    onClick() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    ok() {
      this.formData[this.config.name] = this.$refs.tree.getCheckedNodes()
      this.$refs.input.blur()
      this.$emit('check')
    },
    onBlur(e) {
      if (utils.checkClass(e.relatedTarget, 'el-popover')) {
        this.$refs.input.focus()
      } else {
        this.visible = false
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  mounted() {
    const popover = this.$refs.popover.$el.querySelector('.el-popover')
    popover.style.width = this.$refs.button.$el.offsetWidth + 'px'
  },
  data() {
    return {
      visible: false,
      filterText: ''
    }
  },
  computed: {
    nodeKey() {
      return this.config.nodeKey || 'id'
    },
    defaultProps() {
      return {
        children: this.config.keyChildren || 'children',
        label: this.config.keyLabel || 'label'
      }
    }
  }
}
</script>
