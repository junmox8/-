<template>
  <nut-tabs auto-height v-model="tabvalue" @change="change">
    <nut-tabpane pane-key="0" title="问卷">
      <div class="find-container">
        <wenjuan
          v-for="(item, index) in wenjuanNumber"
          :key="index"
          :title="item.title"
          :startTime="item.startTime"
          :endTime="item.endTime"
          :id="item.id"
        ></wenjuan>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="1" title="招募">
      <div class="find-container">
        <zhaomu
          v-for="(item, index) in zhaomu"
          :key="index"
          :img="item.coverImg"
          :id="item.id"
          :location="item.location"
          :title="item.title"
          :time="item.startTime + '-' + item.endTime"
        ></zhaomu>
      </div>
    </nut-tabpane>
  </nut-tabs>
</template>

<script>
import { useStore } from "../../stores/index";
import zhaomu from "../../component/zhaomu.vue";
import wenjuan from "../../component/wenjuan.vue";
import { ref, reactive, toRefs } from "vue";
import { get } from "../../utils/http.js";
export default {
  components: {
    wenjuan,
    zhaomu
  },
  async onShow() {
    const result = await get({
      url: "/volunteer/front/answer/questionnaire",
      params: null,
      showLoading: false
    });
    this.wenjuanNumber = result.data;
    const result2 = await get({
      url: "/volunteer/front/answer",
      params: null,
      showLoading: true
    });
    let store = useStore();
    if (result2.data)
      result2.data.forEach(item => {
        store.addArr(item.questionnaireId);
      });
    const result3 = await get({
      url: "/volunteer/front/recruit/getRecruits",
      params: null,
      showLoading: false
    });
    this.zhaomu = result3.data;
    console.log(result3.data);
  },
  setup(props, context) {
    let tabvalue = ref(0);
    let wenjuanNumber = ref(0);
    let zhaomu = ref([]);
    const change = async () => {
      const result = await get({
        url: "/volunteer/front/answer/questionnaire",
        params: null,
        showLoading: false
      });
      wenjuanNumber.value = result.data;
    };
    return {
      tabvalue,
      wenjuanNumber,
      zhaomu,
      change
    };
  }
};
</script>

<style>
.find-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  padding-left: 2.5%;
  padding-right: 2.5%;
  padding-top: 5px;
}
.nut-tabs,
.nut-tabpane {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
