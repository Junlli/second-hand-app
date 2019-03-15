<style lang="scss">
    .buy {
        /*height: 100vh;*/
        .order {
            .shop-title {
                position: relative;
                padding-left: 50px;
                margin: 30px;
                .t_span {
                    .van-icon {
                        font-size: 40px;
                        position: absolute;
                        left: 0;
                        top: -2px;
                    }
                }
            }
            .order_div {
                display: flex;
                justify-content: space-between;
                padding: 30px 50px 30px 30px;
                background: #fafafa;
                position: relative;
                .order-title {
                    .order-img {
                        width: 100px;
                        height: 100px;
                    }
                    .title {
                        position: absolute;
                        left: 140px;
                        top: 40px;
                    }
                }
                .right {
                    text-align: right;
                    .price {
                        color: #ff2832;
                        display: block;
                        margin: 10px 0 20px 0;
                    }
                }
            }
        }
        .delivery {
            padding: 60px 0;
            border-top: 1px solid #ddd;
            .delivery-title {
                margin-left: 20px;
            }
            .userMsg {
                padding: 30px 0;
                .van-cell-group {
                    .van-cell {
                        padding: 20px;
                        height: 100px;
                        line-height: 60px;
                        .van-field__label {
                            max-width: 200px;
                            font-size: 30px;
                        }
                        .van-field__control {
                            font-size: 30px;
                        }
                    }
                    .van-cell:not(:last-child)::after {
                        left: 0;
                    }
                }
            }
        }
        .submit {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            line-height: 100px;
            border-top: 1px solid #ccc;
            background: #fff;
            .submit-msg {
                display: inline-block;
                width: 550px;
                text-align: right;
                .order-num, .price-icon, .price-confirm {
                    color: #ff0036;
                }
                .price-icon {
                    font-size: 24px;
                }
            }
            button {
                border: none;
                height: 100px;
                background: #f9524f;
                color: #fff;
                position: absolute;
                right: 0;
                top: 0;
                width: 180px;
                padding: 0;
            }
        }
    }
</style>
<template>
    <div class="buy">
        <home-header message="订单结算"></home-header>
        <div class="order">
            <div class="shop-title">
                <span class="t_span">
                     <van-icon name="shop-o"></van-icon>
                    {{commodityInfo.u_name}}
                </span>
            </div>
            <div class="order_div">
                <div class="order-title" v-if="commodityInfo.c_images">
                    <img :src="$SERVER.FILEURL + commodityInfo.c_images[0]" class="order-img">
                    <span class="title">{{commodityInfo.c_title}}</span>
                </div>
                <span class="right">
                    <span class="price">￥ {{commodityInfo.c_price/100}}</span>
                    <span class="num">共{{o_num}}件</span>
                </span>
            </div>
        </div>
        <div class="delivery">
            <span class="delivery-title">请填写个人信息</span>
            <div class="userMsg">
                <van-cell-group>
                    <van-field
                            v-model="apiData.o_name"
                            label="收货人"
                            type="textarea"
                            placeholder="请输入收货人姓名"
                            rows="1"
                            autosize
                    />
                    <van-field
                            v-model="apiData.o_address"
                            label="交易地址"
                            type="textarea"
                            placeholder="教学楼/宿舍/食堂等"
                            rows="1"
                            autosize
                    />
                    <van-field
                            v-model="apiData.o_tel"
                            label="联系电话"
                            type="textarea"
                            placeholder="请输入联系电话"
                            rows="1"
                            autosize
                    />
                </van-cell-group>
            </div>
        </div>
        <footer class="submit">
            <div class="submit-msg">
                <span>共</span>
                <span class="order-num">{{o_num}}</span>
                <span>件，总金额</span>
                <span>
                    <span class="price-icon">￥</span>
                    <span class="price-confirm">{{commodityInfo.c_price/100}}</span>
                </span>
            </div>
            <button @click="submitOrder">确认提交</button>
        </footer>
        <notice ref="popMessage"></notice>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import Notice from '@/components/notice'
    import HomeHeader from '@/components/header'
    export default {
        name: "Buy",
        data() {
            return {
                commodityInfo: '',
                apiData: {
                    o_name: '',
                    o_address: '',
                    o_tel: '',
                    b_id: '',
                    c_id: '',
                    o_state: 1,
                    o_price: '',
                    o_num: ''
                }
            }
        },
        components: {
            Notice,
            HomeHeader
        },
        computed: {
            ...mapState(['o_num', 'userInfo']),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 获取商品信息
            getCommodity () {
                this.$api(this.$SERVER.GET_COMMODITYINFO,{
                    params: { id: this.$route.params.id }
                }).then(data => {
                    this.commodityInfo = data.data
                    this.apiData.b_id = this.userInfo._id
                    this.apiData.c_id = this.$route.params.id
                    this.apiData.o_price = this.commodityInfo.c_price
                    this.apiData.o_num = this.o_num
                })
            },
            // 提交订单
            submitOrder () {
                this.$api.post(this.$SERVER.POST_ORDERADD, {...this.apiData})
                this.$refs.popMessage.PopUpMessage('购买成功')
                setTimeout(() => this.$router.go(-1), 1000)
            }
        },
        created() {
            this.getCommodity()
        },
        mounted() {

        }
    }
</script>

