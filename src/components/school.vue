<style lang="scss" scoped>
    .school {
        position: relative;
        .van-cell {
            margin-bottom: 0;
        }
        .school-list {
            position: absolute;
            left: 160px;
            top: 96px;
            width: 486px;
            border: 1px solid #ccc;
            border-top: none;
            border-radius: 0 0 10px 10px;
            height: 300px;
            overflow-y: scroll;
            background: #fff;
            z-index: 2;
            li {
                margin: 16px;
            }
        }
    }
</style>
<template>
    <div class="school">
        <van-field
                v-model="apiData.u_school"
                label="学校"
                placeholder="请输入学校"
                @input="getSchool"
        />
        <div class="school-list" v-show="isShow">
            <ul>
                <li v-for="item in schoolList" @click="chooseSchool(item.name)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "school",
        data() {
            return {
                apiData: {
                    u_school: ''
                },
                schoolList: [],
                isShow: false
            }
        },
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 获取学校
            getSchool () {
                if (this.apiData.u_school === '') {
                    this.schoolList = []
                    return
                } else {
                    this.$api(this.$SERVER.GET_SCHOOILIST, {
                        params: {name: this.apiData.u_school}
                    }).then(data => {
                        if (data.data.length !== 0) {
                            this.isShow = true
                            this.schoolList = data.data
                        }
                    })
                }
            },
            // 选择学校
            chooseSchool (school) {
                this.apiData.u_school = school
                this.$emit('change', this.apiData.u_school)
                this.isShow = false
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

