<template>
    <div class="page">
        <header class="selectSchool">
            <span class="iconfont" @click="toCity">&#xe61e;</span>
            <span class="school">学校选择</span>
        </header>
        <div>
            <h2 class="city">{{city}}</h2>
            <ul>
                <li v-for="item in schoolList" class="schoolName" @click="changeSchool(item.name)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        data () {
            return {
                city: this.$route.params.id,
                schoolList: []
            }
        },
        computed: {
            ...mapState(['schoolName'])
        },
        methods: {
            ...mapMutations(['setSchool']),
            // 返回城市列表
            toCity () {
                this.$router.push('/city')
            },
            changeSchool (schoolName) {
                this.setSchool(schoolName)
                this.$router.push('/')
            }
        },
        created () {
            this.$api(this.$SERVER.GET_SCHOOLBYCITYNAME, {
                params: {name: this.city}
            }).then(data => {
                this.schoolList = data.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    .selectSchool {
        height: 70px;
        background-color: #446267;
        text-align: center;
        line-height: 70px;
        color: #fff;
        position: relative;
        .iconfont {
            font-size: 40px;
            position: absolute;
            left: 20px;
        }
        .school {
            font-size: 34px;
        }
    }
    .city {
        background: #ccc;
        padding: 20px;
    }
    .schoolName {
        margin: 20px;
    }
</style>
