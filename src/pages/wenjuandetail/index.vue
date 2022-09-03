<template>
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
  <div class="detail-container">
    <div class="wenjuan">
      <nut-form>
        <nut-form-item
          v-for="(item, index) in content"
          :key="index"
          :label="item.title"
        >
          <question
            @sendData="sendData"
            :select="item.select"
            :selects="item.selects"
          ></question>
        </nut-form-item>
      </nut-form>
    </div>
    <div class="zhaomudetail-bottom">
      <nut-button
        shape="square"
        @click="() => (visible = true)"
        style="width:100%;height:100%;line-height:50px;text-align:center;background-color:#FA4419;color:#fff;font-size:16px"
        >立即提交</nut-button
      >
    </div>
  </div>
</template>

<script>
import { useStore } from "../../stores/index";
import { storeToRefs } from "pinia";
import Taro from "@tarojs/taro";
import PubSub from "pubsub-js";
import question from "../../component/question.vue";
import qs from "qs";
import { ref } from "vue";
import { get, post } from "../../utils/http";
export default {
  async created() {
    const result = qs.parse(this.tid.slice(26));
    this.id = result.id;
    const result2 = await get({
      url: "/volunteer/front/answer/questionnaire/id?id=" + this.id,
      params: null,
      showLoading: false
    });
    this.content = JSON.parse(result2.data.content);
  },
  components: {
    question
  },
  setup(props) {
    let id = ref(0);
    let content = ref({});
    let answer = ref([]);
    const visible = ref(false);
    const handUp = async () => {
      visible.value = false;
      PubSub.publish("sendData", 1);
    };
    const sendData = async obj => {
      answer.value = [...answer.value, obj];
      if (answer.value.length === content.value.length) {
        const result = await post({
          url: "/volunteer/front/answer",
          params: {
            answer: JSON.stringify(answer.value),
            questionnaireId: id.value
          },
          showLoading: true
        });
        if (result.data == true) {
          answer.value = [];
          Taro.showToast({
            title: "成功提交问卷",
            icon: "success",
            duration: 2000
          });
          Taro.navigateBack({
            delta: 1
          });
        }
      }
    };
    return {
      id,
      content,
      visible,
      answer,
      handUp,
      sendData
    };
  }
};
</script>

<style>
.detail-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding-left: 2.5%;
  padding-right: 2.5%;
}
.wenjuan {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #fff;
}
</style>
