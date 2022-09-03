<template>
  <div class="zhaomu-container" @click="jumpToDetail">
    <img style="width:100%;height:170px" :src="img" alt="" />
    <div class="zhaomu-content-container">
      <div class="zhaomu-title">{{ title }}</div>
      <div class="zhaomu-address">
        <nut-icon name="location2"></nut-icon>
        <div>{{ location }}</div>
      </div>
      <div class="zhaomu-time">
        <nut-icon name="clock"></nut-icon>
        <div :style="{ fontSize: '13px' }">{{ time }}</div>
      </div>
      <div class="zhaomu-tag">
        <nut-tag v-if="chaoguo == false" type="success">进行中</nut-tag>
        <nut-tag v-if="chaoguo == true" type="danger">已截止</nut-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
export default {
  props: ["img", "id", "location", "title", "time"],
  created() {
    // this.time.substring(20, this.time.length)
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (time > this.time.substring(20, this.time.length)) this.chaoguo = true;
    else this.chaoguo = false;
  },
  setup(props) {
    let chaoguo = ref(false); //是否超时
    let jumpToDetail = () => {
      Taro.navigateTo({
        url: "/pages/zhaomudetail/index?id=" + props.id
      });
    };
    return {
      chaoguo,
      jumpToDetail
    };
  }
};
</script>

<style>
.zhaomu-container {
  width: 100%;
  height: 280px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.zhaomu-content-container {
  width: 100%;
  height: 110px;
  position: relative;
}
.zhaomu-title {
  position: absolute;
  left: 3%;
  top: 10px;
  font-size: 20px;
  font-weight: 600;
  word-break: break-all;
  word-wrap: break-word;
  width: auto;
  max-width: 90%;
}
.zhaomu-time {
  position: absolute;
  left: 3%;
  top: 85px;
  font-size: 15px;
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  align-items: center;
}
.zhaomu-address {
  position: absolute;
  left: 3%;
  top: 50px;
  font-size: 15px;
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  align-items: center;
}
.zhaomu-tag {
  position: absolute;
  top: 85px;
  left: 80%;
}
</style>
