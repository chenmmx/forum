<template>
    <div class="infomation">
        <nav-menu></nav-menu>
      <div class="infomation-content">
        <span>头像上传:</span><el-upload class="img-upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="info">
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
        <h2>密码修改</h2>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="info">
          <el-form-item label="当前密码">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
        </el-form>
      </div>
        <div class="side">
          <div class="side-person">
              <h3>个人信息</h3>
              <div class="isLogin">
                  <router-link class="user" :to="{name:'user'}">
                      <img src="../assets/xbx.jpg" alt="">
                  </router-link>
                  <span>&nbsp; wangxiaobao</span>
                  <p>积分:0</p>
                  <el-button type="success"><router-link :to="{name: 'publish'}">发布话题</router-link></el-button>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess (response, file, fileList) {
      console.log(file)
    }
  }
}
</script>

<style lang = "less">
  .infomation {
    text-align: left;
    .infomation-content {
      color: #fff;
      background-position: center top;
      background-size: cover;
      overflow: hidden;
      border-radius: 5px;
      width: 60%;
      position: relative;
      left: 10%;
      top: 80px;
      padding: 20px;
      .info {
        margin-top: 30px;
        .el-form-item {
          width: 30%;
          .el-form-item__label {
            color: #fff;
          }
        }
      }
      .img-upload {
        width: 400px;
        position: relative;
        left: 130px;
      }
    }
    .infomation-content::after {
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
      -webkit-filter: blur(17px);
      -moz-filter: blur(17px);
      -ms-filter: blur(17px);
      -o-filter: blur(17px);
      filter: blur(17px);
      margin: -30px;
    }
    .side {
        position: absolute;
        top: 148px;
        width: 260px;
        right: 10%;
        height: 800px;
        text-align: center;
        .side-person {
            border-radius: 3px;
            padding: 10px;
            background-color: #fff;
            width: 100%;
            height: 300px;
            .isLogin {
              a {
                  text-decoration: none;
                  color: #fff;
                }
              .user {
                img {
                    width: 48px;
                    height: 48px;
                    border-radius: 4px;
                    vertical-align: middle;
                  }
              }
            }
        }
    }
  }
</style>
