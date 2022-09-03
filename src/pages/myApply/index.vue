<template>
  <div :class="['my-container', list.length == 0 ? 'empty' : '']">
    <nut-empty
      :style="{ display: list.length == 0 ? 'block' : 'none' }"
      description="暂无提交申请"
    ></nut-empty>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { get, post } from "../../utils/http.js";
export default {
  setup() {
    const list = ref([]);
    return {
      list
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
.empty {
  display: flex;
  justify-content: center;
}
</style>
