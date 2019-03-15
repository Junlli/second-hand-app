<style lang="scss" scoped>
    .notice {
        .error {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 98;
            transform: scale(1, 1);
            div {
                display: table;
                color: white;
                font-size: .7rem;
                width: 100%;
                height: 100%;
                p {
                    display: table-cell;
                    text-align: center;
                    vertical-align: middle;
                    .error-msg {
                        display: inline-block;
                        padding: .625rem .5rem;
                        margin: 0 1rem;
                        border-radius: .25rem;
                        background-color: rgba(0,0,0,.8);
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="notice">
        <section class="error" v-show="isShow">
            <div>
                <p>
                    <span class="error-msg">{{message}}</span>
                </p>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "notice",
        data() {
            return {
                isShow: false,
                message: ''
            }
        },
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            PopUpMessage (message) {
                this.message = message
                this.isShow = true
                setTimeout(() => this.isShow = false, 2000)
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

