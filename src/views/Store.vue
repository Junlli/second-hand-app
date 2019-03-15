<style lang="scss" scoped>
    .store {
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
        .list {
            .product {
                height: 245px;
                display: flex;
                justify-content: space-between;
                a {
                    width: 100%;
                    position: relative;
                    .product-img {
                        width: 208px;
                        height: 208px;
                        position: absolute;
                        top: 10px;
                        left: 10px;
                    }
                    .detail {
                        margin-left: 220px;
                        .name {
                            margin: 20px;
                        }
                        .price {
                            margin: 60px 0 20px 20px;
                            color: #ff463c;
                            .left {
                                font-size: 30px;
                            }
                            .right {
                                font-size: 40px;
                            }
                        }
                        .sales {
                            margin-left: 20px;
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="store">
        <header class="return">
            <span class="iconfont" @click="toLastPage">&#xe61e;</span>
        </header>
        <section class="user-info">
            <a href="" class="icon">
                <img :src="seller.u_avatar" alt="">
            </a>
            <span class="userName">{{seller.u_name}}</span>
            <span class="school">{{seller.u_school}}</span>
        </section>
        <section class="list">
            <div class="product" v-for="item in commodityList" @click="toDetail(item._id)">
                <a>
                    <img v-lazy="$SERVER.FILEURL + item.c_images[0]" alt="" class="product-img">
                    <div class="detail">
                        <p class="name">{{item.c_title}}</p>
                        <div class="price">
                            <span class="left">￥</span>
                            <span class="right">{{item.c_price/100}}</span>
                        </div>
                        <span class="sales">销量： {{item.c_sales}}</span>
                    </div>
                </a>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "Store",
        data() {
            return {
                commodityList: [],
                seller: ''
            }
        },
        computed: {
            ...mapState(['userInfo']),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 返回上一页
            toLastPage () {
                this.$router.go(-1)
            },
            // 获取商品列表
            getCommodityList () {
                this.$api(this.$SERVER.GET_COMMODITYLIST, {
                    params: {u_id: this.$route.params.id, c_state: 1}
                }).then(data => {
                    this.commodityList = data.data.list
                })
            },
            // 获取卖家信息
            getUserInfo () {
                this.$api(this.$SERVER.GET_USERINFO, {
                    params: {id: this.$route.params.id}
                }).then(data => this.seller = data.data)
            },
            // 跳转到商品详情页
            toDetail (id) {
                this.$router.push({
                    name: 'detail',
                    params: {id}
                })
            }
        },
        created() {
            this.getCommodityList()
            this.getUserInfo()
        },
        mounted() {

        }
    }
</script>

