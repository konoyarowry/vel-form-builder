<template>
  <el-date-picker type="date" :placeholder="config.placeholder" v-model="formData[config.name]"></el-date-picker>
</template>

<script>
export default {
  name: 'DatePicker',
  props: ['config', 'formData']
}
</script>
