<template>
  <view>
    <nut-popup
      v-model:visible="isDisplayLoginPopup"
      :close-on-click-overlay="false"
      :round="true"
      :style="{
        width: '600rpx',
        height: '150rpx',
        padding: '30rpx'
      }"
    >
      <view class="login-title">用 户 登 录</view>
      <view style="margin-top: 20rpx">
        <nut-button type="success" block @click="doLogin"
          >微信授权登录</nut-button
        >
      </view>
      <!-- <view :class="$style['login-bottom']">
        <nut-checkbox v-model="isReadContent"></nut-checkbox>
        <view :class="$style['login-bottom-protocol']">
          我已阅读并同意
          <span style="color:#DC143C" @click="goUserPrivacyProtocol"
            >《科抖用户隐私协议》</span
          >
        </view>
      </view> -->
    </nut-popup>
  </view>
</template>

<script>
import { ref, reactive } from "vue";
// import { useStore } from "@/stores/index";
import Taro from "@tarojs/taro";
import { get, post } from "../utils/http";

export default {
  props: {
    isDisplayLoginPopup: {
      type: Boolean,
      default: false
    }
  },
  emits: ["closeLoginPopup"],
  setup(props, { emit }) {
    // const store = useStore();
    const isReadContent = ref(false);
    const doLogin = async () => {
      //   if (isReadContent.value) {
      //     const { errMsg, code } = await Taro.login();
      //     if (errMsg === "login:ok") {
      //       const data = await post({
      //         url: "/user/login",
      //         params: {
      //           code
      //         },
      //         showLoading: true
      //       });
      //       if (data.success) {
      //         Taro.setStorageSync("token", data.data);
      //         const user = await get({
      //           url: "/user/me"
      //         });
      //         if (user.success) {
      //           store.setUserBasicInfo(user.data);
      //         }
      //         emit("closeLoginPopup");
      //         store.setSelected(0);
      //         Taro.switchTab({
      //           url: "/pages/index/index"
      //         });
      //       }
      //     }
      //   } else {
      //     Taro.showToast({
      //       title: "请勾选相关协议",
      //       icon: "error",
      //       duration: 2000
      //     });
      //   }
    };
    const goUserPrivacyProtocol = () => {
      //   Taro.navigateTo({
      //     url: "/pages/my/protocol/index"
      //   });
    };
    return {
      doLogin,
      isReadContent,
      goUserPrivacyProtocol
    };
  }
};
</script>

<style module lang="scss">
.container_login {
  display: "flex";
  justify-content: "center";
  align-items: "center";
}

.login-title {
  width: 100%;
  color: $title-color;
  font-size: 15px;
  display: flex;
  justify-content: center;
}

.login-bottom {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.login-bottom-protocol {
  font-size: $font-size-2;
  display: flex;
  align-items: center;
}
</style>
