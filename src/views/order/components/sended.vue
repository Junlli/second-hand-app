<style lang="scss" scoped>
    .sended {
    }
</style>
<template>
    <div class="sended">
        <order-list :orderList="orderList"></order-list>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import orderList from '@/components/orderList'

    export default {
        name: "sended",
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
            // 获取已发货订单
            getSendedOrder () {
                this.$api(this.$SERVER.GET_ORDERLIST, {
                    params: { b_id: this.userInfo._id, o_state: 2}
                }).then(data => {
                    this.orderList = data.data.list
                    for (let i=0; i<this.orderList.length; i++) {
                        this.orderList[i].o_state = '卖家已发货'
                    }
                })
            }
        },
        created() {
            this.getSendedOrder()
        },
        mounted() {

        }
    }
</script>

