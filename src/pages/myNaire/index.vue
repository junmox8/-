<template>
  <div :class="['my-container', list.length == 0 ? 'empty' : '']">
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
    <nut-empty
      :style="{ display: list.length == 0 ? 'block' : 'none' }"
      description="暂无填写问卷"
    ></nut-empty>
    <nut-swipe v-for="(item, index) in list" :key="index">
      <nut-cell round-radius="0" :title="item.title" :desc="item.submitTime" />
      <template #right>
        <nut-button
          shape="square"
          type="success"
          style="height:100%"
          @click="jumpTo(item.answerId, item.questionnaireId, item.answer)"
          >详情</nut-button
        >
        <nut-button
          shape="square"
          style="height:100%"
          type="danger"
          @click="
            () => {
              visible = true;
              deleteId = item.answerId;
            }
          "
          >删除</nut-button
        >
      </template>
    </nut-swipe>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import { ref, reactive, toRefs } from "vue";
import { get, post } from "../../utils/http.js";
export default {
  async onShow() {
    const result = await get({
      url: "/volunteer/front/answer"
    });
    this.list = result.data;
  },
  setup() {
    const list = ref([]);
    const visible = ref(false);
    const deleteId = ref(0);
    const handUp = async () => {
      Taro.request({
        url:
          "http://43.142.147.49:5200//volunteer/front/answer?id=" +
          deleteId.value, //仅为示例，并非真实的接口地址
        method: "DELETE",
        header: {
          token: Taro.getStorageSync("token")
        },
        success: async function(res) {
          if (res.data.code == 200) {
            Taro.showToast({
              title: "删除成功",
              icon: "success",
              duration: 2000
            });
            visible.value = false;
            const result2 = await get({
              url: "/volunteer/front/answer"
            });
            list.value = result2.data;
          } else {
            Taro.showToast({
              title: "删除失败",
              icon: "error",
              duration: 2000
            });
          }
        }
      });
    };
    const jumpTo = (id1, id2, answer) => {
      Taro.navigateTo({
        url:
          "/pages/myNaireDetail/index?answerId=" +
          id1 +
          "&naireId=" +
          id2 +
          "&answer=" +
          answer
      });
    };
    return {
      list,
      visible,
      deleteId,
      handUp,
      jumpTo
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
