<template>
  <div class="admin-container">
    <div class="swiper-container">
      <nut-swiper
        :init-page="page"
        :pagination-visible="true"
        pagination-color="#426543"
        auto-play="3000"
      >
        <nut-swiper-item v-for="(item, index) in imgs" :key="index">
          <img style="width:100%;" :src="item" alt="" />
        </nut-swiper-item>
      </nut-swiper>
    </div>
    <div class="content-container">
      <div class="title-container">
        <div class="title-left-container">
          <div
            style="width:auto;height:30px;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center"
          >
            <div style="width:5px;height:20px;background-color:#21C175"></div>
            <div style="font-weight:600;font-size:18px;margin-left:5px">
              最新动态
            </div>
          </div>
          <div
            style="position:absolute;right:0;height:100%;line-height:50px;right:5%;font-size:14px;color:#A2A2A2"
          >
            更多
          </div>
        </div>
      </div>
      <div class="tuiwen-content-container">
        <tuiwen
          v-for="item in articles"
          :key="item.id"
          :time="item.adTime"
          :title="item.title"
          :url="item.imgPath"
        ></tuiwen>
      </div>
    </div>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import { get, post } from "../../utils/http";
import tuiwen from "../../component/tuiwen.vue";
import { reactive, toRefs, ref } from "vue";
export default {
  components: {
    tuiwen
  },
  async created() {
    const result = await get({
      url: "/volunteer/front/slide/getSlides"
    });
    this.imgs = result.data[0].url.split(",");
    const result2 = await get({
      url: "/volunteer/front/news/getNews"
    });
    this.articles = result2.data;
  },
  setup() {
    let imgs = ref([]);
    let articles = ref([]);
    return { imgs, articles };
  }
};
</script>

<style>
.admin-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-container {
  margin-top: 30px;
  width: 100%;
  height: auto;
  background-color: #fff;
}
.title-container {
  width: 100%;
  height: 50px;
  position: relative;
}
.title-left-container {
  margin-left: 5%;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
}
.tuiwen-content-container {
  width: 100%;
  height: auto;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #fff;
}
</style>
