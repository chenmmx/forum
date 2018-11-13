<template>
    <div>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link :to="{name: 'home'}">首页</router-link></el-menu-item>
  <el-menu-item index="2"><router-link :to="{name: 'login'}">登录</router-link></el-menu-item>
  <el-menu-item index="3"><router-link :to="{name: 'register'}">注册</router-link></el-menu-item>
  <el-menu-item index="4">设置</el-menu-item>
  <el-menu-item index="5"><el-input v-model="input" placeholder="搜索"></el-input></el-menu-item>
  <el-menu-item index="6" disabled>第六镜科技知识社区</el-menu-item>
</el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  props: [
    'activeIndex'
  ]
}
</script>

<style>
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
</style>
