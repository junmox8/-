<template>
  <nut-tabs auto-height v-model="tabvalue">
    <nut-tabpane pane-key="0" title="问卷">
      <div class="find-container">
        <wenjuan></wenjuan>
        <wenjuan></wenjuan>
        <wenjuan></wenjuan>
        <wenjuan></wenjuan>
      </div>
    </nut-tabpane>
    <nut-tabpane pane-key="1" title="招募">
      <div class="find-container">
        <zhaomu></zhaomu>
        <zhaomu></zhaomu>
        <zhaomu></zhaomu>
      </div>
    </nut-tabpane>
  </nut-tabs>
</template>

<script>
import zhaomu from "../../component/zhaomu.vue";
import wenjuan from "../../component/wenjuan.vue";
import { ref, reactive, toRefs } from "vue";
export default {
  components: {
    wenjuan,
    zhaomu
  },
  setup(props, context) {
    let tabvalue = ref(0);
    return {
      tabvalue
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
