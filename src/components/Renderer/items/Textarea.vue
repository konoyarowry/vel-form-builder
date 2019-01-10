<template>
  <el-input :placeholder="config.placeholder" type="textarea" v-model="formData[config.name]"></el-input>
</template>

<script>
export default {
  name: 'Input',
  props: ['config', 'formData']
}
</script>
