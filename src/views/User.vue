<style lang="scss" scoped>
    .user {
        height: 100%;
        background: rgb(242, 242, 242);
        .return {
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid #d8d8d8;
            padding: 0 50px;
            display: flex;
            justify-content: space-between;
            background: #fff;
            .iconfont {
                font-size: 40px;
                font-weight: 700;
            }
            .title {
                text-align: center;
                font-size: 40px;
            }
        }
        .user-info {
            padding: 40px;
            height: 120px;
            position: relative;
            background-image: url("../assets/img/user/bg.jpg");
            background-size: 750px 200px;
            .icon {
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
            .userName {
                margin-left: 20px;
                position: absolute;
                left: 150px;
                top: 50px;
            }
            .school {
                position: absolute;
                left: 170px;
                top: 100px;
            }
        }
        .order {
            background: #fff;
            margin: 20px;
            border-radius: 20px;
            .order-header {
                display: flex;
                justify-content: space-between;
                height: 30px;
                line-height: 30px;
                padding: 20px;
                border-bottom: 1px solid #ccc;
                .order-title {
                    font-size: 30px;
                    font-weight: 700;
                }
                .all-orders {
                    font-size: 24px;
                    color: rgb(153, 153, 153);
                }
            }
            .order-list {
                ul {
                    li {
                        width: 160px;
                        height: 152px;
                        float: left;
                        text-align: center;
                        display: table;
                        margin-left: 18px;
                        div {
                            display: table-cell;
                            vertical-align: middle;
                            .iconfont {
                                font-size: 40px;
                            }
                            .word {
                                display: inline-block;
                                padding-top: 16px;
                            }
                        }

                    }
                }
                .clearfix {
                    overflow: hidden;
                    clear: both;
                }
            }
        }
        .identify {
            background: #fff;
            height: 30px;
            display: flex;
            justify-content: space-between;
            padding: 40px;
            border-bottom: 1px solid #ccc;
            .iconfont {
                font-size: 30px;
            }
        }
        .quit {
            margin-top: 30px;
            button {
                width: 100%;
                height: 80px;
                border: none;
                background: #ff5805;
                color: #fff;
            }
        }
    }
</style>
<template>
    <div class="user">
        <header class="return">
            <span class="iconfont" @click="toHome">&#xe61e;</span>
            <div class="title">个人中心</div>
            <span class="iconfont">&#xe633;</span>
        </header>
        <section class="user-info">
            <a class="icon">
                <van-uploader :after-read="onRead">
                    <img :src="avatar">
                </van-uploader>
            </a>
            <span class="userName">{{userInfo.u_name}}</span>
            <span class="school">{{userInfo.u_school}}</span>
        </section>
        <section class="order">
            <div class="order-header">
                <h2 class="order-title">我的订单</h2>
                <span class="all-orders" @click="toOrder('all')">查看全部订单></span>
            </div>
            <div class="order-list">
                <ul class="clearfix">
                    <li @click="toCollection">
                        <div>
                            <span class="iconfont">&#xe7a9;</span>
                            <br>
                            <span class="word">我的收藏</span>
                        </div>
                    </li>
                    <li @click="toOrder('unsend')">
                        <div>
                            <span class="iconfont">&#xe605;</span>
                            <br>
                            <span class="word">待发货</span>
                        </div>
                    </li>
                    <li @click="toOrder('sended')">
                        <div>
                            <span class="iconfont">&#xe62f;</span>
                            <br>
                            <span class="word">待收货</span>
                        </div>
                    </li>
                    <li @click="toOrder('evaluate')">
                        <div>
                            <span class="iconfont">&#xe639;</span>
                            <br>
                            <span class="word">评价</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="identify" @click="toIdentify">
            <span>认证中心</span>
            <span class="iconfont">&#xe62d;</span>
        </section>
        <section class="quit" @click="quit">
            <button>退出当前账号</button>
        </section>
        <home-footer></home-footer>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import HomeFooter from '@/components/footer'

    export default {
        name: "User",
        data() {
            return {
                avatar: ''
            }
        },
        components: {
            HomeFooter
        },
        computed: {
            ...mapState(['userInfo']),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations(['setActive', 'setUserInfo', 'setSchool']),
            // 返回首页
            toHome () {
                this.$router.push('/')
            },
            // 跳转至我的收藏页面
            toCollection () {
                this.$router.push('/collection')
            },
            // 跳转至订单页面
            toOrder (id) {
                this.$router.push({
                    name: 'order',
                    params: {id}
                })
            },
            // 跳转至认证中心
            toIdentify () {
                this.$router.push('/identify')
            },
            // 退出当前账号
            quit () {
                this.$api(this.$SERVER.GET_QUIT)
                    .then(data => {
                    this.setUserInfo()
                    this.setSchool('')
                    this.$router.push('/')
                })
            },
            // 更改头像
            onRead(file) {
                console.log(file)
                this.avatar = file.content
                this.userInfo.u_avatar = file.content
                this.userInfo.u_password = ''
                this.$api.post(this.$SERVER.POST_UPUSERINFO, {
                    ...this.userInfo, id: this.userInfo._id
                })
            }
        },
        created() {
            this.setActive(4)
            if ((/base/g).test(this.userInfo.u_avatar)) {
                this.avatar = this.userInfo.u_avatar
            } else {
                this.avatar = this.$SERVER.FILEURL + this.userInfo.u_avatar
            }

        },
        mounted() {

        }
    }
</script>

