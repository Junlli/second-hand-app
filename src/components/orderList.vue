<style lang="scss" scoped>
    .orderList {
        .order {
            margin: 20px;
            border-radius: 20px;
            background: #fff;
            .order-header {
                height: 40px;
                padding: 20px 30px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #d4d4d4;
                .status {
                    color: #ff463c;
                }
            }
            .order-content {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                .image {
                    img {
                        display: block;
                        width: 180px;
                        height: 180px;
                    }
                }
                .main {
                    width: 550px;
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    padding-left: 20px;
                    .title {

                    }
                    .price {
                        margin-right: 30px;
                        text-align: right;
                        .price_num {
                            display: block;
                            margin-bottom: 20px;
                        }
                        .num {
                            color: rgb(153, 153, 153);;
                        }
                    }
                }
            }
            .total {
                text-align: right;
                padding: 10px 30px 10px 0;
            }
            .btn {
                text-align: right;
                padding: 20px 30px;
                button {
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    width: 200px;
                    height: 60px;
                }
            }
        }
    }
</style>
<template>
    <div class="orderList">
        <div class="order" v-for="(item,index) in orderList" :key="index">
            <div class="order-header">
                <span>{{item.s_name}}</span>
                <span class="status">{{item.o_state}}</span>
            </div>
            <div class="order-content">
                <div class="image">
                    <img :src="$SERVER.FILEURL + item.commodity.c_images[0]" alt="">
                </div>
                <div class="main">
                    <span class="title">{{item.c_title}}</span>
                    <div class="price">
                        <span class="price_num">￥{{item.o_price/100}}</span>
                        <span class="num">×{{item.o_num}}</span>
                    </div>
                </div>
            </div>
            <div class="total">
                <span>合计：￥ {{item.o_price/100 * item.o_num}}</span>
            </div>
            <div v-if="item.o_state === '待发货'" class="btn">
                <button @click="cancelOrder(item._id)">取消订单</button>
            </div>
            <div v-if="item.o_state === '卖家已发货'" class="btn">
                <button @click="confirmReceipt(item._id)">确认收货</button>
            </div>
            <div v-if="item.o_state === '交易成功'" class="btn">
                <button>评价</button>
            </div>
            <div v-if="item.o_state === '交易关闭'" class="btn">
                <button>删除订单</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "orderList",
        props: ['orderList'],
        inject:['reload'],
        data() {
            return {

            }
        },
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 改变订单状态
            changeOrderStatus (id, status) {
                this.$api.post(this.$SERVER.POST_ORDERUPDATE, {
                    id: id, o_state: status
                }).then(data => this.reload())
            },
            // 取消订单
            cancelOrder (id) {
                this.changeOrderStatus(id, 0)
            },
            // 确认收货
            confirmReceipt (id) {
                this.changeOrderStatus(id, 3)
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

