import { get, post } from "./http";
import Taro from "@tarojs/taro";
import CosAuth from "./sdk/cos-auth";
const Region = "ap-nanjing";
const Bucket = "slide-1257191112";
const camSafeUrlEncode = str => {
  return encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
};
export const uploadFile = async (file, fileName) => {
  return new Promise(async (resolve, reject) => {
    const result = await get({
      url:
        "/volunteer/front/cos/getCosTemporaryKey?bucket=slide-1257191112&region=ap-nanjing"
    });
    const data = result.data;
    const { expiredTime, id, key, startTime, token } = data;
    const Key = fileName + file.substring(file.lastIndexOf("/") + 1);
    Taro.uploadFile({
      url: "https://cos." + Region + ".myqcloud.com/" + Bucket + "/",
      name: "file",
      filePath: file,
      formData: {
        key: Key,
        success_action_status: 200,
        Signature: CosAuth({
          SecretId: id,
          SecretKey: key,
          Method: "POST",
          Pathname: "/" + Bucket + "/"
        }),
        "x-cos-security-token": token,
        "Content-Type": ""
      },
      success(res) {
        const url =
          "https://cos." +
          Region +
          ".myqcloud.com/" +
          Bucket +
          "/" +
          camSafeUrlEncode(Key).replace(/%2F/g, "/");
        if (/^2\d\d$/.test("" + res.statusCode)) {
          Taro.showToast({
            title: "上传成功",
            icon: "success",
            duration: 1000
          });
          resolve(url);
        } else {
          Taro.showModal({
            title: "上传失败",
            content: JSON.stringify(res),
            showCancel: false
          });
          reject(res);
        }
      },
      fail: function(res) {
        Taro.showModal({
          title: "上传失败",
          content: JSON.stringify(res),
          showCancel: false
        });
        reject(res);
      }
    });
  });
};
