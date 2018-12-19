<template>
    <div class="posts">
        <nav-menu></nav-menu>
        <div class="posts-content">
            <div class="posts-content-title">
                <h3>{{title}}</h3>
            </div>
            <mavon-editor
                class="md"
                :value="content"
                :subfield = "prop.subfield"
                :defaultOpen = "prop.defaultOpen"
                :toolbarsFlag = "false"
                :editable="prop.editable"
                :scrollStyle="prop.scrollStyle"
            ></mavon-editor>
        </div>
        <div class="user-comment-reply">
            <h2>用户评论区：</h2>
            <div class="cell" v-for="item of commentData" :key="item.commentID">
                <router-link :to="{name: 'user', query: {userID: item.id}}" class="cell-head">
                    <img :src="item.useravatar" alt="">
                </router-link>
                <span>{{item.commentContent}}</span>
                <span class="cell-day">{{item.createTime | dateForm}}</span>
            </div>
            <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 30px;"></el-pagination>
        </div>
        <div class="user-comment-send">
            <mavon-editor v-model="content1" :subfield = false :defaultOpen= manner></mavon-editor>
            <el-button type="primary" @click="sendContent()" style="margin-top: 15px;margin-bottom:30px;">发表评论</el-button>
        </div>
        <div class="side">
            <div class="side-person">
                <h3>作者信息</h3>
                <div class="isLogin">
                    <router-link class="user" :to="{name:'user', query: {userID: data.user_id}}">
                        <img :src="data.useravatar" alt="">
                    </router-link>
                    <span>&nbsp; {{data.username}}</span>
                    <p>积分:{{data.integral}}</p>
                    <h4>个人介绍</h4>
                    <p>{{data.signature}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      content: '',
      title: '',
      data: [],
      content1: '',
      manner: 'edit',
      commentData: []
    }
  },
  created () {
    let postID = this.$route.query.postID
    this.$axios.get('/api/posts/getPostContent?postID=' + postID)
      .then(res => {
        this.content = res.data[0].postContent
        this.title = res.data[0].postTitle
        this.data = res.data[0]
      })
      .catch(err => {
        console.log(err)
      })
    this.$axios.get('/api/comment/getCommentByPostId?postID=' + postID)
      .then(res => {
        this.commentData = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    prop () {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
  },
  filters: {
    dateForm: function (el) {
      return moment(el).format('YYYY-MM-DD')
    }
  },
  methods: {
    async sendContent () {
      if (sessionStorage.getItem('user_id')) {
        if (this.content1 === '') {
          this.$notify({
            title: '警告',
            message: '请输入评论内容',
            type: 'warning'
          })
        } else {
          let commnetData = {
            userID: sessionStorage.getItem('user_id'),
            postID: this.$route.query.postID,
            commentContent: this.content1
          }
          let res = await this.$axios.post('/api/comment/addComment', commnetData)
          this.$notify({
            title: '发表成功',
            message: res.data.msg,
            type: 'success'
          })
          this.$axios.get('/api/comment/getCommentByPostId?postID=' + this.$route.query.postID)
            .then(res => {
              this.commentData = res.data
            })
            .catch(err => {
              console.log(err)
            })
          this.setRecentPostsId()
        }
      } else {
        this.$notify({
          title: '警告',
          message: '请登录后再进行评论',
          type: 'warning'
        })
      }
    },
    async setRecentPostsId () {
      let recentData = {
        userID: sessionStorage.getItem('user_id'),
        postID: this.$route.query.postID
      }
      let res = await this.$axios.post('/api/posts/setRecentPostsId', recentData)
      console.log(res)
    }
  }
}
</script>

<style scoped lang = "less">
    .posts {
        .posts-content {
            top: 80px;
            position: relative;
            left: 10%;
            width: 60%;
            .posts-content-title {
                background-position: center top;
                background-size: cover;
                overflow: hidden;
                border-radius: 5px;
                position: relative;
                width: 100%;
                height: 75px;
                border-radius: 3px;
                /* padding-top: px; */
                margin-bottom: 13px;
                h3 {
                    text-align: center;
                    color: #f0f0f0;
                    font-size: 26px;
                }
            }
            .posts-content-title::after {
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
            .md {
                border-radius: 3px;
            }
        }
        .user-comment-reply {
            top: 100px;
            position: relative;
            left: 10%;
            width: 60%;
            border-radius: 10px;
            h2 {
                color: #fff;
            }
            .cell {
                width: 100%;
                /* height: 38px; */
                border-bottom: 1px solid #f0f0f0;
                /* padding: 10px 5px 0 5px; */
                padding-top: 20px;
                padding-bottom: 20px;
                background-color: #fff;
                .cell-head {
                    float: left;
                    margin-left: 10px;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 3px;
                    }
                }
                span {
                    text-align: left;
                }
                .cell-day {
                    margin-right: 20px;
                    float: right;
                    color: #000;
                }
            }
        }
        .user-comment-send {
            top: 150px;
            position: relative;
            left: 10%;
            width: 60%;
        }
        .side {
            position: absolute;
            top: 165px;
            width: 260px;
            left: 80%;
            height: 800px;
            .side-person {
                border-radius: 3px;
                padding: 10px;
                background-color: #fff;
                width: 100%;
                height: 400px;
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
