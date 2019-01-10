<template>
  <el-form :model="formData" class="custom-form" :label-width="localData.formConfig.base['label-width']+'px'" size="medium" ref="form" v-if="localData.formConfig">
    <div class="list" :class="'cols-'+localData.formConfig.extra.cols">
      <div class="wrapper">
        <renderer v-for="(item,index) in localData.buildList" :key="index+Math.random()" :options="item" :formData="formData" :bindData="bindData"></renderer>
      </div>
    </div>
  </el-form>
</template>

<script>
import Renderer from '@/components/Renderer/Renderer'
import utils from '@/components/FormBuilder/utils'
export default {
  name: 'FormRenderer',
  props: {
    data: {
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
  components: {Renderer},
  methods: {
    validate(cb) {
      return this.$refs.form.validate(cb)
    },
    update() {
      this.formData = utils.formatFormData(this.data.buildList)
      this.localData = JSON.parse(JSON.stringify(this.data))
      this.localData.buildList = utils.formatRules(this.localData.buildList)
    },
    getFormData() {
      return JSON.parse(JSON.stringify(this.formData))
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.update()
      },
      immediate: true
    }
  },
  data() {
    return {
      formData: {},
      localData: {}
    }
  }
}
</script>
