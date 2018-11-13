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
            <v-vueQuillEditor></v-vueQuillEditor>
        </div>
    </div>
</template>

<script>
import vueQuillEditor from '../components/VueQuillEditor.vue'
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
      input: ''
    }
  },
  components: {
    'v-vueQuillEditor': vueQuillEditor
  },
  methods: {}
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
        }
    }
</style>
