<template>
  <el-checkbox-group v-model="formData[config.name]">
    <el-checkbox v-for="(option,index) in options" :key="index" :label="option[config.keyLabel]"></el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'CheckBox',
  props: ['config', 'formData', 'options']
}
</script>
