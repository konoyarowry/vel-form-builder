<template>
  <el-radio-group v-model="formData[config.name]">
    <el-radio v-for="(option,index) in options" :key="index" :label="option[config.keyLabel]"></el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'Radio',
  props: ['config', 'formData', 'options']
}
</script>
