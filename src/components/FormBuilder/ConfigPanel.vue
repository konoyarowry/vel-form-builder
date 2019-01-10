<template>
  <el-tabs v-model="activeName" class="config-panel" :stretch="true">
    <el-tab-pane label="字段属性" name="field">
      <el-form :model="selected" :rules="rules" size="small" ref="configForm" v-if="selected.config" label-position="top">
        <el-form-item label="控件名称">
          <el-input autocomplete="off" placeholder="请输入控件名称" v-model="selected.formItemConfig.base.label"></el-input>
        </el-form-item>
        <el-form-item label="字段name值">
          <el-input autocomplete="off" placeholder="" v-model="selected.config.name"></el-input>
        </el-form-item>
        <el-form-item label="占位提示" v-if="selected.config.hasOwnProperty('placeholder')">
          <el-input autocomplete="off" placeholder="显示在框内的提示文字" v-model="selected.config.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="文字提示">
          <el-input autocomplete="off" placeholder="显示在表单项下方的提示文字" v-model="selected.config.textTip" type="textarea"></el-input>
        </el-form-item>
        <div class="line" v-if="showOptions"></div>
        <el-form-item label="选项" v-if="showOptions">
          <el-radio-group v-model="selected.config.bind" size="mini">
            <el-radio-button :label="false" v-if="selected.component!=='Tree'&&selected.component!=='Transfer'">静态数据</el-radio-button>
            <el-radio-button :label="true" >绑定数据</el-radio-button>
          </el-radio-group>
          <div v-if="selected.config.bind" class="bind-tab">
            <el-select v-model="selected.config.keyBindData" placeholder="选择数据key" clearable>
              <el-option
                v-for="(item, index) in Object.keys(bindData[selected.component]||{})"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div v-else class="bind-tab static-data">
            <el-form-item
              v-for="(option, index) in selected.config.options"
              :key="index">
              <div>
                <el-input v-model="option[selected.config.keyLabel]">
                  <template slot="prepend">标签</template>
                </el-input>
                <el-input v-model="option[selected.config.keyValue]" v-if="selected.component==='Select'||selected.component==='MultiSelect'">
                  <template slot="prepend">值</template>
                </el-input>
              </div>
              <div>
                <el-button type="danger" circle plain size="mini" @click.prevent="removeOption(index)">
                  <svg-icon iconClass="vel-fb-minus"></svg-icon>
                </el-button>
              </div>
            </el-form-item>
            <el-button type="text" @click.prevent="addOption()">添加选项</el-button>
          </div>
          <el-form-item prop="config.keyLabel">
            <el-input v-model="selected.config.keyLabel">
              <template slot="prepend">标签key</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="config.keyValue" v-if="selected.component==='Select'||selected.component==='MultiSelect'">
            <el-input v-model="selected.config.keyValue">
              <template slot="prepend">值key</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="config.keyChildren" v-if="selected.component==='Tree'||selected.component==='Transfer'">
            <el-input v-model="selected.config.keyChildren">
              <template slot="prepend">子节点key</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="config.nodeKey" v-if="selected.component==='Tree'||selected.component==='Transfer'">
            <el-input v-model="selected.config.nodeKey">
              <template slot="prepend">节点key</template>
            </el-input>
          </el-form-item>
        </el-form-item>
        <div class="line"></div>
        <el-form-item label="校验规则" class="rules">
          <el-form-item>
            <el-checkbox label="必填" name="required" v-model="selected.formItemConfig.extra.configRules.required"></el-checkbox>
          </el-form-item>
          <el-form-item v-if="selected.formItemConfig.extra.configRules.hasOwnProperty('min')">
            <el-col :span="11">
              <el-form-item prop="formItemConfig.extra.configRules.min">
                <el-input type="age" v-model.number="selected.formItemConfig.extra.configRules.min" autocomplete="off" placeholder="最小长度"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-form-item prop="formItemConfig.extra.configRules.max">
                <el-input type="age" v-model.number="selected.formItemConfig.extra.configRules.max" autocomplete="off" placeholder="最大长度"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item prop="formItemConfig.extra.configRules.reg" v-if="selected.formItemConfig.extra.configRules.hasOwnProperty('reg')">
            <el-input v-model="selected.formItemConfig.extra.configRules.reg" autocomplete="off" placeholder="正则表达式"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="校验失败提示">
          <el-input autocomplete="off" v-model="selected.formItemConfig.extra.failedMessage"></el-input>
        </el-form-item>
        <div class="line" v-if="selected.component==='Upload'"></div>
        <div v-if="selected.component==='Upload'">
          <el-form-item label="上传地址">
            <el-input autocomplete="off" v-model="selected.config.action"></el-input>
          </el-form-item>
          <el-form-item label="文件类型">
            <el-input autocomplete="off" v-model="selected.config.accept" placeholder="如application/pdf,image/png"></el-input>
          </el-form-item>
          <el-form-item label="数量限制">
            <el-input autocomplete="off" v-model.number="selected.config.limit"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="form">
      <el-form :model="formConfig" size="small" ref="formConfigForm" label-position="top">
        <el-form-item label="标签宽度">
          <el-input-number v-model="formConfig.base['label-width']" :step="10" :min="0" :max="200" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="列数">
          <el-radio-group v-model="formConfig.extra.cols">
            <el-radio :label="1">1</el-radio>
            <el-radio :label="2">2</el-radio>
            <el-radio :label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'ConfigPanel',
  props: {
    selected: {
      default() {
        return {}
      }
    },
    formConfig: {
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
  computed: {
    showOptions() {
      const arr = ['Radio', 'CheckBox', 'Select', 'MultiSelect', 'Tree', 'Transfer']
      return arr.indexOf(this.selected.component) > -1
    }
  },
  data() {
    const validator = (rule, value, callback) => {
      if(value && !Number(value)) {
        callback(new Error('请输入数字'))
      }
    }
    const validateReg = (rule, value, callback) => {
      if(value) {
        try{
          rule = new RegExp(value)
        }catch (e) {
          callback(new Error('请输入正确的正则表达式'))
        }
      }
    }
    const validateRequired = (rule, value, callback) => {
      if(!value) {
        callback(new Error('不能为空'))
      }
    }
    return {
      activeName: 'field',
      rules: {
        'formItemConfig.extra.configRules.min': {validator, trigger: 'change'},
        'formItemConfig.extra.configRules.max': {validator, trigger: 'change'},
        'formItemConfig.extra.configRules.reg': {validator: validateReg, trigger: 'change'},
        'config.keyLabel': {validator: validateRequired, trigger: 'change'},
        'config.keyValue': {validator: validateRequired, trigger: 'change'},
        'config.keyChildren': {validator: validateRequired, trigger: 'change'},
        'config.nodeKey': {validator: validateRequired, trigger: 'change'},
      }
    }
  },
  methods: {
    removeRule(i) {
      this.selected.formItemConfig.extra.configRules.splice(i, 1)
    },
    removeOption(index) {
      this.selected.config.options.splice(index, 1)
    },
    addOption() {
      if(this.selected.component === 'Radio' || this.selected.component === 'CheckBox') {
        const obj = {}
        obj[this.selected.config.keyLabel] = '新选项'
        this.selected.config.options.push(obj)
      }else{
        const obj = {}
        obj[this.selected.config.keyLabel] = '新选项'
        obj[this.selected.config.keyValue] = '新选项'
        this.selected.config.options.push(obj)
      }
    }
  }
}
</script>
