<template>
    <div class="main">
        <nav-menu :activeIndex='"1"'></nav-menu>
        <div class="content">
              <el-tabs v-model="activeName">
                <el-tab-pane label="全部" name="first"></el-tab-pane>
                <el-tab-pane label="精华" name="second"></el-tab-pane>
                <el-tab-pane label="分享" name="third"></el-tab-pane>
                <el-tab-pane label="问答" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="content-main">
                <div class="topic-list">
                    <div class="cell">
                        <router-link :to="{name: 'user'}" class="cell-head">
                            <img src="../assets/xbx.jpg" alt="">
                        </router-link>
                        <router-link :to="{name: 'posts'}" class="cell-title">
                            沙发斯蒂芬三个大人供热无法
                        </router-link>
                        <span class="cell-day">3天前</span>
                    </div>
                    <div class="cell">
                        <router-link :to="{name: 'user'}" class="cell-head">
                            <img src="../assets/xbx.jpg" alt="">
                        </router-link>
                        <router-link :to="{name: 'posts',query: {id : status}}" class="cell-title">
                            沙发斯蒂芬三个大人供热无法
                        </router-link>
                        <span class="cell-day">3天前</span>
                    </div>
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
                        <img src="../assets/xbx.jpg" alt="">
                    </router-link>
                    <span>&nbsp; wangxiaobao</span>
                    <p>积分:0</p>
                    <el-button type="success"><router-link :to="{name: 'publish'}">发布话题</router-link></el-button>
                </div>
            </div>
            <div class="scoreboard">
                <h3>积分榜</h3>
                <el-table :data="data">
                    <el-table-column prop="score" label="积分" align='center'></el-table-column>
                    <el-table-column prop="name" label="用户" align='center'></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      isShow: this.$store.state.isLogin,
      status: 123,
      data: [
        {
          score: 100,
          name: '张飞'
        },
        {
          score: 120,
          name: '张三'
        },
        {
          score: 130,
          name: '李四'
        }
      ]
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
                        color: #42b983;
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
                height: 200px;
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
