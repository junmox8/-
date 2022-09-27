<template>
  <div class="my-container">
    <div class="form-title">
      <div class="title-1">{{ title }}</div>
      <div class="title-2">{{ introduction }}</div>
    </div>
    <nut-divider style="width:95%;margin-left:2.5%;" dashed
      >问卷详情</nut-divider
    >
    <nut-form>
      <nut-form-item
        v-for="(item, index) in content"
        :key="index"
        :label="item.title"
      >
        <myNaireDetail
          @sendData="sendData"
          :select="item.select"
          :selects="item.selects"
          :answer="answer[index]"
        ></myNaireDetail>
      </nut-form-item>
    </nut-form>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import myNaireDetail from "../../component/mynaire.vue";
import qs from "qs";
import { ref, reactive, toRefs } from "vue";
import { get, post } from "../../utils/http.js";
export default {
  components: {
    myNaireDetail
  },
  async created() {
    const tid = qs.parse(this.tid.slice(26));
    const result = await get({
      url: "/volunteer/front/answer/questionnaire/id?id=" + tid.naireId
    });
    this.content = JSON.parse(result.data.content);
    this.answer = JSON.parse(tid.answer);
    this.title = result.data.title;
    this.introduction = result.data.introduction;
  },
  setup() {
    let content = ref([]);
    let answer = ref([]);
    let title = ref([]);
    let introduction = ref([]);
    return {
      content,
      answer,
      title,
      introduction
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
.form-title {
  width: 100%;
  height: auto;
  min-height: 150px;
  padding-left: 2.5%;
  padding-right: 2.5%;
  background-color: #fff;
}
.title-1 {
  width: 100%;
  height: auto;
  padding-left: 10%;
  padding-right: 10%;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
}
.title-2 {
  width: 100%;
  height: auto;
  padding-left: 6%;
  padding-right: 4%;
  font-size: 14px;
  font-weight: 500;
  color: #696969;
}
.nut-textarea__textarea {
  color: #999999;
}
</style>
