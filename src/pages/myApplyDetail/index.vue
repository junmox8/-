<template>
  <div class="my-container">
    <nut-form>
      <nut-form-item label="申请备注">
        <nut-textarea disabled v-model="beizhu" type="text" />
      </nut-form-item>
      <nut-form-item label="联系方式">
        <input disabled :value="contact" />
      </nut-form-item>
    </nut-form>
    <nut-form>
      <nut-form-item v-if="yijian.length > 0" label="管理员回复">
        <nut-textarea disabled v-model="yijian"></nut-textarea>
      </nut-form-item>
    </nut-form>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import { ref, reactive, toRefs } from "vue";
import qs from "qs";
import { get, post } from "../../utils/http.js";
export default {
  async created() {
    const id = qs.parse(this.tid.slice(26)).id;
    const result = await get({
      url: "/volunteer/front/recruit/getApplyById?applyId=" + id
    });
    console.log(result.data);
    this.contact = result.data.contact;
    this.beizhu = result.data.comment;
    this.yijian = result.data.checkRemark;
  },
  setup() {
    const id = ref(0);
    const contact = ref("");
    const beizhu = ref("");
    const yijian = ref("");
    return {
      id,
      contact,
      beizhu,
      yijian
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
