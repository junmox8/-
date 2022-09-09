<template>
  <div class="wenjuan-container" @click="jumpToDetail">
    <div class="wenjuan-left">
      <i style="font-size:34px" :class="['iconfont', img]"></i>
    </div>
    <div class="wenjuan-right">
      <div class="right-text">{{ title }}</div>
      <div class="right-time">{{ startTime }}-{{ endTime }}</div>
    </div>
  </div>
</template>

<script>
import { tubiao } from "../json/tubiao";
import dayjs from "dayjs";
import { useStore } from "../stores/index";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Taro from "@tarojs/taro";
export default {
  props: ["title", "startTime", "endTime", "id"],
  created() {
    const num = Math.floor(Math.random() * 10 + 1);
    this.img = tubiao[num];
  },
  setup(props) {
    let store = useStore();
    let { arr } = storeToRefs(store);
    const img = ref("");
    const jumpToDetail = () => {
      if (arr.value.includes(props.id))
        Taro.showToast({
          title: "已填写过该问卷",
          icon: "error",
          duration: 2000
        });
      else {
        const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
        if (time >= props.startTime && time <= props.endTime)
          Taro.navigateTo({
            url: "/pages/wenjuandetail/index?id=" + props.id
          });
        if (time > props.endTime)
          Taro.showToast({
            title: "填写已截止",
            icon: "error",
            duration: 2000
          });
        if (time < props.startTime)
          Taro.showToast({
            title: "填写未开始",
            icon: "error",
            duration: 2000
          });
      }
    };
    return {
      store,
      arr,
      img,
      jumpToDetail
    };
  }
};
</script>

<style>
.wenjuan-container {
  width: 100%;
  height: 50px;
  margin-bottom: 1px;
  display: flex;
  flex-wrap: nowrap;
  background-color: #fff;
  border-radius: 5px;
}
.wenjuan-left {
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wenjuan-right {
  height: 100%;
  width: 80%;
  position: relative;
}
.right-text {
  position: absolute;
  left: 0;
  top: 10%;
  width: auto;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  color: #585858;
  font-weight: 500;
}
.right-time {
  position: absolute;
  left: 0;
  top: 60%;
  color: #bebebe;
  font-size: 15px;
}
</style>
