import Taro from "@tarojs/taro";

export const post = async ({ url, params, showLoading }) => {
  if (showLoading) {
    Taro.showLoading({
      title: "加载中..."
    });
  }
  try {
    const result = await send(url, params, "POST");
    return result;
  } finally {
    if (showLoading) {
      Taro.hideLoading();
    }
  }
};

export const get = async ({ url, params, showLoading }) => {
  if (showLoading) {
    Taro.showLoading({
      title: "加载中..."
    });
  }
  try {
    const result = await send(url, params, "GET");
    return result;
  } finally {
    if (showLoading) {
      Taro.hideLoading();
    }
  }
};

const send = async (url, data, method) => {
  try {
    const {
      data: { success, data: responseData, errorMsg }
    } = await Taro.request({
      url: "http://43.142.147.49:5200" + url,
      method,
      data,
      dataType: "json",
      header: {
        Authorization: "Bearer " + Taro.getStorageSync("token") || "",
        token: Taro.getStorageSync("token") || ""
      }
    });
    if (errorMsg) {
      if (errorMsg === "请重新登录") {
        Taro.removeStorageSync("token");
      }
      Taro.showToast({
        title: errorMsg,
        icon: "error",
        duration: 3000
      });
    }
    return { success, data: responseData, errorMsg };
  } catch (error) {
    Taro.showToast({
      title: "服务器异常",
      icon: "error",
      duration: 3000
    });
    return { success: false, data: null, errorMsg: "服务器异常" };
  }
};
