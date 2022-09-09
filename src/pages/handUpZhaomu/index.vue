<template>
  <div class="tianxie-container">
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
    <nut-form>
      <nut-form-item label="联系电话" label-width="70px">
        <div
          style="display:flex;flex-wrap:nowrap;justify-content: space-between;"
        >
          <input v-model="phone" placeholder="请输入联系电话" type="text" />
          <button
            class="button-phone"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
            size="mini"
            type="primary"
          >
            获取
          </button>
        </div>
      </nut-form-item>
      <nut-form-item label="备注" label-width="70px">
        <nut-textarea v-model="beizhu" placeholder="请输入备注" type="text" />
      </nut-form-item>
    </nut-form>
    <nut-button
      @click="handup"
      style="width:100%;background-color:#21C18B;color:#fff"
      >提交</nut-button
    >
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import { get, post } from "../../utils/http";
import qs from "qs";
export default {
  created() {
    const id = qs.parse(this.tid.slice(25)).id;
    this.id = id;
  },
  setup(props, context) {
    const id = ref(0);
    const phone = ref("");
    const beizhu = ref("");
    const visible = ref(false);
    const handup = async () => {
      visible.value = true;
    };
    const handUp = async () => {
      if (!phone.value || !beizhu.value)
        Taro.showToast({
          title: "请输入完整表单",
          icon: "error",
          duration: 2000
        });
      else {
        const result = await post({
          url:
            "/volunteer/front/recruit/submitApply?comment=" +
            beizhu.value +
            "&contact=" +
            phone.value +
            "&recruitId=" +
            id.value
        });
        if (result.code == 200) {
          visible.value = false;
          Taro.navigateBack({
            delta: 1
          });
          Taro.showToast({
            title: "成功报名",
            icon: "success",
            duration: 2000
          });
        }
      }
    };
    const getPhoneNumber = async e => {
      console.log(e);
    };
    return {
      phone,
      beizhu,
      id,
      visible,
      handup,
      handUp,
      getPhoneNumber
    };
  }
};
</script>

<style>
.tianxie-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding-left: 2.5%;
  padding-right: 2.5%;
}
.button-phone {
  height: 30% !important;
}
</style>
