<style lang="scss" scoped>
    .unsend {
    }
</style>
<template>
    <div class="unsend">
        <order-list :orderList="orderList"></order-list>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import orderList from '@/components/orderList'

    export default {
        name: "unsend",
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
            // 获取未发货订单
            getUnsendOrder () {
                this.$api(this.$SERVER.GET_ORDERLIST, {
                    params: { b_id: this.userInfo._id, o_state: 1}
                }).then(data => {
                    this.orderList = data.data.list
                    for (let i=0; i<this.orderList.length; i++) {
                        this.orderList[i].o_state = '待发货'
                    }
                })
            }
        },
        created() {
            this.getUnsendOrder()
        },
        mounted() {

        }
    }
</script>

