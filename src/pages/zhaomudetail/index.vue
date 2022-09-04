<template>
  <div class="zhaomudetail-container">
    <div style="width:100%;height:1vh;background-color:#f0f0f0"></div>
    <div class="zhaomudetail-content-container">
      <div class="zhaomudetail-content-title">
        <div class="zhaomudetail-content-title-content">
          <nut-icon style="color:#21C175" name="location"></nut-icon>
          <div>项目详情</div>
        </div>
        <div class="zhaomudetail-content-content">
          <nut-cell-group>
            <nut-cell title="招募截至" :desc="endTime"></nut-cell>
            <nut-cell title="时间" :desc="huodongTime"></nut-cell>
            <nut-cell title="地点" :desc="location"></nut-cell>
            <nut-cell title="举办方" :desc="manager"></nut-cell>
            <nut-cell title="电话" :desc="contact"></nut-cell>
            <div class="last-nut-cell">
              <nut-input
                disabled
                style="width:100%;height:100%"
                label="项目介绍"
                type="textarea"
                show-word-limit
                rows="4"
                max-length="200"
                placeholder="请输入留言"
                v-model="instruction"
              />
            </div>
          </nut-cell-group>
        </div>
      </div>
    </div>
    <div class="zhaomudetail-bottom">
      <nut-button
        @click="baoming"
        shape="square"
        style="width:100%;height:100%;line-height:50px;text-align:center;background-color:#FA4419;color:#fff;font-size:16px"
        >立即报名</nut-button
      >
    </div>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import { reactive, toRefs, ref } from "vue";
import { get, post } from "../../utils/http";
import qs from "qs";
import dayjs from "dayjs";
export default {
  async created() {
    this.id = qs.parse(this.tid.slice(25)).id;
    this.state = qs.parse(this.tid.slice(25)).state;
    const result = await get({
      url:
        "/volunteer/front/recruit/getRecruitById?recruitId=" +
        qs.parse(this.tid.slice(25)).id
    });
    const data = result.data;
    this.huodongTime = data.instruction.substring(0, 39);
    this.contact = data.contact;
    this.manager = data.manager;
    this.instruction = data.instruction.substring(39, data.instruction.length);
    this.endTime = data.endTime;
    this.location = data.location;
    const result2 = await get({ url: "/volunteer/front/recruit/getApplies" });
    if (!result.data) {
    } else {
    }
  },
  setup() {
    const id = ref(0);
    const endTime = ref("");
    const instruction = ref("");
    const location = ref("");
    const manager = ref("");
    const contact = ref("");
    const huodongTime = ref("");
    const hasDone = ref(false); //有没有报过名
    const state = ref(0);
    const baoming = () => {
      if (state.value == 2)
        Taro.showToast({
          title: "招募已截止",
          icon: "error",
          duration: 2000
        });
      if (state.value == 1)
        Taro.showToast({
          title: "招募未开始",
          icon: "error",
          duration: 2000
        });
      if (state.value == 0)
        Taro.navigateTo({
          url: "../handUpZhaomu/index?id=" + id.value
        });
    };
    return {
      id,
      endTime,
      instruction,
      location,
      manager,
      endTime,
      huodongTime,
      contact,
      hasDone,
      state,
      baoming
    };
  }
};
</script>

<style>
.zhaomudetail-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  background-color: #fff;
}
.zhaomudetail-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
}
.zhaomudetail-content-container {
  width: 100%;
  height: 99vh;
  background-color: #fff;
}
.zhaomudetail-content-title {
  width: 100%;
  height: 50px;
}
.zhaomudetail-content-title-content {
  height: 100%;
  width: 32%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}
.zhaomudetail-content-content {
  width: 100%;
  min-height: 500px;
  height: auto;
  padding-left: 10px;
  padding-right: 10px;
}
.last-nut-cell {
  width: 100%;
  min-height: 46px;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
}
.nut-input {
  padding: 0;
  margin-left: 4.5%;
}
.nut-input-label {
  display: flex;
  align-items: center;
}
.nut-input .input-text,
.nut-input__text--readonly {
  width: 94.5%;
  color: #cfcccc;
}
</style>
