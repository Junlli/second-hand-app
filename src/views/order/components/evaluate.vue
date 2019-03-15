<style lang="scss" scoped>
    .evaluate {
    }
</style>
<template>
    <div class="evaluate">
        <order-list :orderList="orderList"></order-list>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import orderList from '@/components/orderList'

    export default {
        name: "evaluate",
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
            // 获取未评价订单
            getUnevaluateOrder () {
                this.$api(this.$SERVER.GET_ORDERLIST, {
                    params: { b_id: this.userInfo._id, o_state: 3}
                }).then(data => {
                    this.orderList = data.data.list
                    for (let i=0; i<this.orderList.length; i++) {
                        this.orderList[i].o_state = '交易成功'
                    }
                })
            }
        },
        created() {
            this.getUnevaluateOrder()
        },
        mounted() {

        }
    }
</script>

