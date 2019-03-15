<style lang="scss" scoped>
    .header {
        background: #fff;
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
    <div class="header">
        <header class="return">
            <span class="iconfont return-icon" @click="toLastPage">&#xe61e;</span>
            <div class="title">{{message}}</div>
        </header>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        // name: "header",
        data() {
            return {
                title: ''
            }
        },
        props: ['message'],
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            toLastPage () {
                this.$router.go(-1)
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

