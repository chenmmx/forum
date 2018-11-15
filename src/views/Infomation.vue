<template>
    <div class="infomation">
        <nav-menu></nav-menu>
      <div class="infomation-content">
        <div class="infomation-content-main__left infomation-content-main">
          <span>头像上传:</span><el-upload
            class="avatar-uploader"
            action="http://localhost:3000/getimg"
            :show-file-list="false"
            ref="upload"
            :auto-upload="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" class="info">
            <el-form-item label="用户名：">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="个性签名：">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="infomation-content-main__right infomation-content-main">
          <h2>密码修改</h2>
          <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" class="info">
            <el-form-item label="当前密码：">
              <el-input v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
              <el-input v-model="formLabelAlign.password1"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" @click="submitUpload()">保存更改</el-button>
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
      labelPosition: 'top',
      imageUrl: '',
      formLabelAlign: {
        name: '',
        signature: '',
        mailbox: '',
        password: '',
        password1: ''
      }
    }
  },
  methods: {
    submitUpload: function () {
      this.$refs.upload.submit()
    },
    handleAvatarSuccess (res, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // let formData = new FormData()
      // formData.append('file', file)
      // formData.append('name', this.formLabelAlign.name)
      // formData.append('password', this.formLabelAlign.password)
      // this.$http.post('http://localhost:3000/getimg', formData)
      //   .then(res => {
      //     console.log(res)
      //   }, error => {
      //     console.log(error)
      //   })
    },
    uploadSectionFile (param) {
      console.log(param.file)
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
      height: 650px;
      .infomation-content-main__left {
        position: absolute;
        width: 400px;
        height: 500px;
        left: 0;
      }
      .infomation-content-main__right {
        position: absolute;
        width: 400px;
        height: 500px;
        right: 0;
        top: 100px;
      }
      .el-button--primary {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
      .infomation-content-main {
        margin-left: 60px;
        .info {
          margin-top: 30px;
          .el-form-item {
            width: 300px;
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
                  color: #fff;
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
        .avatar-uploader .el-upload {
          border: 1px dashed #fff;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #fff;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
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
