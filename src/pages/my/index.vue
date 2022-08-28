<template>
  <div class="my-container">
    <loginPopup
      :isDisplayLoginPopup="isDisplayLoginPopup"
      @closeLoginPopup="closeLoginPopup"
      @sendAvatarAndName="sendAvatarAndName"
      ref="login"
    ></loginPopup>
    <div class="my-header-container">
      <div class="header-avatar-container">
        <img :src="avatar" alt="" />
      </div>
      <div class="header-name-container">{{ name }}</div>
    </div>
    <div class="my-table-container">
      <div
        class="table-container-div"
        style="border-top-left-radius:10px;border-bottom-left-radius:10px"
      >
        <div style="color:#313131;font-size:15px;font-weight:500">
          填写问卷
        </div>
        <div style="font-size:18px;width:100%;text-align:center">0</div>
      </div>
      <div class="line">
        <div style="width:100%;height:40%;background-color:#EFEFEF"></div>
      </div>
      <div class="table-container-div">
        <div style="color:#313131;font-size:15px;font-weight:500">
          提交反馈
        </div>
        <div style="font-size:18px;width:100%;text-align:center">0</div>
      </div>
      <div class="line">
        <div style="width:100%;height:40%;background-color:#EFEFEF"></div>
      </div>
      <div
        class="table-container-div"
        style="border-top-right-radius:10px;border-bottom-right-radius:10px"
      >
        <div style="color:#313131;font-size:15px;font-weight:500">
          提交招募
        </div>
        <div style="font-size:18px;width:100%;text-align:center">0</div>
      </div>
    </div>
    <div style="width:100%;height:50px;background-color:transparent"></div>
    <nut-cell-group>
      <nut-cell icon="edit" title="我的问卷" is-link></nut-cell>
      <nut-cell icon="clock" title="我的申请" is-link></nut-cell
      ><nut-cell icon="ask2" title="我的反馈" is-link></nut-cell
      ><nut-cell icon="my" title="关于我们" is-link></nut-cell
      ><nut-cell icon="close" title="退出登录" is-link></nut-cell>
    </nut-cell-group>
    <nut-button
      size="small"
      style="  position: fixed;
  right: 20rpx;
  top: 400px;
  color:#ffffff;
  background-color:#21C175"
      @click="jumpToDetail"
      >提交反馈</nut-button
    >
  </div>
</template>

<script>
import loginPopup from "../../component/login.vue";
import Taro from "@tarojs/taro";
import { reactive, toRefs, ref } from "vue";
export default {
  async onShow() {
    if (this.isDisplayLoginPopup) return;
    const token = Taro.getStorageSync("token");
    if (token) {
      this.isDisplayLoginPopup = false;
    } else {
      this.isDisplayLoginPopup = true;
    }
  },
  components: {
    loginPopup
  },
  setup() {
    let isDisplayLoginPopup = ref(false);
    let avatar = ref(
      Taro.getStorageSync("avatar")
        ? Taro.getStorageSync("avatar")
        : "https://ps.ssl.qhimg.com/t013f5efcfb02eba705.jpg"
    );
    let name = ref(
      Taro.getStorageSync("name") ? Taro.getStorageSync("name") : "游客"
    );
    const jumpToDetail = () => {
      Taro.navigateTo({
        url: "/pages/handUpFankui/index"
      });
    };
    const closeLoginPopup = () => {
      isDisplayLoginPopup.value = false;
    };
    const sendAvatarAndName = obj => {
      Taro.setStorageSync("name", obj.name);
      Taro.setStorageSync("avatar", obj.avatar);
      (name.value = obj.name), (avatar.value = obj.avatar);
    };
    return {
      isDisplayLoginPopup,
      jumpToDetail,
      closeLoginPopup,
      avatar,
      name,
      sendAvatarAndName
    };
  }
};
</script>

<style>
.my-container {
  width: 750rpx;
  height: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #f0f0f0;
}
.my-header-container {
  width: 100%;
  height: 180px;
  background-image: url("../../img/bgjj.jpg");
  overflow: hidden;
  background-color: #f0f0f0;
  position: relative;
}
.header-avatar-container {
  height: 100%;
  width: auto;
  margin-left: 10%;
  display: flex;
  align-items: center;
}
.header-avatar-container img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}
.header-name-container {
  position: absolute;
  left: 32%;
  top: 68px;
  color: #f0f0f0;
  font-weight: 500;
  font-size: 18px;
}
.my-table-container {
  width: 80%;
  height: 80px;
  position: absolute;
  left: 10%;
  top: 150px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 1px -4px 27px 4px #efefef;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.table-container-div {
  width: 33%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap !important;
  align-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
}
.line {
  height: 100%;
  width: 0.5%;
  display: flex;
  align-items: center;
}
</style>
