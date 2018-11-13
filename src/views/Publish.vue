<template>
    <div class="publish">
        <nav-menu></nav-menu>
        <div class="publish-main">
            <p>类型选择：
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <el-input v-model="input" placeholder="请输入标题"></el-input>
            </p>
            <mavon-editor v-model="value" :subfield = false :defaultOpen= manner></mavon-editor>
            <el-button type="primary" @click="getContent()">提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      input: '',
      content: '',
      manner: 'edit'
    }
  },
  methods: {
    getContent () {
      console.log(this.value)
      this.content = this.value
    }
  }
}
</script>

<style scoped lang="less">
    .publish {
        .publish-main {
            width: 60%;
            position: relative;
            left: 10%;
            top: 80px;
            background-color: #fff;
            padding: 20px;
            .quill-editor {
                background-color: #fff;
                .ql-container {
                    height: 300px !important;
                }
            }
            .el-button--primary {
                margin-top: 20px;
            }
        }
    }
</style>
