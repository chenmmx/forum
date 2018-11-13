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
                <el-table>
                </el-table>
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
                    <div class="user">
                        <img src="" alt="">
                        wangxiaobao
                    </div>
                    <p>积分:0</p>
                    <el-button type="success"><router-link :to="{name: 'publish'}">发表话题</router-link></el-button>
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
      isShow: true,
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
            width: 60%;
            position: relative;
            left: 10%;
            top: 80px;
            background-color: aliceblue;
            padding: 20px;
        }
        .side {
            position: absolute;
            top: 148px;
            width: 260px;
            right: 10%;
            height: 800px;
            .side-person {
                padding: 10px;
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
                }
            }
            .scoreboard {
                padding: 10px;
                background-color: #fff;
                margin-top: 50px;
                width: 100%;
                height: 400px;
            }
        }
    }
</style>
