<template>
  <div>
    <header class="header clearfix">
      <h1>校乐购</h1>
      <router-link to="/search" class="seachGoods">
        <span class="iconfont">&#xe78b;</span>
        <input class="search" placeholder="输入商品名称">
      </router-link>
      <div class="school" @click="changeSchool">
        <span class="name">{{schoolName}}</span>
        <span class="iconfont">&#xe6bd;</span>
      </div>
    </header>
    <div class="banner">
      <swiper :options="swiperOption" v-if="bannerImgs.length">
        <swiper-slide v-for="(item, index) in bannerImgs" :key="index">
          <img :src="$SERVER.FILEURL + item.b_image" alt="">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="wrapper">
      <div class="type" v-for="(item, index) in typeList" :key="index" @click="toTypeInfo(item.t_name)">
        <img src="@/assets/img/footer/wechat.jpg" alt="">
        <div class="typeName">{{ item.t_name }}</div>
      </div>
    </div>
    <div class="main"></div>
    <home-footer active="0"></home-footer>
  </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import HomeFooter from '@/components/footer.vue'
  import { mapState, mapGetters, mapMutations } from 'vuex'
  export default {
      name: "home",
      components: {
          swiper,
          swiperSlide,
          HomeFooter
      },
      data () {
          return {
              swiperOption: {
                  loop: true,
                  autoplay: {
                      disableOnInteraction: false,
                  },
                  pagination: {
                      el: '.swiper-pagination'
                  }
              },
              bannerImgs: [],
              typeList: []
          }
      },
      computed: {
          ...mapState(['schoolName', 'typeName', 'userInfo'])
      },
      methods: {
          ...mapMutations(['setSchool','setTypeName', 'setActive']),
          getBannerImg () {
              this.$api(this.$SERVER.GET_BANNERLIST)
                  .then(data => {
                      this.bannerImgs = data.data.list
                  })
          },
          getTypeList () {
              this.$api(this.$SERVER.GET_TYPELIST)
                  .then(data => {
                      this.typeList = data.data.list
                  })
          },
          // 跳转到分类列表
          toTypeInfo (typeName) {
              this.setTypeName(typeName)
              this.$router.push('/type')
          },
          // 更换学校
          changeSchool () {
              this.$router.push('/city')
          },
          // 获取用户信息
          getUserSchool () {
              if(this.userInfo.u_school && this.schoolName === '') {
                  this.setSchool(this.userInfo.u_school)
              }
          },
      },
      created () {
          // 获取轮播图
          this.getBannerImg()
          // 获取商品分类列表
          this.getTypeList()
          // 获取学校名称
          this.getUserSchool()
          this.setActive(0)
      }
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 70px;
    line-height: 70px;
    background: #446267;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    h1 {
      display: inline-block;
      padding: 0 10px;
      font-family: '隶书';
      font-size: 36px;
      font-weight: 700;
      color: #fff;
    }
    .seachGoods {
      position: relative;
      height: 42px;
      margin-top: 10px;
      background: #fff;
      padding: 0 50px;
      box-sizing: border-box;
      display: inline-block;
      border-radius: 10px;
      margin-left: 10px;
      .iconfont {
        position: absolute;
        left: 10px;
        bottom: -16px;
        color: #ccc;
        font-size: 34px;
      }
      .search {
        box-sizing: border-box;
        display: block;
        height: 42px;
        line-height: 42px;
        /*padding: 10px 0;*/
        width: 310px;
      }
    }
    .school {
      height: 100%;
      color: #fff;
      font-size: 28px;
      float: right;
      padding-right: 34px;
      .name {
        display: inline-block;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
        margin-right: 20px;
      }
      .iconfont {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-45%);
      }
    }
  }
  .banner {
    padding-top: 70px;
    height: 220px;
    img {
      width: 100%;
      height: 220px;
    }
  }
  .wrapper {
    height: 320px;
    .type {
      width: 122px;
      margin-left: 20px;
      margin-top: 26px;
      float: left;
      img {
        width: 122px;
        height: 96px;
      }
      .typeName {
        font-size: 22px;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
  .main {
    height: 1000px;
  }
  .clearfix:before,.clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
</style>
