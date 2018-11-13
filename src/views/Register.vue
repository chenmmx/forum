<template>
    <div class="register">
    <nav-menu :activeIndex='"3"'></nav-menu>
      <div class="register-main" :span = '12'>
        <h2>用户注册</h2>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="账号">
              <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
              <el-input v-model="formLabelAlign.password1"></el-input>
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
        password: '',
        password1: ''
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
  .register {
    .register-main {
      background-color: #fff;
      width: 20%;
      margin: 150px auto;
      padding: 40px 40px 20px 20px;
      /* border: 1px solid black; */
      border-radius: 10px;
      box-shadow: 1px 2px 7px 0px #ccc;
      h2 {
          padding-left: 40px;
        }
      }
    }
</style>
