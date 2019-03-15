<style lang="scss" scoped>
    .collection {
        .van-card {
            height: 150px;
            position: relative;
            border-bottom: 1px solid #ddd;
            background: #fff;
            .van-card__header {
                .van-card__thumb {
                    width: 140px;
                    height: 140px;
                    img {
                        width: 140px;
                        height: 140px;
                    }
                }
                .van-card__content {
                    font-size: 20px;
                    margin-left: 20px;
                    .van-card__title, .van-card__desc {
                        min-height: 50px;
                        line-height: 50px;
                    }
                    .van-card__bottom {
                        margin-top: 20px;
                    }
                }
            }
            .van-card__footer {
                width: 100px;
                position: absolute;
                right: 50px;
                bottom: 50px;
                .van-button {
                    width: 100px;
                    height: 50px;
                    border: 1px solid #d4d4d4;
                }
            }
        }
    }
</style>
<template>
    <div class="collection">
        <home-header message="我的收藏"></home-header>
        <div>
            <ul>
                <li v-for="item in collectionList">
                    <van-card
                            :price="item.commodity.c_price/100"
                            :title="item.commodity.c_title"
                            :thumb="$SERVER.FILEURL + item.commodity.c_images[0]"
                    >
                        <div slot="footer">
                            <van-button @click="cancelCollect(item._id)">删除</van-button>
                        </div>
                    </van-card>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import HomeHeader from '@/components/header.vue'
    export default {
        name: "collection",
        data() {
            return {
                collectionList: []
            }
        },
        components: {
            HomeHeader
        },
        computed: {
            ...mapState(['userInfo']),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 获取收藏列表
            getCollectionList () {
                this.$api(this.$SERVER.GET_COLLECTIONLIST, {
                    params: {u_id: this.userInfo._id}
                }).then(data => this.collectionList = data.data.list)
            },
            // 删除收藏商品
            cancelCollect (id) {
                this.$api(this.$SERVER.GET_COLLECTIONDEL, {
                    params: { id: id }
                }).then(data => {
                    this.getCollectionList()
                })
            }
        },
        created() {
            this.getCollectionList()
        },
        mounted() {

        }
    }
</script>

