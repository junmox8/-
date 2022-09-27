<template>
  <div class="zhaomu-container" @click="jumpToDetail">
    <img style="width:100%;height:170px" :src="img" alt="" />
    <div class="zhaomu-content-container">
      <div class="zhaomu-title-container">
        <div class="zhaomu-title">{{ title }}</div>
      </div>
      <div class="zhaomu-address">
        <nut-icon name="location2"></nut-icon>
        <div>{{ location }}</div>
      </div>
      <div class="end-line">
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
  </div>
</template>

<script>
import { ref } from "vue";
import Taro from "@tarojs/taro";
export default {
  props: ["img", "id", "location", "title", "time", "chaoguo"],
  created() {},
  setup(props) {
    //时间状态0 进行中 1 未开始 2 已截止
    let jumpToDetail = () => {
      Taro.navigateTo({
        url:
          "/pages/zhaomudetail/index?id=" + props.id + "&state=" + chaoguo.value
      });
    };
    return {
      jumpToDetail
    };
  }
};
</script>

<style>
.zhaomu-container {
  width: 100%;
  min-height: 280px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.zhaomu-content-container {
  width: 100%;
  min-height: 110px;
  height: auto;
  position: relative;
}
.zhaomu-title-container {
  width: 100%;
  height: auto;
  padding-left: 4%;
  margin-top: 5px;
}
.zhaomu-title {
  font-size: 20px;
  font-weight: 600;
  word-break: break-all;
  word-wrap: break-word;
  width: auto;
  max-width: 98%;
}
.zhaomu-time {
  margin-left: 3%;
  font-size: 15px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.zhaomu-address {
  margin-left: 3%;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.zhaomu-tag {
  position: absolute;
  right: 3%;
}
.end-line {
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  margin-top: 10px;
  position: relative;
}
</style>
