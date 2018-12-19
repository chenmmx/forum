<template>
    <div class="user">
        <nav-menu></nav-menu>
        <div class="user-info">
            <h2>个人信息</h2>
            <div class="user-info-head">
                <img :src="useravatar" alt="">&nbsp;<span>{{username}}</span>
            </div>
            <p class="user-info-score">积分：{{integral}}</p>
            <p class="user-info-reg">注册时间：{{createTime | dateForm}}</p>
            <p class="user-info-signature" style="color: #fff;">个人介绍：{{signature}}</p>
        </div>
        <div class="recently-in recently-create">
            <h2>最近创建的话题</h2>
            <div class="cell" v-for="(item, index) in recentCreateList" :key="index">
                <router-link :to="{name: 'user'}" class="cell-head">
                    <img :src="item.useravatar" alt="">
                </router-link>&nbsp;&nbsp;
                <router-link :to="{name: 'posts', query: {postID: item.postID}}" class="cell-title">
                    {{item.postTitle}}
                </router-link>
                <span class="cell-day">{{item.createTime | dateForm}}</span>
            </div>
            <router-link :to="{name: 'posts'}" class="cell-title">
                查看更多>>
            </router-link>
        </div>
        <div class="recently-in recently-join">
            <h2>最近参与的话题</h2>
            <div class="cell" v-for="(item, index) in recentJoinList" :key="index">
                <router-link :to="{name: 'user'}" class="cell-head">
                    <img :src="item.useravatar" alt="">
                </router-link>&nbsp;&nbsp;
                <router-link :to="{name: 'posts', query: {postID: item.postID}}" class="cell-title">
                    {{item.postTitle}}
                </router-link>
                <span class="cell-day">{{item.createTime | dateForm}}创建的话题</span>
            </div>
            <router-link :to="{name: 'posts'}" class="cell-title">
                查看更多>>
            </router-link>
        </div>
        <div class="side">
          <div class="side-person">
              <h3>个人信息</h3>
              <div class="isLogin">
                  <router-link class="user" :to="{name:'user', query: {userID: userID}}">
                      <img :src="useravatar" alt="">
                  </router-link>
                  <span>&nbsp; {{username}}</span>
                  <p>积分:{{integral}}</p>
                  <el-button type="success"><router-link :to="{name: 'publish'}">发布话题</router-link></el-button>
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
      username: sessionStorage.getItem('username'),
      useravatar: '',
      integral: '',
      signature: '',
      createTime: '',
      userID: sessionStorage.getItem('user_id'),
      recentCreateList: [],
      recentJoinList: []
    }
  },
  created () {
    let userID = this.$route.query.userID
    this.$axios.post('/api/user/getInfomationById', { userID: userID })
      .then(res => {
        this.useravatar = res.data[0].useravatar
        this.integral = res.data[0].integral
        this.signature = res.data[0].signature
        this.createTime = res.data[0].create_time
      })
      .then(err => {
        console.log(err)
      })
    this.$axios.get('/api/posts/recentCreatePosts?userID=' + userID)
      .then(res => {
        this.recentCreateList = res.data
      })
      .catch(err => {
        console.log(err)
      })
    this.$axios.get('/api/posts/getRecentPostsId?userID=' + userID)
      .then(res => {
        if (res.data.result === 1) {
          console.log('暂无参与话题')
        } else {
          this.recentJoinList = res.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  filters: {
    dateForm: function (el) {
      return moment(el).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped lang = "less">
    .user {
        text-align: left;
        .user-info {
            background-position: center top;
            background-size: cover;
            width: 60%;
            position: relative;
            left: 10%;
            top: 80px;
            padding: 20px;
            overflow: hidden;
            border-radius: 5px;
            h2 {
                color: #fff;
            }
            .user-info-head {
                width: 100%;
                height: 40px;
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 3px;
                    vertical-align: middle;
                }
            }
        }
        .user-info::after {
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
        .recently-in {
            /* text-align: center; */
            background-position: center top;
            background-size: cover;
            width: 60%;
            position: relative;
            left: 10%;
            top: 100px;
            padding: 20px;
            overflow: hidden;
            border-radius: 5px;
            a {
                text-decoration: none;
                color: #f0f0f0;
            }
            h2 {
                text-align: left;
                color: #fff;
            }
            .cell {
                width: 100%;
                height: 38px;
                border-bottom: 1px solid #f0f0f0;
                padding: 10px 5px 0 5px;
                .cell-head {
                    float: left;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 3px;
                    }
                }
                .cell-title {
                    /* margin-top: 10px; */
                    padding-top: 10px;
                    text-decoration: none;
                    color: #f0f0f0;
                }
                .cell-title:hover {
                    text-decoration: underline;
                }
                .cell-day {
                    float: right;
                    color: #fff;
                }
            }
        }
        .recently-in::after {
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
        .recently-in.recently-join {
            top: 120px;
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
