<template>
  <div class="fankui-container">
    <nut-form :style="{ width: '90%', marginLeft: '5%' }">
      <nut-form-item>
        <nut-input label="反馈标题" v-model="title" placeholder="请输入标题" />
      </nut-form-item>
      <nut-form-item>
        <nut-input
          v-model="location"
          label="具体地点"
          placeholder="请输入地点"
        />
      </nut-form-item>
      <nut-form-item>
        <nut-input v-model="time" label="反馈日期" />
      </nut-form-item>
      <nut-form-item>
        <nut-cell>
          <div style="height:100%;width:66%;display:flex;align-items:center">
            水体味道
          </div>
          <nut-radiogroup v-model="answer[0]" direction="horizontal">
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
          <nut-radiogroup v-model="answer[1]" direction="horizontal">
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
            :style="{ marginLeft: '5%' }"
            v-model="answer[2]"
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
          <nut-radiogroup v-model="answer[3]" direction="horizontal">
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
  </div>
</template>

<script>
import qs from "qs";
import { get, post } from "../../utils/http";
import { ref, reactive } from "vue";
export default {
  async created() {
    const id = qs.parse(this.tid.slice(25)).id;
    const result = await get({
      url: "/volunteer/front/feedback/getFeedbackById?feedbackId=" + id
    });
    this.title = result.data.feedback.title;
    const arr = result.data.feedback.content.split(",");
    this.time = arr[1];
    this.location = arr[0];
    this.answer = arr.splice(2, 4);
    this.imgs = result.data.feedback.resourceUrl.split(",");
  },
  setup(props, context) {
    const title = ref("");
    const answer = ref([]);
    const time = ref("");
    const imgs = ref([]);
    const location = ref("");
    return {
      title,
      answer,
      time,
      location,
      imgs
    };
  }
};
</script>

<style></style>
