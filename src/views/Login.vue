<template>
    <div class="login">
    <nav-menu :activeIndex='"2"'></nav-menu>
    <div class="login-main">
        <h2>用户登录</h2>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="账号">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formLabelAlign)">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    resetForm: function () {
      this.formLabelAlign.name = ''
      this.formLabelAlign.password = ''
    },
    submitForm: function (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang = "less">
    .login {
        .login-main {
            background-color: #fff;
            width: 350px;
            margin: 150px auto;
            padding: 40px 40px 20px 0px;
            /* border: 1px solid black; */
            border-radius: 10px;
            box-shadow: 1px 2px 7px 0px #ccc;
            h2 {
                padding-left: 40px;
            }
        }
    }
</style>
