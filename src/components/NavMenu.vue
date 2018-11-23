<template>
    <div class="nav">
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link :to="{name: 'home'}">首页</router-link></el-menu-item>
  <el-menu-item index="2" v-show="isLogin"><router-link :to="{name: 'login'}">登录</router-link></el-menu-item>
  <el-menu-item index="3" v-show="isLogin"><router-link :to="{name: 'register'}">注册</router-link></el-menu-item>
  <el-menu-item index="4" v-show="!isLogin"><router-link :to="{name: 'infomation'}">设置</router-link></el-menu-item>
  <el-menu-item index="5"><el-input v-model="input" placeholder="搜索"></el-input></el-menu-item>
  <el-menu-item index="6" disabled>第六镜科技知识社区</el-menu-item>
</el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      isLogin: !this.$store.state.isLogin
    }
  },
  props: [
    'activeIndex'
  ]
}
</script>

<style>
  .nav {
    width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: 1px 3px 8px 0px #2a2a2a;
  }
  .el-menu-demo {
    margin-top: -10px;
  }
  .el-menu--horizontal>.el-menu-item:nth-child(5) {
    margin-left: 30%;
  }
  .el-menu--horizontal>.el-menu-item:nth-child(6) {
    color: #fff;
    cursor: pointer;
  }
  .el-menu--horizontal>.el-menu-item a {
    text-decoration: none;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
    width: 100%;
  }
</style>
