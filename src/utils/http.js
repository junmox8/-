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
export const del = async ({ url, params, showLoading }) => {
  if (showLoading) {
    Taro.showLoading({
      title: "加载中..."
    });
  }
  try {
    const result = await send(url, params, "DELETE");
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
      data: { data: responseData, backMsg, frontMsg, code }
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
    if (code !== 200) {
      if (frontMsg === "身份认证过期,请重新登录") {
        Taro.removeStorageSync("token");
      }
      Taro.showToast({
        title: frontMsg,
        icon: "error",
        duration: 3000
      });
    }
    return { success: true, data: responseData, frontMsg, backMsg, code };
  } catch (error) {
    Taro.showToast({
      title: "服务器异常",
      icon: "error",
      duration: 3000
    });
    return { success: false, data: null, frontMsg: "服务器异常" };
  }
};
