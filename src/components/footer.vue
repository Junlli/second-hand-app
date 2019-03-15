<template>
    <footer>
        <van-tabbar>
            <van-tabbar-item icon="home-o" @click="toHome" :class="{iconColor: active === 0}">首页</van-tabbar-item>
            <van-tabbar-item icon="add-o" @click="release">发布</van-tabbar-item>
            <van-tabbar-item icon="comment-o" @click="toNews">消息</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" @click="toCart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" @click="toUser" :class="{iconColor: active === 4}">我的</van-tabbar-item>
        </van-tabbar>
    </footer>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'HomeFooter',
        data () {
            return {

            }
        },
        computed: {
            ...mapState(['userInfo', 'active'])
        },
        methods: {
            ...mapMutations(['setUserInfo', 'setSchool']),
            toUser () {
                if (this.userInfo.u_account) {
                    this.$router.push('/user')
                } else {
                    this.$router.push('/login')
                }
            },
            toNews () {

            },
            // 是否登录
            isLogin () {
                this.$api(this.$SERVER.GET_ISLOGIN)
                    .then(data => data.state && this.getUserInfo())
            },
            // 获取当前用户信息
            getUserInfo () {
                this.$api(this.$SERVER.GET_CURRENTUSERINFO)
                    .then(data => {
                        this.setUserInfo(data.data)
                    })
            },
            // 跳转至首页
            toHome () {
                this.$router.push('/')
            },
            // 发布商品
            release () {
                this.$router.push('/release')
            },
            // 跳转至购物车
            toCart () {
                this.$router.push('/cart')
            }
        },
        created () {
            this.isLogin()
        }
    }
</script>

<style lang="scss">
    footer {
        height: 100px;
        position: fixed;
        bottom: 0;
        left: 0;
        .van-tabbar {
            height: 70px;
            .van-tabbar-item--active {
                color: #7d7e80;
            }
            .van-tabbar-item__icon {
                font-size: 40px;
            }
            .iconColor {
                color: rgb(255, 72, 62);
            }
        }
    }
</style>
