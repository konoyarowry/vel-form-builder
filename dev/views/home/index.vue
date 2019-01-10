<template>
  <div>
    <el-button @click="visible=!visible">新增</el-button>
    <form-builder :visible.sync="visible" ref="builder" @save="onSave" :bindData="bindData"></form-builder>
  </div>
</template>

<script>
export default {
  name: 'demo',
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
            label: '呵呵呵'
          }, {
            label: '对对对'
          }]
        },
        CheckBox: {
          checkbox1: [{
            label: '多选框1'
          }, {
            label: '多选框2'
          }]
        },
        Select: {
          select1: [{
            value: '音乐',
            label: '音乐'
          }, {
            value: '电影',
            label: '电影'
          }]
        },
        Tree: {
          tree1: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }]
        },
        Transfer: {
          transfer1: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
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
</script>

<style scoped>

</style>
