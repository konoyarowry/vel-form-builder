<template>
  <el-upload
    class="upload-demo"
    drag
    :action="config.action"
    :accept="config.accept"
    :limit="config.limit"
    :on-success="onSuccess"
    :file-list="formData[config.name]"
    :on-remove="onRemove"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>

<script>
export default {
  name: 'Upload',
  props: ['config', 'formData'],
  methods: {
    onSuccess(res, file) {
      this.formData[this.config.name].push({name: file.name})
      this.$emit('check')
    },
    onRemove(file, fileList) {
      this.formData[this.config.name] = fileList
    }
  }
}
</script>

<style scoped>

</style>
