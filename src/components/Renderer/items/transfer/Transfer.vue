<template>
  <div class="custom-transfer-wrapper">
    <el-button class="tree-main-btn" @click="show=true">{{formData[config.name] | nodesToStr(config.placeholder)}}</el-button>
    <el-dialog :title="formItemConfig.base.label" :visible.sync="show" v-if="show" append-to-body class="transfer-dialog">
      <custom-transfer v-model="temp" :data="options" :props="defaultProps" :node-key="config.nodeKey"></custom-transfer>
      <div class="btns">
        <el-button type="primary" @click="ok" size="small">确认</el-button>
        <el-button @click="show=false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomTransfer from '@/components/Renderer/items/transfer'
import treeMixins from '@/components/Renderer/mixins/tree'

export default {
  name: 'Transfer',
  props: ['config', 'formItemConfig', 'formData', 'options'],
  components: {CustomTransfer},
  mixins: [treeMixins],
  methods: {
    ok() {
      this.formData[this.config.name] = this.temp
      this.show = false
      this.$emit('check')
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.temp = JSON.parse(JSON.stringify(this.formData[this.config.name] || {}))
      }
    }
  },
  data() {
    return {
      show: false,
      temp: []
    }
  },
  computed: {
    defaultProps() {
      return {
        children: this.config.keyChildren || 'children',
        label: this.config.keyLabel || 'label'
      }
    }
  }
}
</script>

<style scoped>

</style>
