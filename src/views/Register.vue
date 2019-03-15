<template>
    <div>
        <header class="return">
            <span class="iconfont return-icon" @click="toLogin">&#xe61e;</span>
            <div class="title">注册</div>
        </header>
        <van-cell-group>
            <van-field
                    v-model="apiData.u_account"
                    label="账号"
                    placeholder="请输入账号"
            />
            <van-field
                    v-model="apiData.u_password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
            />
            <van-field
                    v-model="apiData.u_confirmpwd"
                    type="password"
                    label="确认密码"
                    placeholder="请再次填写密码"
            />
            <van-field
                    v-model="apiData.u_name"
                    label="用户名"
                    placeholder="请输入用户名"
            />
            <school @change="getSchoolName"></school>
        </van-cell-group>
        <notice ref="popMessage"></notice>
        <a class="btn" @click="handleRegister">注册</a>
    </div>
</template>
<script>
    import School from '@/components/school'
    import Notice from '@/components/notice'
    export default {
        name: 'register',
        data () {
            return {
                apiData: {
                    u_account: '',
                    u_password: '',
                    u_confirmpwd: '',
                    u_name: '',
                    u_school: ''
                },
            }
        },
        components: {
            School,
            Notice
        },
        methods: {
            // 返回首页
            toLogin () {
                this.$router.push('/login')
            },
            handleRegister () {
                if (this.apiData.u_account === '' || this.apiData.u_password === '' || this.u_name === '' || this.u_school === '') {
                    console.log(this.$refs)
                    this.$refs.popMessage.PopUpMessage('请将信息填写完整')
                } else if (!/^\w{6,10}$/.test(this.apiData.u_account)) {
                    this.$refs.popMessage.PopUpMessage('账号只能由字母和数字组成')
                } else if (!/^[0-9a-zA-Z]{6,}/.test(this.apiData.u_password)) {
                    this.$refs.popMessage.PopUpMessage('密码至少6位')
                } else if (this.apiData.u_password !== this.apiData.u_confirmpwd) {
                    this.$refs.popMessage.PopUpMessage('两次输入的密码不一致')
                } else {
                    this.$api.post(this.$SERVER.POST_ADDUSER, this.apiData)
                        .then(data => this.$router.push('/login'))
                }
            },
            // 获取学校名称
            getSchoolName (name) {
                this.apiData.u_school = name
            }
        }
    }
</script>

<style lang="scss">
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
        margin: 100px auto 50px;
        .van-cell {
            margin-bottom: 50px;
            height: 92px;
            line-height: 92px;
            background: #fafafa;
            border-radius: 10px;
            font-size: 30px;
            .van-field__label {
                max-width: 160px;
                line-height: 72px;
                text-align: center;
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
</style>
