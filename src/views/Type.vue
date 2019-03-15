<template>
    <div class="bg">
        <header class="classification">
            <span class="iconfont" @click="toHome">&#xe61e;</span>
            <span class="commodity">商品分类</span>
        </header>
        <div class="typeList">
            <ul>
                <li v-for="(item, index) in items" :key="index" class="typeName" @click="changeType(index)" :class="{current:isCurrent === index}">{{item}}</li>
            </ul>
        </div>
        <div class="commodityList">
            <ul>
                <li class="commodityInfo" v-for="item in commodityList" @click="toDetail(item._id)">
                    <template v-if="item.c_images[0]">
                        <img v-lazy="$SERVER.FILEURL + item.c_images[0]" alt="">
                    </template>
                    <div class="controduct">
                        <span class="title">{{item.c_title}}</span>
                        <div class="price">
                            <span class="icon">￥</span>
                            <span class="num">{{item.c_price/100}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        data() {
            return {
                // typeName: '',
                items: [], // 二级分类
                isCurrent: 0,
                apiData: {
                    c_type2: '',
                    c_state: 1
                },
                commodityList: []
            };
        },
        computed: {
            ...mapState(['typeName'])
        },
        methods: {
            ...mapMutations(['setTypeName']),
            // 返回首页
            toHome () {
                this.$router.push('/')
            },
            // 获取二级分类列表
            getSecondType () {
                this.$api(this.$SERVER.GET_TYPELIST)
                    .then(data => {
                        for (let i=0; i<data.data.list.length; i++) {
                            if (data.data.list[i].t_name === this.typeName) {
                                this.items = data.data.list[i].t_types
                                this.apiData.c_type2 = this.items[0]
                                this.getCommodityInfo()
                            }
                        }
                    })
            },
            changeType (index) {
                this.isCurrent = index
                this.apiData.c_type2 = this.items[index]
                this.getCommodityInfo()
            },
            // 获取商品详情
            getCommodityInfo () {
                this.$api(this.$SERVER.GET_COMMODITYLIST, {
                    params: this.apiData
                }).then(data => {
                    this.commodityList = data.data.list
                })
            },
            // 跳转到商品详情页
            toDetail (id) {
                this.$router.push({
                    name: 'detail',
                    params: {id}
                })
            }
        },
        created () {
            this.getSecondType()
        }
    }
</script>

<style lang="scss" scoped>
    .bg {
        background: rgb(242, 242, 242);
        height: 100vh;
        width: 100%;
        .classification {
            height: 70px;
            width: 100%;
            background-color: #446267;
            text-align: center;
            line-height: 70px;
            color: #fff;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 2;
            .iconfont {
                font-size: 40px;
                position: absolute;
                left: 20px;
            }
            .commodity {
                font-size: 34px;
            }
        }
        .typeList {
            width: 200px;
            background: #515a6e;
            text-align: center;
            position: fixed;
            left: 0;
            top: 70px;
            color: hsla(0,0%,100%,.7);
            .typeName {
                padding: 40px 0;
            }
            .current {
                background: #2d8cf0;
                color: #fff;
            }
        }
        .commodityList {
            ul {
                position: absolute;
                top: 90px;
                left: 200px;
                .commodityInfo {
                    width: 250px;
                    height: 400px;
                    background: #fff;
                    float: left;
                    border-radius: 10px;
                    margin-left: 20px;
                    img {
                        display: block;
                        width: 250px;
                        height: 250px;
                        border-radius: 10px 10px 0 0;
                    }
                    .controduct {
                        padding: 10px;
                        .title {
                            color: rgb(51, 51, 51);
                            width: 230px;
                            height: 60px;
                            display: block;
                            font-size: 30px;
                            overflow: hidden;
                            margin: 20px 0 10px 0;
                        }
                        .price {
                            color: rgb(255, 80, 0);
                            .icon {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }

        }
    }
</style>
