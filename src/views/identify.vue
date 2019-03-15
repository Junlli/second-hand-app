<style lang="scss">
    .identify {
        height: 100vh;
        background: #fafafa;
        .van-cell-group {
            margin-top: 20px;
            .van-cell {
                font-size: 30px;
                height: 80px;
                .van-cell__title {
                    width: 200px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    max-width: 120px;
                }
                .van-cell__value {
                    height: 60px;
                    line-height: 60px;
                }
            }
        }
        .photo {
            margin-top: 20px;
            background: #fff;
            padding-bottom: 20px;
            span {
                display: block;
                padding: 20px 0 20px 40px;
                font-size: 30px;
            }
        }
        .submit {
            text-align: center;
            margin-top: 20px;
            button {
                width: 500px;
                height: 80px;
                background: #ea6232;
                border: none;
                border-radius: 20px;
                color: #fff;
            }
        }
        .result {
            font-size: 40px;
            text-align: center;
            margin-top: 300px;
        }
        .success {
            font-size: 40px;
            text-align: center;
            margin-top: 300px;
            color: #f75551;
        }
    }
</style>
<template>
    <div class="identify">
        <home-header message="实名认证"></home-header>
        <div v-if="userInfo.u_apply.u_static == 0 && userInfo.u_static == false">
            <van-cell-group>
                <van-field
                        v-model="getApiData.p_name"
                        label="姓名"
                        type="textarea"
                        placeholder="请输入真实姓名"
                        rows="1"
                />
                <van-field
                        v-model="getApiData.p_school"
                        label="学校"
                        type="textarea"
                        placeholder="请输入学校"
                        rows="1"
                />
                <van-field
                        v-model="getApiData.p_prove"
                        label="学号"
                        type="textarea"
                        placeholder="请输入学号"
                        rows="1"
                />
            </van-cell-group>
            <div class="photo">
                <span>请上传学生证或学生卡</span>
                <upload @change="uploadImg"></upload>
            </div>
            <div class="submit" @click="submit">
                <button>提交认证</button>
            </div>
        </div>
        <div class="result" v-if="userInfo.u_apply.u_static == 1 && userInfo.u_static == false">
            <p>您的资料已经提交，请等待审核...</p>
        </div>
        <div class="success" v-if="userInfo.u_apply.u_static == 0 && userInfo.u_static == true">
            <p>您的认证已通过！</p>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import HomeHeader from '@/components/header.vue'
    import upload from '@/components/upload.vue'

    export default {
        name: "identify",
        inject: ['reload'],
        data() {
            return {
                getApiData: {
                    p_name: '',
                    p_prove: '',
                    p_school: '',
                    p_image: ''
                }
            }
        },
        components: {
            HomeHeader,
            upload
        },
        computed: {
            ...mapState(['userInfo']),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            // 获取认证照片
            uploadImg (src) {
                this.getApiData.p_image = src
            },
            // 提交认证
            submit () {
                this.$api.post(this.$SERVER.POST_PROVEADD, this.getApiData)
                this.reload()
            }
        },
        created() {
            console.log(this.userInfo)
        },
        mounted() {

        }
    }
</script>

