<template>
  <div class="my-container">
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
    console.log(this.content);
    console.log(this.answer);
  },
  setup() {
    let content = ref([]);
    let answer = ref([]);
    return {
      content,
      answer
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
</style>
