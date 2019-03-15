<style lang="scss" scoped>
    .all {

    }
</style>
<template>
    <div class="all">
        <order-list :orderList="orderList"></order-list>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import orderList from '@/components/orderList'

    export default {
        name: "all",
        data() {
            return {
                orderList: []
            }
        },
        computed: {
            ...mapState(['userInfo']),
            ...mapGetters([]),
        },
        components: {
            orderList
        },
        methods: {
            ...mapMutations([]),
            // 获取订单列表
            getOrderList () {
                this.$api(this.$SERVER.GET_ORDERLIST, {
                    params: {b_id: this.userInfo._id}
                }).then(data => {
                    this.orderList = data.data.list
                    for (let i= 0; i<this.orderList.length; i++) {
                        if (this.orderList[i].o_state === 1) {
                            this.orderList[i].o_state = '待发货'
                        } else if (this.orderList[i].o_state === 2) {
                            this.orderList[i].o_state = '卖家已发货'
                        } else if (this.orderList[i].o_state === 3) {
                            this.orderList[i].o_state = '交易成功'
                        } else {
                            this.orderList[i].o_state = '交易关闭'
                        }
                    }

                })
            }
        },
        created() {
            this.getOrderList()
        },
        mounted() {

        }
    }
</script>

