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
  emits: ["closeLoginPopup", "sendAvatarAndName"],
  setup(props, { emit }) {
    // const store = useStore();
    const isReadContent = ref(false);
    const doLogin = async () => {
      const { code } = await Taro.login();
      const result = await post({
        url: "/volunteer/front/user/pass/login?code=" + code,
        params: null,
        showLoading: true
      });
      if (result.data.token) {
        Taro.setStorageSync("token", result.data.token);
        Taro.setStorageSync("openId", result.data.open_id);
        emit("closeLoginPopup");
        Taro.showModal({
          title: "温馨提示",
          content: "授权登录才能正常使用小程序",
          success: res => {
            if (res.confirm) {
              Taro.getUserProfile({
                lang: "zh_CN",
                desc: "获取你的昵称、头像、地区及性别",
                success: async response => {
                  const result2 = await get({
                    url: "/volunteer/front/answer/count"
                  });
                  const result3 = await get({
                    url: "/volunteer/front/feedback/getFeedbacks"
                  });
                  const result4 = await get({
                    url: "/volunteer/front/recruit/getApplies"
                  });
                  emit("sendAvatarAndName", {
                    avatar: response.userInfo.avatarUrl,
                    name: response.userInfo.nickName,
                    naireNumber: result2.data ? result2.data : 0,
                    fankuiNumber: result3.data ? result3.data.length : 0,
                    applyNumber: result4.data ? result4.data.length : 0
                  });
                },
                fail: () => {
                  //拒绝授权
                  console.error("您拒绝了请求");
                  return;
                }
              });
            }
          }
        });
      }
    };
    const goUserPrivacyProtocol = () => {};
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
