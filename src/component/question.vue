<template>
  <div :style="{ width: '70%', marginLeft: '30%' }">
    <nut-textarea
      v-model="text"
      v-if="select == 1"
      :autosize="{ maxHeight: 150, minHeight: 30 }"
    ></nut-textarea>
    <nut-radiogroup v-if="select == 2" v-model="radioVal">
      <nut-radio v-for="(item, index) in radio" :key="index" :label="index">{{
        item
      }}</nut-radio>
    </nut-radiogroup>
    <nut-checkboxgroup v-model="checkboxVal" v-if="select == 3">
      <nut-checkbox
        v-for="(item, index) in radio"
        :key="index"
        :label="index"
        >{{ item }}</nut-checkbox
      >
    </nut-checkboxgroup>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import { reactive, ref } from "vue";
export default {
  props: ["select", "selects"],
  context: ["sendData"],
  created() {
    this.radio = this.selects.split(",");
    PubSub.subscribe("sendData", (_, data) => {
      let obj = {};
      if (this.select == 1) obj = { select: this.select, text: this.text };
      if (this.select == 2) obj = { select: this.select, radio: this.radioVal };
      if (this.select == 3)
        obj = { select: this.select, checkbox: this.checkboxVal };
      this.$emit("sendData", obj);
    });
  },
  setup(props, context) {
    let radio = ref([]);
    let radioVal = ref(0);
    let checkboxVal = ref([]);
    let text = ref("");
    return {
      radio,
      radioVal,
      checkboxVal,
      text
    };
  }
};
</script>

<style></style>
