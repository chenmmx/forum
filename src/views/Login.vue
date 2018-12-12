<template>
    <div class="login">
        <nav-menu :activeIndex='"2"'></nav-menu>
        <div class="login-main">
            <div class="login-main-left">
                <h1>第六镜科技知识社区</h1>
                <h2>Users Login</h2>
                <h3>Log in to share your thoughts.</h3>
            </div>
            <div class="login-main-right">
                <h2>Sign Up</h2>
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="login-form">
                    <el-form-item label="Username：">
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Password：">
                        <el-input v-model="formLabelAlign.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="submitForm(formLabelAlign)">Sign Up</el-button>
                        <el-button @click="resetForm()">Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
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
      if (data.name !== '' && data.password !== '') {
        this.$axios.post('/api/user/login', data)
          .then(res => {
            if (res.data.result === 1) {
              this.$notify.error({
                title: '失败',
                message: '请确认你的用户名或密码正确'
              })
            } else {
              this.$notify({
                title: '成功',
                message: '登录成功，正在为你跳转至首页...',
                type: 'success'
              })
              sessionStorage.setItem('isLogin', true)
              sessionStorage.setItem('username', data.name)
              this.$store.state.isLogin = sessionStorage.getItem('isLogin')
              this.$store.state.username = sessionStorage.getItem('username')
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
          title: '失败',
          message: '请确认你的用户名或密码已填写',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang = "less">
    .login {
        .login-main {
            width: 900px;
            height: 700px;
            background-position: center top;
            background-size: cover;
            overflow: hidden;
            border-radius: 8px;
            padding: 20px;
            position: relative;
            left: 23%;
            top: 80px;
            .login-main-left {
                width: 500px;
                position: absolute;
                left: 0;
                padding: 20px;
                top: 240px;
                h3 {
                    color: #f0f0f0;
                    font-weight: 300;
                }
            }
            .login-main-right {
            /* border-left: 1px solid #f0f0f0; */
            width: 350px;
            position: absolute;
            right: 0;
            top: 0px;
            height: 700px;
            background-color: rgba(0,0,0,.1);
            /* border: 1px solid black; */
            padding: 25px;
            h2 {
                color: #fff;
                text-align: left;
                font-size: 34px;
                font-family: 'Microsoft YaHei';
                margin-top: 160px;
                }
            .login-form {
                margin-top: 60px;
                .el-input {
                    .el-input__inner {
                        border-bottom:#f0f0f0 1px solid;
                        border-left-width:0px;
                        border-right-width:0px;
                        border-top-width:0px;
                        background-color: transparent;
                        border-radius: 0;
                        color: #fff;
                    }
                }
                .el-form-item__label {
                    color: #ccc;
                    font-size: 18px;
                    text-align: left;
                    width: 100%;
                    font-family: 'Microsoft YaHei';
                }
                .el-button--success {
                    margin-right: 20px;
                    position: absolute;
                    left: 0;
                }
            }
            }
        }
        .login-main::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255,0.8);
            z-index: -1;
            background-image: url('../assets/bg.jpg');
            background-position: center top;
            background-size: cover;
            background-attachment: fixed;
            -webkit-filter: blur(20px);
            -moz-filter: blur(20px);
            -ms-filter: blur(20px);
            -o-filter: blur(20px);
            filter: blur(20px);
            margin: -30px;
        }
    }
</style>
