<template>
    <div class="infomation">
        <nav-menu :activeIndex='"4"'></nav-menu>
      <div class="infomation-content">
        <div class="infomation-content-main__left infomation-content-main">
          <span>头像上传:</span><el-upload
            class="avatar-uploader"
            action="/"
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
              <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="个性签名：">
              <el-input v-model="formLabelAlign.signature"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="formLabelAlign.mail"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="infomation-content-main__right infomation-content-main">
          <h2>密码修改</h2>
          <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" class="info">
            <el-form-item label="当前密码：">
              <el-input v-model="formLabelAlign.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
              <el-input v-model="formLabelAlign.password1" type="password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" @click="submitUpload()">保存更改</el-button>
          <el-alert
            :title="errorMessage"
            type="error" v-show="isError" center>
          </el-alert>
          <el-alert
            :title="successMessage"
            type="success" v-show="isSuccess" center>
          </el-alert>
      </div>
        <div class="side">
          <div class="side-person">
              <h3>个人信息</h3>
              <div class="isLogin">
                  <router-link class="user" :to="{name:'user'}">
                      <img :src="formLabelAlign.useravatar" alt="">
                  </router-link>
                  <span>&nbsp; {{username}}</span>
                  <p>积分:{{formLabelAlign.integral}}</p>
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
      username: this.$store.state.username,
      imgFile: '',
      isError: false,
      errorMessage: '',
      isSuccess: false,
      successMessage: '',
      formLabelAlign: {
        name: '',
        signature: '',
        mail: '',
        password: '',
        password1: '',
        useravatar: '',
        integral: ''
      }
    }
  },
  created () {
    this.$axios.post('/api/user/getInfomation', { name: this.username })
      .then(res => {
        this.formLabelAlign.name = res.data[0].username
        this.formLabelAlign.signature = res.data[0].signature
        this.formLabelAlign.mail = res.data[0].mail
        this.formLabelAlign.useravatar = res.data[0].useravatar
        this.formLabelAlign.integral = res.data[0].integral
      })
      .then(err => {
        console.log(err)
      })
  },
  methods: {
    submitUpload: function () {
      this.$refs.upload.submit()
      if (this.formLabelAlign.password !== '' && this.formLabelAlign.password1 !== '') {
        if (this.formLabelAlign.password !== this.formLabelAlign.password1) {
          let formData = new FormData()
          formData.append('file', this.imgFile || '')
          formData.append('name', this.formLabelAlign.name)
          formData.append('signature', this.formLabelAlign.signature || '')
          formData.append('mail', this.formLabelAlign.mail || '')
          formData.append('password1', this.formLabelAlign.password1)
          this.$axios.post('/api/user/modifyInfo', formData)
            .then(res => {
              if (res.data.result === 1) {
                this.isSuccess = true
                this.successMessage = '用户信息修改成功！'
              }
            }, error => {
              console.log(error)
            })
        } else {
          this.isError = true
          this.errorMessage = '当前密码与旧密码一致，请重新输入！'
        }
      } else {
        let formData = new FormData()
        formData.append('file', this.imgFile || '')
        formData.append('name', this.formLabelAlign.name)
        formData.append('signature', this.formLabelAlign.signature || '')
        formData.append('mail', this.formLabelAlign.mail || '')
        this.$axios.post('/api/user/modifyInfo', formData)
          .then(res => {
            if (res.data.result === 1) {
              this.isSuccess = true
              this.successMessage = '用户信息修改成功！'
            }
          }, error => {
            console.log(error)
          })
      }
    },
    handleAvatarSuccess (res, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return
      }
      this.imgFile = file
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
      width: 1000px;
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
        left: 80%;
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
