<template>
    <div class="register">
        <nav-menu :activeIndex='"3"'></nav-menu>
        <div class="register-main">
            <div class="register-main-left">
                <h1>第六镜科技知识社区</h1>
                <h2>Users Registration</h2>
                <h3>Log in to share your thoughts.</h3>
            </div>
            <div class="register-main-right">
                <h2>User Registration</h2>
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="register-form">
                    <el-form-item label="Username：">
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Password：">
                        <el-input v-model="formLabelAlign.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm Password：">
                        <el-input v-model="formLabelAlign.password1" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="submitForm(formLabelAlign)">Sign Up</el-button>
                        <el-button @click="resetForm()">Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
              <el-alert
                :title="errorMessage"
                type="error" center v-show="isError">
            </el-alert>
            <el-alert
                :title="successMessage"
                type="success" center v-show="isSuccess">
            </el-alert>
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
        password: '',
        password1: ''
      },
      isError: false,
      errorMessage: 'hhh',
      isSuccess: false,
      successMessage: '注册成功！即将为你跳转至登录页面...'
    }
  },
  methods: {
    resetForm: function () {
      this.formLabelAlign.name = ''
      this.formLabelAlign.password = ''
      this.formLabelAlign.password1 = ''
    },
    submitForm: function (data) {
      if (data.name !== '' && data.password !== '' && data.password1 !== '') {
        if (data.password !== data.password1) {
          this.isError = true
          this.errorMessage = '两次密码不一致，请确认后重试！！'
        } else {
          this.$axios.post('/user/addUser', data)
            .then(res => {
              if (res.data.result === 0) {
                this.isError = true
                this.errorMessage = res.data.msg
              } else {
                this.isSuccess = true
                setTimeout(() => {
                  this.$router.push('/login')
                }, 1000)
              }
            })
            .then(err => {
              console.log(err)
            })
        }
      } else {
        this.isError = true
        this.errorMessage = '请确认所有项已填写！'
      }
    }
  }
}
</script>

<style lang = "less">
    .register {
        .register-main {
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
            .register-main-left {
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
            .register-main-right {
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
                margin-top: 120px;
                }
            .register-form {
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
        .register-main::after {
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
