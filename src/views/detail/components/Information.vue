<template>
    <div v-html="commodityInfo.c_detail" class="detail"></div>
</template>

<script>
    export default {
        data () {
            return {
                commodityInfo: ''
            }
        },
        methods: {
            // 获取商品详情
            getCommodityInfo () {
                this.$api(this.$SERVER.GET_COMMODITYINFO, {
                    params: {id: this.$route.params.id}
                }).then(data => {
                    this.commodityInfo = data.data
                })
            }
        },
        created () {
            this.getCommodityInfo()
        }
    }
</script>

<style lang="scss">
    .detail {
        padding: 20px;

    }
    .content {
        p {
            width: 750px;
        }
        img {
            display: block;
            width: 710px;
            height: auto;
        }
    }
</style>
