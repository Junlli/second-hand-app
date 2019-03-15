<style lang="scss">
    .search {
        height: 100vh;
        background: #fafafa;
        .return {
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid #d8d8d8;
            padding: 0 50px;
            display: flex;
            justify-content: space-between;
            background: #fff;
            .iconfont {
                font-size: 40px;
                font-weight: 700;
            }
            .van-search {
                width: 600px;
                background: #fff;
                .van-cell {
                    background: #e8ecf0;
                    height: 60px;
                    border-radius: 50px;
                    line-height: 60px;
                    font-size: 30px;
                    .van-field__left-icon {
                        font-size: 30px;
                        .van-icon-search {
                            font-size: 40px;
                            margin-right: 10px;
                        }
                    }
                    .van-cell__value {
                        .van-icon {
                            font-size: 40px;
                        }
                    }
                }
                .van-search__action {
                    font-size: 32px;
                    margin-left: 20px;
                }
            }
        }
        .result {
            background: #fff;
            li {
                padding: 30px;
                height: 40px;
                font-size: 30px;
                border-bottom: 1px solid #d4d4d4;
            }
        }
    }
</style>
<template>
    <div class="search">
        <header class="return">
            <span class="iconfont" @click="toHome">&#xe61e;</span>
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="onSearch(value)"
                    style="background: #fff"
            >
                <div slot="action" @click="onSearch(value)">搜索</div>
            </van-search>
        </header>
        <div class="result">
            <ul>
                <li v-for="(item, index) in dataList" :key="index" @click="toResult(item)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "search",
        data() {
            return {
                getApiData: {
                    c_type: '',
                    c_type2: '',
                    pageSize: 20,
                    pageIndex: 1,
                    c_state: 1,
                    u_school: ''
                },
                commodityList: [],
                value: '',
                dataList: []
            }
        },
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 返回首页
            toHome () {
                this.$router.push('/')
            },
            // 获取商品列表
            getCommodityList () {
                this.$api(this.$SERVER.GET_COMMODITYLIST, {
                    params: this.getApiData
                }).then(data => this.commodityList = data.data.list)
            },
            onSearch (keyword) {
                this.$router.push({
                    path: '/result',
                    query: {keyword}
                })
            },
            // 跳转至搜索结果页面
            toResult (keyword) {
                this.$router.push({
                    path: '/result',
                    query: {keyword}
                })
            },
            // 清楚搜索关键词
            clearKeyword () {
                this.value = ''
            }
        },
        watch: {
          // 检测搜索关键词的变化
          value () {
              this.$api(this.$SERVER.GET_COMMODITYLIST, {
                  params: this.getApiData
              }).then(data => {
                  this.commodityList = data.data.list
                  this.dataList = []
                  for (let i=0; i<this.commodityList.length; i++) {
                      let reg = new RegExp('.*' + this.value + '.*')
                      if (reg.test(this.commodityList[i].c_title) && this.value!=='') {
                          this.dataList.push(this.commodityList[i].c_title)
                      }
                  }
              })
          }
        },
        created() {
            this.getCommodityList()
            this.value = this.$route.query.keyword
        },
        mounted() {

        }
    }
</script>

