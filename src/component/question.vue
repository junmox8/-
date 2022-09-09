<template>
  <div :style="{ width: '70%', marginLeft: '30%' }">
    <textarea
      style="width:90%"
      v-model="text"
      v-if="select == 1"
      rows="1"
    ></textarea>
    <div v-if="select == 2" style="display:flex;justify-content:flex-start;">
      <nut-radiogroup
        style="margin-left:0px"
        v-if="select == 2"
        v-model="radioVal"
      >
        <nut-radio
          style="margin-left:0px"
          v-for="(item, index) in radio"
          :key="index"
          :label="index"
          >{{ item }}</nut-radio
        >
      </nut-radiogroup>
    </div>
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

<style>
.nut-radio__label {
  max-width: 78%;
}
.nut-radiogroup {
  margin-left: -3% !important;
}
.nut-checkboxgroup {
  margin-left: -4%;
}
.nut-checkbox__label {
  max-width: 74%;
}
</style>
