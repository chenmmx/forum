<template>
    <div class="posts">
        <nav-menu></nav-menu>
        <div class="posts-content">
            <div class="posts-content-title">
                <h3>我是标题</h3>
            </div>
            <mavon-editor
                class="md"
                :value="value"
                :subfield = "prop.subfield"
                :defaultOpen = "prop.defaultOpen"
                :toolbarsFlag = "false"
                :editable="prop.editable"
                :scrollStyle="prop.scrollStyle"
            ></mavon-editor>
        </div>
        <div class="side">
            <div class="side-person">
                <h3>作者信息</h3>
                <div class="isLogin">
                    <router-link class="user" :to="{name:'infomation'}">
                        <img src="../assets/xbx.jpg" alt="">
                    </router-link>
                    <span>&nbsp; wangxiaobao</span>
                    <p>积分:0</p>
                    <h4>个人介绍</h4>
                    <p>哈啊哈。去玩儿体育和国际两个婢女落花流水电饭锅</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value: ``
    }
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
                width: 100%;
                height: 40px;
                /* border: 1px solid black; */
                background-color: #fff;
                padding-bottom: 10px;
                /* padding-top: px; */
                margin-bottom: 10px;
                h3 {
                    padding-top: 15px;
                }
            }
        }
        .side {
            position: absolute;
            top: 165px;
            width: 260px;
            right: 10%;
            height: 800px;
            .side-person {
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
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
</style>
