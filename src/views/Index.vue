<template>
    <div class="main">
        <nav-menu :activeIndex='"1"'></nav-menu>
        <div class="content">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="全部"></el-tab-pane>
                <el-tab-pane label="算法" name="算法"></el-tab-pane>
                <el-tab-pane label="学术论文" name="学术论文"></el-tab-pane>
                <el-tab-pane label="Android" name="Android"></el-tab-pane>
                <el-tab-pane label="前端" name="前端"></el-tab-pane>
                <el-tab-pane label="后端" name="后端"></el-tab-pane>
            </el-tabs>
            <div class="content-main">
                <div class="topic-list">
                    <div class="cell" v-for="(item, index) in postsData" :key="index">
                        <router-link :to="{name: 'user'}" class="cell-head">
                            <img src="../assets/xbx.jpg" alt="">
                        </router-link>
                        <router-link :to="{name: 'posts', query: {postID: item.postID}}" class="cell-title">
                            {{item.postTitle}}
                        </router-link>
                        <span class="cell-day">{{item.createTime | dateForm}}</span>
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 30px;"></el-pagination>
                </div>
            </div>
        </div>
        <div class="side">
            <div class="side-person">
                <h3>个人信息</h3>
                <div class="notLogin" v-show="!isShow">
                    <span>还未登录？</span>
                    <p>
                        <router-link :to="{name: 'login'}">登录</router-link>或
                        <router-link :to="{name: 'register'}">注册</router-link>
                    </p>
                </div>
                <div class="isLogin" v-show="isShow">
                    <router-link class="user" :to="{name:'user'}">
                        <img :src="useravatar" alt="">
                    </router-link>
                    <span>&nbsp; {{username}}</span>
                    <p>积分:{{integral}}</p>
                    <p>个人介绍：{{signature}}</p>
                    <el-button type="success"><router-link :to="{name: 'publish'}">发布话题</router-link></el-button>
                </div>
            </div>
            <div class="scoreboard">
                <h3>积分榜</h3>
                <el-table :data="scoreboardData">
                    <el-table-column prop="integral" label="积分" align='center'></el-table-column>
                    <el-table-column prop="username" label="用户" align='center'></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      activeName: '全部',
      isShow: false,
      status: 123,
      username: sessionStorage.getItem('username'),
      integral: '',
      useravatar: '',
      signature: '',
      scoreboardData: [],
      postsData: [],
      publishDay: ''
    }
  },
  created () {
    if (this.username) {
      this.isShow = sessionStorage.getItem('isLogin')
      this.$axios.post('/api/user/getInfomation', { name: this.username })
        .then(res => {
          this.useravatar = res.data[0].useravatar
          this.integral = res.data[0].integral
          this.signature = res.data[0].signature
        })
        .catch(err => {
          console.log(err)
        })
    }
    this.$axios.get('/api/user/getScoreboard')
      .then(res => {
        this.scoreboardData = res.data
      })
      .catch(err => {
        console.log(err)
      })
    this.$axios.get('/api/posts/getPosts?postType=全部')
      .then(res => {
        this.postsData = res.data
        let date = new Date()
        console.log(date)
        console.log(date - this.postsData[0].createTime)
      })
      .catch(err => {
        console.log(err)
      })
  },
  filters: {
    dateForm: function (el) {
      return moment(el).format('YYYY-MM-DD')
    }
  },
  methods: {
    async handleClick (tab, event) {
      let res = await this.$axios.get('/api/posts/getPosts?postType=' + tab.name)
      this.postsData = res.data
    }
  }
}
</script>

<style scoped lang = "less">
    .main {
        .content {
            background-position: center top;
            background-size: cover;
            width: 60%;
            position: relative;
            left: 10%;
            top: 80px;
            padding: 20px;
            overflow: hidden;
            border-radius: 5px;
        }
        .content::after {
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
        .content-main {
            .topic-list {
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
        }
        .side {
            position: absolute;
            top: 148px;
            width: 260px;
            left: 80%;
            height: 800px;
            .side-person {
                padding: 10px;
                padding-bottom: 20px;
                border-radius: 3px;
                background-color: #fff;
                width: 100%;
                height: 300px;
                .notLogin {
                    a {
                        text-decoration: none;
                        color: #42b983;
                    }
                }
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
            .scoreboard {
                border-radius: 3px;
                padding: 10px;
                background-color: #fff;
                margin-top: 50px;
                width: 100%;
                height: 400px;
            }
        }
    }
</style>
