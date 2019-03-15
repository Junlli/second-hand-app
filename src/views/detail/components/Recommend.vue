<template>
    <div class="bg clearfix">
        <ul>
            <li class="recommend" v-for="item in commodityInfo">
                <template v-if="item.c_images">
                    <img :src="$SERVER.FILEURL + item.c_images[0]">
                </template>
                <span class="title">{{item.c_title}}</span>
                <div class="price">
                    ￥<span class="num">{{item.c_price/100}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                apiData: {
                    c_type2: '',
                    c_state: 1
                },
                commodityInfo: ''
            }
        },
        methods: {
            getCommodityInfo () {
                this.$api(this.$SERVER.GET_COMMODITYINFO, {
                    params: {id: this.$route.params.id}
                }).then(data => {
                    this.apiData.c_type2 = data.data.c_type2
                    this.$api(this.$SERVER.GET_COMMODITYLIST, {
                        params: {c_type2: this.apiData.c_type2}
                    }).then(data => {
                        this.commodityInfo = data.data.list
                    })
                })
            }
        },
        created () {
            this.getCommodityInfo()
        }
    }
</script>

<style lang="scss" scoped>
    .bg {
        background: rgb(242, 242, 242);
        height: 100vh;
        ul {
            padding: 20px;
            .recommend {
                width: 342px;
                height: 490px;
                float: left;
                border-radius: 20px;
                background: #fff;
                img {
                    display: block;
                    width: 342px;
                    height: 342px;
                    border-radius: 10px 10px 0 0;
                }
                .title {
                    display: block;
                    margin: 20px;
                }
                .price {
                    font-size: 30px;
                    color: #ff463c;
                    margin-left: 10px;
                    .num {
                        font-size: 40px;
                    }
                }
            }
            .recommend:nth-child(odd) {
                margin-right: 20px;
            }
        }
    }
    .clearfix {
        overflow: hidden;
        clear: both;
    }
</style>
