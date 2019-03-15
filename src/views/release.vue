<style lang="scss" scoped>
    .release {
        .return {
            position: relative;
            height: 88px;
            border-bottom: 1px solid #d8d8d8;
            padding: 0 100px;
            .return-icon {
                position: absolute;
                top: 26px;
                left: 40px;
                font-size: 40px;
                font-weight: 700;
            }
            .title {
                height: 88px;
                line-height: 88px;
                text-align: center;
                font-size: 40px;
            }
        }
    }
</style>
<template>
    <div class="release">
        <header class="return">
            <span class="iconfont return-icon" @click="toHome">&#xe61e;</span>
            <div class="title">发布商品</div>
        </header>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "release",
        data() {
            return {}
        },
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            toHome () {
                this.$router.push('/')
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

