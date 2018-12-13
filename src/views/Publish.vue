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
              <el-input v-model="title" placeholder="请输入标题"></el-input>
            </p>
            <mavon-editor v-model="content" :subfield = false :defaultOpen= manner></mavon-editor>
            <el-button type="primary" @click="sendContent()">发表</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '学术论文',
        label: '学术论文'
      }, {
        value: '算法',
        label: '算法'
      }, {
        value: '前端',
        label: '前端'
      }, {
        value: '后端',
        label: '后端'
      }, {
        value: 'Android',
        label: 'Android'
      }],
      value: '',
      title: '',
      content: '',
      poststitle: '',
      manner: 'edit'

    }
  },
  methods: {
    sendContent () {
      if (this.title !== '' && this.value !== '' && this.content !== '') {
        this.$axios.post('/api/posts/addPosts', {
          postContent: this.content,
          postType: this.value,
          postTitle: this.title,
          username: sessionStorage.getItem('username'),
          userID: sessionStorage.getItem('user_id')
        })
          .then(res => {
            if (res.data.result === 0) {
              this.$notify({
                title: '成功',
                message: '发表成功，正在为你跳转至首页...',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$notify({
          title: '警告',
          message: '注意，请确认你的所有空都填写了',
          type: 'warning'
        })
      }
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
            border-radius: 5px;
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
