<style lang="scss" scoped>
    .upload {
        width: 300px;
        height: 300px;
        border-radius: 20px;
        border: 2px dashed #ccc;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .van-uploader {
            font-size: 80px;
            color: #ccc;
            img {
                position: absolute;
                left: -110px;
                top: -106px;
                border-radius: 20px;
                display: block;
                width: 300px;
                height: 300px;
            }
        }
    }
</style>
<template>
    <div class="upload">
        <van-uploader :after-read="onRead">
            <van-icon name="plus" />
            <img v-if="photo !== ''" :src="photo">
        </van-uploader>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "upload",
        data() {
            return {
                photo: ''
            }
        },
        computed: {
            ...mapState([]),
            ...mapGetters([]),
        },
        methods: {
            ...mapMutations([]),
            onRead(file) {
                console.log(res)
                this.photo = file.content
                console.log(URL.createObjectURL(this.dataURLtoBlob(this.photo)))
                this.$emit('change', this.photo)
            },
            // 图片 base64 url 转 blob
            dataURLtoBlob (dataurl) {
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new Blob([u8arr], {type: mime})
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

