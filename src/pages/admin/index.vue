<template>
  <div class="admin-container">
    <div :class="['swiper-container', imgs.length == 0 ? 'empty' : '']">
      <nut-swiper
        :style="{ display: imgs.length == 0 ? 'none' : 'block' }"
        :init-page="page"
        :pagination-visible="true"
        pagination-color="#426543"
        auto-play="3000"
      >
        <nut-swiper-item v-for="(item, index) in imgs" :key="index">
          <img style="width:100%;" :src="item" alt="" />
        </nut-swiper-item>
      </nut-swiper>
      <nut-empty
        :style="{ display: imgs.length == 0 ? 'block' : 'none' }"
        description="暂无发布轮播图"
      ></nut-empty>
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
            @click="jumpTo"
            style="position:absolute;right:0;height:100%;line-height:50px;right:5%;font-size:14px;color:#A2A2A2"
          >
            更多
          </div>
        </div>
      </div>
      <div
        :class="[
          'tuiwen-content-container',
          articles.length == 0 ? 'empty' : ''
        ]"
      >
        <tuiwen
          v-for="item in articles"
          :key="item.id"
          :time="item.adTime"
          :title="item.title"
          :url="item.imgPath"
        ></tuiwen>
        <nut-empty
          :style="{ display: articles.length == 0 ? 'block' : 'none' }"
          description="暂无推文发布"
        ></nut-empty>
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
  async onShow() {
    const result = await get({
      url: "/volunteer/front/slide/getSlides"
    });
    this.imgs = result.data[0].url.split(",");
    const result2 = await get({
      url: "/volunteer/front/news/getNews?pageNum=1&pageSize=4"
    });
    console.log(result2);
    this.articles = result2.data.records;
  },
  setup() {
    let imgs = ref([]);
    let articles = ref([]);
    const jumpTo = () => {
      Taro.navigateTo({
        url: "../gengduo/index"
      });
    };
    return { imgs, articles, jumpTo };
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
.empty {
  display: flex;
  justify-content: center;
}
</style>
