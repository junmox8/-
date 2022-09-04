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
        <nut-tag v-if="chaoguo == 0" type="success">进行中</nut-tag>
        <nut-tag v-if="chaoguo == 2" type="danger">已截止</nut-tag>
        <nut-tag v-if="chaoguo == 1" type="primary">未开始</nut-tag>
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
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (time > this.time.substring(20, this.time.length)) this.chaoguo = 2;
    if (time < this.time.substring(0, 20)) this.chaoguo = 1;
  },
  setup(props) {
    let chaoguo = ref(0); //时间状态0 进行中 1 未开始 2 已截止
    let jumpToDetail = () => {
      Taro.navigateTo({
        url:
          "/pages/zhaomudetail/index?id=" + props.id + "&state=" + chaoguo.value
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
  left: 4%;
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
