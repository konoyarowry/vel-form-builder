# vel-form-builder

------

基于**Vue**、**ElementUI**、**Vue.Draggable**，并参考了[https://github.com/GavinZhuLei/vue-form-making](https://github.com/GavinZhuLei/vue-form-making)

> * 扩展了Element组件
> * 以模态框展示
> * 内置form-builder和form-renderer两个组件，生成和渲染分工明确
> * 使用Element主题色变量，与Element同步主题色

## 安装

> npm i vel-form-builder -S

## 引入

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VelFormBuilder from 'vel-form-builder'
import 'vel-form-builder/lib/main.css'

import App from './App.vue';

Vue.use(ElementUI);
Vue.use(VelFormBuilder);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

## 自定义主题色

在设置Element主题色的 `element-variables.scss` 文件中，加入vel-form-builder的scss文件

```javascript
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
@import '~vel-form-builder/src/assets/css/index';
```

## 组件
### form-builder

`form-builder` 的主要功能是根据用户配置的表单，生成一个包含了配置信息的对象 `configData`，该对象传给 `form-renderer` 可渲染出表单

#### 基础用法

```javascript
<form-builder :visible.sync="visible" ref="builder" @save="onSave" :bindData="bindData"></form-builder>

<script>
export default {
  data() {
    return {
      visible: false,
      bindData: {
        Radio: {
          radio1: [{
            label: '男'
          }, {
            label: '女'
          }],
          radio2: [{
            label: '北京'
          }, {
            label: '上海'
          }, {
            label: '广州'
          }, {
            label: '深圳'
          }]
        },
        CheckBox: {
          checkbox1: [{
            label: '多选框1'
          }, {
            label: '多选框2'
          }]
        }
      }
    }
  },
  methods: {
    onSave(data) {
      console.log(data)
    }
  }
}
</script
```

#### Attributes

| 参数        | 说明   |  类型  |  默认值
| -----:      | -----: | ----:  |  ----:  |
| visible     | 是否显示 Dialog，支持 .sync 修饰符 |   Boolean | false
| data        |   使用 `configData` 初始化以编辑已有的表单   |   Obejct   | —
| bindData        |    给有选项的组件绑定数据使用    |  Obejct  | —

#### Events

| 事件名称        | 说明   |  回调参数 |
| -----:      | -----: | ----:  |
| save     | 在配置对话框点击保存时触发 |   `configData` |

#### Methods

| 方法名        | 说明   |  参数 |
| -----:      | -----: | ----:  |
| getData     | 获取 `configData` |   — |

### form-renderer

`form-renderer` 的功能是根据 `configData` 渲染出表单

#### 基础用法

```javascript
<form-renderer :data="configData" ref="renderer" :bindData="bindData"></form-renderer>

<script>
export default {
  data() {
    return {
      configData: {
          "buildList": [{
            "component": "Input",
            "formItemConfig": {
              "base": {"label": "输入框"},
              "extra": {"configRules": {"required": false, "min": "", "max": "", "reg": ""}, "failedMessage": ""}
            },
            "config": {
            "placeholder": "",
            "valueType": "string",
            "textTip": "",
            "name": "Input_20190110_nWu2J50k"
            }
          }],
          "formConfig": {"base": {"label-width": 80}, "extra": {"cols": 1}}
        },
      bindData: {
        Radio: {
          radio1: [{
            label: '男'
          }, {
            label: '女'
          }],
          radio2: [{
            label: '北京'
          }, {
            label: '上海'
          }, {
            label: '广州'
          }, {
            label: '深圳'
          }]
        },
        CheckBox: {
          checkbox1: [{
            label: '多选框1'
          }, {
            label: '多选框2'
          }]
        }
      }
    }
  }
}
</script
```

#### Attributes

| 参数        | 说明   |  类型  |  默认值
| -----:      | -----: | ----:  |  ----:  |
| data        |   `configData` 生成表单   |   Obejct   | —
| bindData        |    给有选项的组件绑定数据使用    |  Obejct  | —

#### Methods

| 方法名        | 说明   |  参数 |
| -----:      | -----: | ----:  |
| validate     | 对表单进行校验，间接调用了ElementUI Form组件的validate |   Function(callback: Function(boolean, object)) |
| getFormData     | 获取表单内容 `formData` 对象，键值关系为name—value |   — |
