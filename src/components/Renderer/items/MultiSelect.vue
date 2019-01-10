<template>
  <el-select :placeholder="config.placeholder" v-model="formData[config.name]" multiple collapse-tags filterable>
    <el-option v-for="(option,index) in options" :key="index" :label="option[config.keyLabel]" :value="option[config.keyValue]"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MultiSelect',
  props: ['config', 'formData', 'options']
}
</script>

<style scoped>

</style>
