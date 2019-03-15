<style lang="scss" scoped>
    .order {
        height: 100vh;
        background: #f5f5f5;
        .van-tabs__wrap {
            height: 60px;
            line-height: 60px;
            .van-ellipsis {
                height: 60px;
                line-height: 60px;
                font-size: 24px;
            }
        }
        .tabName {
            z-index: 2;
            width: 100%;
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid #ccc;
            font-size: 30px;
            background: #fff;
            ul {
                display: flex;
                justify-content: space-around;
                li {
                    float: left;
                    a {
                        display: inline-block;
                        height: 86px;
                        width: 100px;
                        text-align: center;
                    }
                }
            }
            .clearfix {
                content: '';
                clear: both;
                overflow: hidden;
            }
        }
        .content {
            /*margin-top: 30px;*/
        }
        .current {
            border-bottom: 4px solid rgb(255,129,97);
            color: rgb(255,129,97)!important;
        }
    }
</style>
<template>
    <div class="order">
        <home-header message="商品订单"></home-header>
        <div class="tabName">
            <ul class="clearfix">
                <li @click="tabChange(all)"><a :class="{current: 'all' === currentView}">全部</a></li>
                <li @click="tabChange(unsend)"><a :class="{current: 'unsend' === currentView}">待发货</a></li>
                <li @click="tabChange(sended)"><a :class="{current: 'sended' === currentView}">待收货</a></li>
                <li @click="tabChange(evaluate)"><a :class="{current: 'evaluate' === currentView}">待评价</a></li>
            </ul>
        </div>
        <div :is="currentView" class="content"></div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import HomeHeader from '@/components/header.vue'
    import all from './components/all'
    import unsend from './components/unsend'
    import sended from './components/sended'
    import evaluate from './components/evaluate'

    export default {
        name: "order",
        data() {
            return {
                all: 'all',
                unsend: 'unsend',
                sended: 'sended',
                evaluate: 'evaluate',
                currentView: ''
            }
        },
        components: {
            HomeHeader,
            all,
            unsend,
            sended,
            evaluate
        },
        computed: {
            ...mapState(['userInfo']),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 切换标签
            tabChange (tabItem) {
                this.currentView = tabItem
            }
        },
        created() {
            this.currentView = this.$route.params.id
        },
        mounted() {

        }
    }
</script>

