<template>
  <el-color-picker v-model="formData[config.name]"></el-color-picker>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: ['config', 'formData']
}
</script>

<style scoped>

</style>
