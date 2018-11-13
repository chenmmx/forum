<template>
    <div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
    <el-button type="primary" @click="getContent()">提交</el-button>
    </div>
</template>
<script>
// import { quillEditor } from 'vue-quill-editor'
export default{
  data () {
    return {
      content: null,
      editorOption: {}
    }
  },
  methods: {
    onEditorBlur () {
    },
    onEditorFocus () { // 获得焦点事件
    },
    onEditorChange () { // 内容改变事件
    },
    getContent () {
      if (this.content !== null && this.content !== '') {
        console.log(this.content)
      }
    }
  }
}
</script>

<style>
    .ql-container {
        height: 360px;
    }
    .el-button--primary {
        margin-top: 30px;
    }
</style>
