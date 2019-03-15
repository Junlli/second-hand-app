<template>
    <div>
        <div class="banner">
            <swiper :options="swiperOption" v-if="commodityInfo.c_images">
                <swiper-slide v-for="(item, index) in commodityInfo.c_images" :key="index">
                    <img :src="$SERVER.FILEURL + item" alt="" class="images">
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <section class="detail">
            <article>{{commodityInfo.c_title}}</article>
        </section>
        <div class="price">
            ￥<span class="main-price">{{commodityInfo.c_price/100}}</span>
        </div>
        <div class="add">
            <span class="sales">总销量  {{commodityInfo.c_sales}}</span>
            <span class="school">{{commodityInfo.u_school}}</span>
        </div>
        <div class="number">
            <span>数量</span>
            <van-stepper v-model="value" :max="commodityInfo.c_num" />
            <span class="ventory">库存: {{commodityInfo.c_num}}</span>
        </div>
        <van-goods-action>
            <van-goods-action-mini-btn
                    icon="shop-o"
                    text="店铺"
                    @click="toStore(commodityInfo.u_id)"
            />
            <van-goods-action-mini-btn
                    icon="like"
                    text="收藏"
                    @click="handleCollect(isChange)"
                    :class="{heart: isChange}"
            />
            <van-goods-action-mini-btn
                    info="5"
                    icon="cart-o"
                    text="购物车"
                    @click="toCart"
            />
            <van-goods-action-big-btn text="加入购物车" />
            <van-goods-action-big-btn
                    primary
                    text="立即购买"
                    @click="toBuy($route.params.id)"
            />
        </van-goods-action>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.css";
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {mapState, mapGetters, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                swiperOption: {
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                        stopOnLastSlide: true
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                commodityInfo: '',
                value: 1,
                isChange: false
            }
        },
        computed: {
            ...mapState(['userInfo', 'o_num'])
        },
        components: {
            swiper,
            swiperSlide,
        },
        methods: {
            ...mapMutations(['setCommodityNum']),
            // 获取商品详情
            getCommodityInfo () {
                this.$api(this.$SERVER.GET_COMMODITYINFO, {
                    params: {id: this.$route.params.id}
                }).then(data => {
                    this.commodityInfo = data.data
                    if (this.commodityInfo.c_col === 1) {
                        this.isChange = true
                    } else {
                        this.isChange = false
                    }
                })
            },
            // 收藏商品
            handleCollect () {
                if (this.userInfo.u_avatar) {
                    if (this.isChange === true) {
                        this.isChange = false
                        this.$api(this.$SERVER.GET_COLLECTIONDEL, {
                            params: { u_id: this.userInfo._id, c_id: this.$route.params.id }
                        })
                    } else {
                        this.isChange = true
                        this.$api.post(this.$SERVER.POST_COLLECTIONADD, {
                            u_id: this.userInfo._id, c_id: this.$route.params.id })
                    }
                } else {
                    this.$router.push('/login')
                }
            },
            // 跳转至店铺
            toStore (id) {
                this.$router.push({
                    name: 'store',
                    params: {id}
                })
            },
            // 跳转至订单结算
            toBuy (id) {
                if (this.userInfo.u_avatar) {
                    this.setCommodityNum(this.value)
                    this.$router.push({
                        name: 'buy',
                        params: {id}
                    })
                } else {
                    this.$router.push('/login')
                }
            },
            // 跳转至购物车
            toCart () {
                this.$router.push('/cart')
            }
        },
        created () {
            this.getCommodityInfo()
        }
    }
</script>

<style lang="scss">
    .banner {
        .images {
            display: block;
            width: 750px;
            height: 750px;
        }
    }
    .price {
        margin: 20px;
        color: #ff463c;
        font-size: 30px;
        .main-price {
            font-size: 40px;
        }
    }
    .add {
        color: #999;
        font-size: 18px;
        padding: 10px 20px;
        height: 32px;
        .sales {
            float: left;
        }
        .school {
            float: right;
        }
    }
    .number {
        margin: 20px 20px 100px 20px;
        height: 60px;
        line-height: 60px;
        span {
            float: left;
        }
        .van-stepper {
            float: left;
            margin-left: 30px;
            height: 58px;
            font-size: 30px;
            button {
                height: 58px;
                width: 58px;
                font-size: 30px;
            }
            .van-stepper__minus::before, .van-stepper__plus::before {
                width: 30px;
                height: 4px;
            }
            .van-stepper__plus::after {
                width: 4px;
                height: 30px;
            }
            .van-stepper__input {
                width: 58px;
                height: 52px;
                font-size: 30px;
            }
        }
        .ventory {
            margin-left: 20px;
        }
    }
    .van-goods-action {
        height: 80px;
        border-top: 1px solid rgba(229,229,229,0.93);
        .heart {
            .van-icon-like:before {
                color: #f75551;
            }
        }
        .van-goods-action-mini-btn {
            height: 80px;
            font-size: 30px;
            .van-icon {
                font-size: 40px;
            }
        }
        .van-goods-action-big-btn {
            height: 80px;
            font-size: 34px;
        }
    }
</style>
