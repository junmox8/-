<template>
  <div :style="{ width: '70%', marginLeft: '30%' }">
    <textarea
      disabled
      v-model="answer.text"
      v-if="select == 1"
      :autosize="{ maxHeight: 150, minHeight: 30 }"
    ></textarea>
    <nut-radiogroup v-if="select == 2" v-model="answer.radio">
      <nut-radio
        disabled
        v-for="(item, index) in radio"
        :key="index"
        :label="index"
        >{{ item }}</nut-radio
      >
    </nut-radiogroup>
    <nut-checkboxgroup v-model="answer.checkbox" v-if="select == 3">
      <nut-checkbox
        disabled
        v-for="(item, index) in radio"
        :key="index"
        :label="index"
        >{{ item }}</nut-checkbox
      >
    </nut-checkboxgroup>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  props: ["select", "selects", "answer"],
  created() {
    this.radio = this.selects.split(",");
    console.log(this.answer);
  },
  setup(props) {
    let radio = ref([]);
    return {
      radio
    };
  }
};
</script>

<style></style>
