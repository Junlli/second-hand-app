<template>
    <div>
        <header class="selectCity">
            <span class="iconfont" @click="toHome">&#xe61e;</span>
            <span class="city">城市选择</span>
        </header>
        <div class="page" ref="wrapper">
            <div>
                <div class="city-list" v-for="item in firstLetter">
                    <h2>{{item}}</h2>
                    <ul class="mp-list">
                        <template v-for="city in cityList[item]">
                            <li  @click="toSchool(city)">{{city}}</li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search">
            <ul>
                <li
                        v-for="item in firstLetter"
                        @click="handleClick"
                        @touchstart='handleTouchStart'
                        @touchmove='handleTouchMove'
                        @touchend='handleTouchEnd'
                >{{item}}</li>
            </ul>
        </div>
    </div>

</template>

<script>
    import cities from '@/utils/api/citylist'
    import letter from '@/utils/mixins/letter'
    import BScroll from 'better-scroll'
    export default {
        mixins: [letter],
        data() {
            return {
                firstLetter: [],
                cityList: {},
                cityList1: [],
                letter: '',
                startY: 0,
                timer: null,
            }
        },
        methods: {
            // 获取城市首字母
            getCityFirstLetter() {
                let cityList = this.cityList
                for (let i = 0; i < cities.length; i++) {
                    let city = cities[i].name
                    let letter = this.ucfirst(this.ConvertPinyin(city));
                    if(cityList[letter] instanceof Array){
                        cityList[letter].push(city)
                    } else {
                        cityList[letter] = [city]
                    }
                }
                let letters = Object.keys(this.cityList);
                this.firstLetter = letters.sort()
            },
            handleClick(e) {
                this.letter = e.target.innerText
            },
            // 返回首页
            toHome() {
                this.$router.push('/')
            },
            // 手指按下
            handleTouchStart() {
                this.touchStatus = true
            },
            // 手指移动
            handleTouchMove(e) {
                if (this.touchStatus) {
                    if (this.timer) {
                        clearTimeout(this.timer)
                    }
                    this.timer = setTimeout(() => {
                        const touchY = e.touches[0].clientY - 75
                        const index = Math.floor((touchY - this.startY) / 20)
                        if (index >= 0 && index < this.firstLetter.length) {
                            this.letter = this.firstLetter[index]
                        }
                    }, 16)
                }
            },
            // 手指放开
            handleTouchEnd() {
                this.touchStatus = false
            },
            // 跳转到学校页面
            toSchool(city) {
                this.$router.push({
                    name: 'school',
                    params: {id: city}
                })
            }
        },
        watch: {
            letter() {
                if (this.letter) {
                    const element = this.$refs.wrapper.children[0].children[this.firstLetter.indexOf(this.letter)]
                    this.scroll.scrollToElement(element)
                }
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                // 上拉加载
                pullUpLoad: {
                    // 当上拉距离超过30px时触发 pullingUp 事件
                    threshold: 100
                },
            })
            this.scroll.on("pullingUp",() => {
                //alert('已到最底部')
                this.scroll.finishPullUp();//可以多次执行上拉刷新
            });
            this.scroll.refresh();
        },
        created() {
            this.getCityFirstLetter()
            // this.getCityList()
        }
    }
</script>

<style lang="scss" scoped>
    .selectCity {
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
        .city {
            font-size: 34px;
        }
    }
    .page {
        background: #f5f5f5;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 70px;
        right: 0;
        bottom: 0;
        .city-list {
            h2 {
                height: 60px;
                line-height: 60px;
                margin-left: 20px;
            }
            .mp-list {
                background: #fff;
                li {
                    border-bottom: 1px solid #ccc;
                    margin: 0 20px;
                    padding: 20px 0;
                }
                li:last-child {
                    border: none;
                }
            }
        }
        .bottom-tip{
            width: 100%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: #777;
            background: #f2f2f2;
            position: absolute;
            bottom: -35px;
            left: 0;
        }
    }
    /* 全局提示信息 */
    .alert-hook{
        display: none;
        position: fixed;
        top: 62px;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background: rgba(7, 17, 27, 0.5);
    }
    .search {
        position: absolute;
        top: 130px;
        right: 20px;
        border: 1px solid #ccc;
        border-radius: 20px;
        background: #fff;
        text-align: center;
        li {
            margin: 8px;
        }

    }
</style>
