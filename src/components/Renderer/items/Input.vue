<template>
  <el-input :placeholder="config.placeholder" v-model="formData[config.name]" clearable></el-input>
</template>

<script>
export default {
  name: 'Input',
  props: ['config', 'formData']
}
</script>
