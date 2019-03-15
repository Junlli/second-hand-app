<style lang="scss">
    .result {
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
            .van-search {
                width: 600px;
                background: #fff;
                .van-cell {
                    background: #e8ecf0;
                    height: 60px;
                    border-radius: 50px;
                    line-height: 60px;
                    font-size: 30px;
                    .van-field__left-icon {
                        font-size: 30px;
                        .van-icon-search {
                            font-size: 40px;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
        .result {
            background: #fff;
            li {
                padding: 30px;
                height: 40px;
                font-size: 30px;
                border-bottom: 1px solid #d4d4d4;
            }
        }
        .list {
            .product {
                height: 245px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #d4d4d4;
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
    <div class="result">
        <header class="return">
            <span class="iconfont" @click="toHome">&#xe61e;</span>
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    style="background: #fff"
                    @click="toSearch(value)"
            >
            </van-search>
        </header>
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
        name: "result",
        data() {
            return {
                getApiData: {
                    c_type: '',
                    c_type2: '',
                    pageSize: 20,
                    pageIndex: 1,
                    c_state: 1,
                    u_school: '',
                    c_title: ''
                },
                commodityList: []
            }
        },
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 获取商品列表
            getCommodityList () {
                this.getApiData.c_title = this.$route.query.keyword
                this.$api(this.$SERVER.GET_COMMODITYLIST, {
                    params: this.getApiData
                }).then(data => this.commodityList = data.data.list)
            },
            // 跳转至首页
            toHome () {
                this.$router.push('/')
            },
            // 跳转至搜索页
            toSearch (keyword) {
                this.$router.push({
                    path: '/search',
                    query: {keyword}
                })
            },
            // 跳转至商品详情
            toDetail (id) {
                this.$router.push({
                    name: 'detail',
                    params: {id}
                })
            }
        },
        created() {
            this.getCommodityList()
            this.value = this.$route.query.keyword
        },
        mounted() {

        }
    }
</script>

