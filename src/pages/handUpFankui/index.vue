<template>
  <div class="fankui-container">
    <nut-dialog
      title="提交表单"
      content="确定要提交表单吗"
      v-model:visible="visible"
    >
      <template v-slot:footer>
        <nut-button @click="visible = false">取消</nut-button>
        <nut-button @click="handUp">确认</nut-button>
      </template>
    </nut-dialog>
    <nut-datepicker
      v-model="currentDate"
      title="日期时间选择"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      v-model:visible="show"
    ></nut-datepicker>
    <nut-form :style="{ width: '90%', marginLeft: '5%' }">
      <nut-form-item>
        <nut-input label="反馈标题" v-model="title" placeholder="请输入标题" />
      </nut-form-item>
      <nut-form-item>
        <nut-input
          v-model="address"
          label="具体地点"
          placeholder="请输入地点"
        />
      </nut-form-item>
      <nut-form-item>
        <nut-cell
          title="日期时间选择"
          :desc="desc"
          @click="show = true"
        ></nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:66%;display:flex;align-items:center">
            水体味道
          </div>
          <nut-radiogroup v-model="radioVal1" direction="horizontal">
            <nut-radio label="1">腥臭味</nut-radio>
            <nut-radio label="2">一般臭味</nut-radio>
            <nut-radio label="3">无臭味</nut-radio>
            <nut-radio label="4">其他味道</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:40%;display:flex;align-items:center">
            水生植物数量
          </div>
          <nut-radiogroup v-model="radioVal2" direction="horizontal">
            <nut-radio label="1">大量植物</nut-radio>
            <nut-radio label="2">正常</nut-radio>
            <nut-radio label="3">无</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:30%;display:flex;align-items:center">
            排口
          </div>
          <nut-radiogroup
            :style="{ marginLeft: '25%' }"
            v-model="radioVal3"
            direction="horizontal"
          >
            <nut-radio label="1">有</nut-radio>
            <nut-radio label="2">无</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:55%;display:flex;align-items:center">
            水体颜色
          </div>
          <nut-radiogroup v-model="radioVal4" direction="horizontal">
            <nut-radio label="1">清澈见底</nut-radio>
            <nut-radio label="2">绿色</nut-radio>
            <nut-radio label="3">灰绿色</nut-radio>
            <nut-radio label="4">黑色</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:40%;display:flex;align-items:center">
            上传图片
          </div>
          <nut-button plain type="primary" size="mini" @click="chooseimg"
            >上传</nut-button
          >
        </nut-cell>
        <div class="img-container">
          <div
            style="width: 100rpx; height: 60px; position: relative"
            :key="index"
            v-for="(item, index) in fileList"
          >
            <img
              style="
              display: inline-block;
              width: 100%;
              height: 100%;
              display: inline-block;
            "
              :src="item"
              alt=""
            />
            <div class="nut-icon-container">
              <nut-icon
                @click="deleteImg(index)"
                name="close"
                size="15px"
                color="#eeeeee"
                style="margin: 0px 0 0 0px"
              ></nut-icon>
            </div>
          </div>
        </div>
      </nut-form-item>
      <nut-form-item> </nut-form-item>
    </nut-form>
    <nut-button
      shape="square"
      @click="() => (visible = true)"
      style="width:100%;height:100%;line-height:50px;text-align:center;background-color:#FA4419;color:#fff;font-size:16px"
      >立即提交</nut-button
    >
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import { get, post } from "../../utils/http";
import { uploadFile } from "../../utils/upload";
export default {
  async created() {},
  setup() {
    let desc = ref("");
    let show = ref(false);
    let currentDate = ref("");
    let radioVal1 = ref("1");
    let radioVal2 = ref("1");
    let radioVal3 = ref("1");
    let radioVal4 = ref("1");
    const visible = ref(false);
    let title = ref("");
    let address = ref("");
    let fileList = ref([]);
    let img = ref("");
    const confirm = ({ selectedValue, selectedOptions }) => {
      let date, time;
      date = selectedValue.slice(0, 3).join("-");
      time = selectedValue.slice(3).join(":");
      desc.value = date + " " + time;
    };
    const handUp = async () => {
      // const result = await post({
      //   url:
      //     "/volunteer/front/feedback/addUserFeedback?content=" +
      //     address.value +
      //     "," +
      //     desc.value +
      //     "," +
      //     radioVal1.value +
      //     "," +
      //     radioVal2.value +
      //     "," +
      //     radioVal3.value +
      //     "," +
      //     radioVal4.value +
      //     "&resourceUrl=" +
      //     img.value +
      //     "&title=" +
      //     title.value,
      //   params: null,
      //   showLoading: false
      // });
      // console.log(result);
      Taro.request({
        url:
          "http://43.142.147.49:5200//volunteer/front/feedback/addUserFeedback?content=" +
          address.value +
          "," +
          desc.value +
          "," +
          radioVal1.value +
          "," +
          radioVal2.value +
          "," +
          radioVal3.value +
          "," +
          radioVal4.value +
          "&resourceUrl=" +
          img.value +
          "&title=" +
          title.value,
        method: "POST",
        header: {
          token: Taro.getStorageSync("token") || ""
        },
        success: res => {
          if (res.data.code == 200) {
            Taro.navigateBack({
              delta: 1
            });
            Taro.showToast({
              title: "成功添加反馈",
              icon: "success",
              duration: 2000
            });
          }
        }
      });
    };
    const chooseimg = () => {
      Taro.chooseImage({
        count: 9,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: async res => {
          fileList.value = [];
          let result = "";
          let n = 0;
          for (let i of res.tempFilePaths) {
            n++;
            const data = await uploadFile(i, "feedback/");
            fileList.value.push(data);
            if (n !== res.tempFilePaths.length) result = result + data + ",";
            else result = result + data;
          }
          img.value = result;
        }
      });
    };
    const deleteImg = i => {
      if (img.value.includes(fileList.value[i] + ",")) {
        const a = img.value;
        img.value = a.replace(fileList.value[i] + ",", "");
      } else {
        const a = img.value;
        img.value = a.replace(fileList.value[i], "");
      }
      fileList.value.splice(i, 1);
    };
    return {
      desc,
      currentDate,
      show,
      radioVal1,
      radioVal2,
      radioVal3,
      radioVal4,
      address,
      confirm,
      title,
      visible,
      minDate: new Date(2022, 1, 1),
      maxDate: new Date(2022, 12, 1),
      handUp,
      fileList,
      chooseimg,
      img,
      deleteImg
    };
  }
};
</script>

<style>
.fankui-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding-left: 2.5%;
  padding-right: 2.5%;
}
.nut-radiogroup {
  margin-left: 29%;
}
.label-string {
  position: absolute;
  left: 35rpx;
  color: #666666;
}
.nut-input .input-text,
.nut-input__text--readonly {
  margin-left: 42%;
}
.img-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  padding-left: 2%;
}
.nut-icon-container {
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 0.7;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* line-height: 25px;
  text-align: center; */
}
</style>
