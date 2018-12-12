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
        <div class="side">
            <div class="side-person">
                <h3>作者信息</h3>
                <div class="isLogin">
                    <router-link class="user" :to="{name:'user'}">
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
      content: '',
      title: ''
    }
  },
  created () {
    let postID = this.$route.query.postID
    this.$axios.get('/api/posts/getPostContent?postID=' + postID)
      .then(res => {
        this.content = res.data[0].postContent
        this.title = res.data[0].postTitle
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
                height: 50px;
                border-radius: 3px;
                /* padding-top: px; */
                margin-bottom: 10px;
                h3 {
                    text-align: left;
                    padding-left: 30px;
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
