<template>
  <div class="wenjuan-container" @click="jumpToDetail">
    <div class="wenjuan-left">
      <nut-icon size="34" color="#21C175" name="message"></nut-icon>
    </div>
    <div class="wenjuan-right">
      <div class="right-text">{{ title }}</div>
      <div class="right-time">{{ startTime }}-{{ endTime }}</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../stores/index";
import { storeToRefs } from "pinia";
import Taro from "@tarojs/taro";
export default {
  props: ["title", "startTime", "endTime", "id"],
  setup(props) {
    let store = useStore();
    let { arr } = storeToRefs(store);
    const jumpToDetail = () => {
      if (arr.value.includes(props.id))
        Taro.showToast({
          title: "已填写过该问卷",
          icon: "error",
          duration: 2000
        });
      else
        Taro.navigateTo({
          url: "/pages/wenjuandetail/index?id=" + props.id
        });
    };
    return {
      store,
      arr,
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
