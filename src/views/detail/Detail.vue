<template>
    <div>
        <header class="tabName">
            <span class="iconfont" @click="toType">&#xe61e;</span>
            <ul>
                <li @click="tabChange(commodity)"><a :class="{current: 'commodity' === currentView}">商品</a></li>
                <li @click="tabChange(information)"><a :class="{current: 'information' === currentView}">详情</a></li>
                <li @click="tabChange(comment)"><a :class="{current: 'comment' === currentView}">评论</a></li>
                <li @click="tabChange(recommend)"><a :class="{current: 'recommend' === currentView}">推荐</a></li>
            </ul>
        </header>
        <div :is="currentView" class="content"></div>
    </div>
</template>

<script>
    import commodity from './components/Commodity'
    import information from './components/Information'
    import comment from './components/Comment'
    import recommend from './components/Recommend'
    export default {
        data () {
            return {
                commodity: 'commodity',
                information: 'information',
                comment: "comment",
                recommend: "recommend",
                currentView: 'commodity'
            }
        },
        components: {
            commodity,
            information,
            comment,
            recommend
        },
        methods: {
            // 切换标签
            tabChange (tabItem) {
                this.currentView = tabItem
            },
            // 返回分类列表
            toType () {
                this.$router.go(-1)
            }
        },
        created () {
        }
    }
</script>

<style lang="scss" scoped>
    .tabName {
        z-index: 2;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 88px;
        line-height: 88px;
        border-bottom: 1px solid #ccc;
        font-size: 40px;
        background: #fff;
        .iconfont {
            font-size: 40px;
            margin-left: 40px;
            float: left;
        }
        ul {
            margin-left: 20px;
            float: left;
            li {
                float: left;
                margin-left: 60px;
                a {
                    display: inline-block;
                    height: 86px;
                    width: 86px;
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
        margin-top: 88px;
    }
    .current {
        border-bottom: 4px solid rgb(255,129,97);
        color: rgb(255,129,97)!important;
    }

</style>
