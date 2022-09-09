<template>
  <div :style="{ width: '70%', marginLeft: '30%' }">
    <textarea
      style="width:90%"
      disabled
      v-model="answer.text"
      v-if="select == 1"
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
  },
  setup(props) {
    let radio = ref([]);
    return {
      radio
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
