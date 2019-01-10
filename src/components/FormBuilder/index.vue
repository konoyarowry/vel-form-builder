<template>
  <el-dialog title="自定义表单" :visible.sync="show" v-if="show" class="custom-form-dialog" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-container>
      <div class="main">
        <el-aside>
          <div class="components">
            <draggable :options="dragOptions1" :list="list" :clone="cloneData">
              <div v-for="item in list" :key="item.component" class="item"><svg-icon :iconClass="'vel-fb-'+item.component.toLowerCase()"></svg-icon><span>{{item.formItemConfig.base.label}}</span></div>
            </draggable>
          </div>
        </el-aside>
        <el-main :class="{empty:!configData.buildList.length}" class="preview">
          <el-form ref="custom-form" class="custom-form" :label-width="configData.formConfig.base['label-width']+'px'" size="medium">
            <div class="list" :class="'cols-'+configData.formConfig.extra.cols">
              <draggable :options="dragOptions2" :list="configData.buildList" class="draggable-box" @update="onUpdate" @add="onAdd">
                <renderer v-for="(item,index) in configData.buildList" :key="index+Math.random()" :options="item" :index="index" :canConfigure="true"
                          @handleClone="handleClone" @handleRemove="handleRemove" :class="{active:active===index}" @click.native.prevent="active=index" :bindData="bindData"></renderer>
              </draggable>
            </div>
          </el-form>
        </el-main>
        <el-aside>
          <config-panel :selected="configData.buildList[active]" :formConfig="configData.formConfig" :bindData="bindData"></config-panel>
        </el-aside>
      </div>
      <div class="footer">
        <el-button type="primary" size="mini" @click="save">保存</el-button><el-button size="mini" @click="preview">预览</el-button><el-button size="mini" @click="show=false">取消</el-button>
      </div>
    </el-container>
    <el-dialog
      title="预览"
      :visible.sync="innerVisible"
      v-if="innerVisible"
      append-to-body
      class="custom-form-dialog preiview-dialog">
      <div class="main">
        <form-renderer :data="configData" ref="renderer" :bindData="bindData"></form-renderer>
      </div>
      <div class="footer">
        <el-button type="primary" size="mini" @click="submit">提交</el-button><el-button size="mini" @click="innerVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import template from './template'
import Renderer from '@/components/Renderer/Renderer'
import FormRenderer from '@/components/FormRenderer'
import utils from './utils'
import ConfigPanel from './ConfigPanel'
export default {
  name: "FormBuilder",
  props: {
    data: {// 父组件传递的组件列表
      default() {
        return {}
      }
    },
    visible: Boolean,
    bindData: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
      innerVisible: false,
      active: -1,
      list: template,
      configData: {
        buildList: [],
        formConfig: {}
      },
      dragOptions1: { // 左侧备选组件拖拽配置
        ghostClass: 'ghost',
        group: {
          name: 'shared',
          pull: 'clone'
        },
        sort: false
      },
      dragOptions2: { // 右侧将要生成的表单的拖拽配置
        ghostClass: 'ghost',
        group: {
          put: ['shared']
        }
      }
    }
  },
  components: {draggable, Renderer, ConfigPanel, FormRenderer},
  watch: {
    visible(val) {
      if(val) {
        this.resetModal()
      }
      this.show = this.visible
    },
    show(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    onUpdate(e) {
      this.active = e.newIndex
    },
    onAdd(e) {
      this.active = e.newIndex
    },
    resetModal() {
      if(this.data.buildList) {
        this.configData = JSON.parse(JSON.stringify(this.data))
      }else{
        this.configData = {
          buildList: [],
          formConfig: {
            base: {
              'label-width': 80
            },
            extra: {
              cols: 1
            }
          }
        }
      }
    },
    cloneData(original) {
      const copy = JSON.parse(JSON.stringify(original))
      copy.config.name = copy.component + '_' + utils.formatDate(Date.now(), 'yyyyMMdd') + '_' + utils.getRandomStr(8)
      return copy
    },
    handleClone(index) {
      const copy = JSON.parse(JSON.stringify(this.configData.buildList[index]))
      this.configData.buildList.splice(index, 0, copy)
      this.$nextTick(() => {
        this.active = index + 1
      })
    },
    handleRemove(index) {
      this.configData.buildList.splice(index, 1)
      this.$nextTick(() => {
        this.active = index - 1 < 0 ? 0 : index - 1
      })
    },
    getData() {
      return JSON.parse(JSON.stringify(this.configData))
    },
    save() {
      this.$emit('save', this.getData())
    },
    preview() {
      this.innerVisible = true
    },
    submit() {
      this.$refs.renderer.validate(valid => {
        if(valid) {
          this.$alert(JSON.stringify(this.$refs.renderer.getFormData()), {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>
