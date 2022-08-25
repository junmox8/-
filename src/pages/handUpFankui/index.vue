<template>
  <div class="fankui-container">
    <nut-datepicker
      v-model="currentDate"
      title="日期时间选择"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      v-model:visible="show"
    ></nut-datepicker>
    <nut-form>
      <nut-form-item>
        <nut-input
          label="具体地点"
          :class="['nut-input-text', 'input2']"
          placeholder="请输入地点"
          type="text"
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
          <nut-radiogroup v-model="radioVal3" direction="horizontal">
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
          <nut-uploader url="https://xxxx"></nut-uploader>
        </nut-cell>
      </nut-form-item>
    </nut-form>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let desc = ref("");
    let show = ref(false);
    let currentDate = ref("");
    let radioVal1 = ref("1");
    let radioVal2 = ref("1");
    let radioVal3 = ref("1");
    let radioVal4 = ref("1");
    const confirm = ({ selectedValue, selectedOptions }) => {
      let date, time;
      date = selectedValue.slice(0, 3).join("-");
      time = selectedValue.slice(3).join(":");
      desc.value = date + " " + time;
    };
    return {
      desc,
      currentDate,
      show,
      radioVal1,
      radioVal2,
      radioVal3,
      radioVal4,
      confirm,
      minDate: new Date(2022, 1, 1),
      maxDate: new Date(2022, 12, 1)
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
  margin-left: 10%;
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
</style>
