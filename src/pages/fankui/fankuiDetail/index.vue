<template>
  <div class="fankui-container">
    <nut-form :style="{ width: '90%', marginLeft: '5%' }">
      <nut-form-item>
        <nut-input
          disabled
          label="反馈标题"
          v-model="title"
          placeholder="请输入标题"
        />
      </nut-form-item>
      <nut-form-item>
        <nut-input
          disabled
          v-model="location"
          label="具体地点"
          placeholder="请输入地点"
          rows="2"
          type="textarea"
        />
        <!-- <nut-textarea
          v-model="location"
          style="width:90%"
          :autosize="{ maxHeight: 50, minHeight: 20 }"
          v-if="select == 1"
        /> -->
      </nut-form-item>
      <nut-form-item>
        <nut-input disabled v-model="time" label="反馈日期" />
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:66%;display:flex;align-items:center">
            水体味道
          </div>
          <nut-radiogroup v-model="answer[0]" direction="horizontal">
            <nut-radio disabled label="1">腥臭味</nut-radio>
            <nut-radio disabled label="2">一般臭味</nut-radio>
            <nut-radio disabled label="3">无臭味</nut-radio>
            <nut-radio disabled label="4">其他味道</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:40%;display:flex;align-items:center">
            水生植物数量
          </div>
          <nut-radiogroup v-model="answer[1]" direction="horizontal">
            <nut-radio disabled label="1">大量植物</nut-radio>
            <nut-radio disabled label="2">正常</nut-radio>
            <nut-radio disabled label="3">无</nut-radio>
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
            v-model="answer[2]"
            direction="horizontal"
          >
            <nut-radio disabled label="1">有</nut-radio>
            <nut-radio disabled label="2">无</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:55%;display:flex;align-items:center">
            水体颜色
          </div>
          <nut-radiogroup v-model="answer[3]" direction="horizontal">
            <nut-radio disabled label="1">清澈见底</nut-radio>
            <nut-radio disabled label="2">绿色</nut-radio>
            <nut-radio disabled label="3">灰绿色</nut-radio>
            <nut-radio disabled label="4">黑色</nut-radio>
          </nut-radiogroup>
        </nut-cell>
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:40%;display:flex;align-items:center">
            上传图片
          </div>
          <img
            v-for="(item, index) in imgs"
            :key="index"
            :src="item"
            style="width:30%;height:80px;"
          />
        </nut-cell>
      </nut-form-item>
    </nut-form>
    <nut-form>
      <nut-form-item
        style="margin-left:4%"
        v-if="response.length > 0"
        label="管理员回复"
      >
        <nut-textarea
          style="width:90%"
          disabled
          v-model="response"
        ></nut-textarea>
      </nut-form-item>
    </nut-form>
  </div>
</template>

<script>
import qs from "qs";
import { get, post } from "../../../utils/http";
import { ref, reactive } from "vue";
export default {
  async created() {
    const id = qs.parse(this.tid.slice(32)).id;
    const result = await get({
      url: "/volunteer/front/feedback/getFeedbackById?feedbackId=" + id
    });
    this.title = result.data.feedback.title;
    const arr = result.data.feedback.content.split(",");
    this.time = arr[1];
    this.location = arr[0];
    this.answer = arr.splice(2, 4);
    this.imgs = result.data.feedback.resourceUrl.split(",");
    this.response = result.data.feedback.checkComment;
    console.log(result);
  },
  setup(props, context) {
    const title = ref("");
    const answer = ref([]);
    const time = ref("");
    const imgs = ref([]);
    let response = ref("");
    const location = ref("");
    return {
      title,
      answer,
      time,
      location,
      imgs,
      response
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
  margin-left: 40%;
}
.h5-input,
.input-text {
  max-width: 75%;
}
</style>
