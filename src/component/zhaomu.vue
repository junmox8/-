<template>
  <div class="zhaomu-container" @click="jumpToDetail">
    <img
      style="width:100%;height:170px"
      src="https://ps.ssl.qhimg.com/t013f5efcfb02eba705.jpg"
      alt=""
    />
    <div class="zhaomu-content-container">
      <div class="zhaomu-title">相应撒打算嗲撒打算</div>
      <div class="zhaomu-address">
        <nut-icon name="location2"></nut-icon>
        <div>asdasdasd</div>
      </div>
      <div class="zhaomu-time">
        <nut-icon name="clock"></nut-icon>
        <div>2022-08-06</div>
      </div>
      <div class="zhaomu-tag">
        <nut-tag type="success">进行中</nut-tag>
      </div>
    </div>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
export default {
  setup() {
    let jumpToDetail = () => {
      Taro.navigateTo({
        url: "/pages/zhaomudetail/index"
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
