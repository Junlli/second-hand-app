<template>
    <div class="bg">
        <header class="return">
            <span class="iconfont return-icon" @click="toHome">&#xe61e;</span>
            <div class="title">登录</div>
        </header>
        <van-cell-group>
            <van-field
                    v-model="apiData.u_account"
                    label="用户名"
                    placeholder="请输入用户名"
            />
            <van-field
                    v-model="apiData.u_password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
            />
        </van-cell-group>
        <notice ref="popMessage"></notice>
        <a class="btn" @click="handleLogin">登录</a>
        <div class="func">
            <span class="changepwd">修改密码</span>
            <span class="register" @click="toRegister">注册-></span>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import Notice from '@/components/notice'
    export default {
        data () {
            return {
                apiData: {
                    u_account: '',
                    u_password: ''
                }
            }
        },
        components: {
            Notice
        },
        methods: {
            ...mapMutations(['setUserInfo', 'setSchool']),
            toHome () {
                this.$router.go(-1)
            },
            handleLogin () {
                this.$api.post(this.$SERVER.POST_LOGIN, this.apiData)
                    .then(data => {
                        console.log(data.data)
                        if (data.data) {
                            this.setUserInfo(data.data)
                            this.setSchool(data.data.u_school)
                            this.$router.push('/')
                        } else {
                            this.$refs.popMessage.PopUpMessage('请输入正确的账号或密码')
                        }
                    })
            },
            // 跳转到注册页
            toRegister () {
                this.$router.push('/register')
            }
        }
    }
</script>

<style lang="scss">
    .bg {
        height: 100vh;
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
        .van-cell-group {
            width: 650px;
            margin: 300px auto 50px;
            /*margin-top: 300px;*/
            .van-cell {
                margin-bottom: 50px;
                height: 92px;
                line-height: 92px;
                background: #fafafa;
                border-radius: 10px;
                font-size: 30px;
                .van-field__label {
                    max-width: 130px;
                    line-height: 72px;
                }
                .van-cell__value {
                    line-height: 72px;
                }
            }
            .van-cell:not(:last-child)::after {
                border: none;
            }
        }
        .van-hairline--top-bottom::after {
            border: none;
        }
        .btn {
            background-color: #b9b9b9;
            color: white;
            font-size: 30px;
            text-align: center;
            display: block;
            width: 100%;
            border-radius: 10px;
            line-height: 70px;
            width: 650px;
            margin: 0 auto;
        }
        .func {
            display: flex;
            justify-content: space-between;
            padding: 30px 60px 0;
        }
    }
</style>
