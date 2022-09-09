<template>
  <div :class="['my-container', list.length == 0 ? 'empty' : '']">
    <nut-dialog
      title="删除申请"
      content="确定要删除此条申请吗"
      v-model:visible="visible"
    >
      <template v-slot:footer>
        <nut-button @click="visible = false">取消</nut-button>
        <nut-button @click="handUp">确认</nut-button>
      </template>
    </nut-dialog>
    <nut-empty
      :style="{ display: list.length == 0 ? 'block' : 'none' }"
      description="暂无提交申请"
    ></nut-empty>
    <nut-swipe v-for="(item, index) in list" :key="index">
      <nut-cell
        round-radius="0"
        :title="item.recruitTitle"
        :desc="item.submitTime"
        :sub-title="
          item.state == 0
            ? '未审核'
            : item.state == 1
            ? '已通过'
            : item.state == 2
            ? '未通过'
            : ''
        "
      />
      <template #right>
        <nut-button
          shape="square"
          type="success"
          style="height:100%"
          @click="jumpTo(item.applyId)"
          >详情</nut-button
        >
        <nut-button
          shape="square"
          style="height:100%"
          type="danger"
          @click="
            () => {
              visible = true;
              deleteId = item.applyId;
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
  async created() {
    const result = await get({
      url: "/volunteer/front/recruit/getApplies"
    });
    this.list = result.data ? result.data : [];
    console.log(result);
  },
  setup() {
    const list = ref([]);
    const deleteId = ref(0);
    const visible = ref(false);
    const handUp = async () => {
      const result = await post({
        url: "/volunteer/front/recruit/removeApply?applyId=" + deleteId.value
      });
      if (result.code == 200) {
        Taro.showToast({
          title: "删除成功",
          icon: "success",
          duration: 2000
        });
        visible.value = false;
        const result2 = await get({
          url: "/volunteer/front/recruit/getApplies"
        });
        list.value = result2.data ? result2.data : [];
      }
    };
    const jumpTo = id => {
      Taro.navigateTo({
        url: "/pages/myApplyDetail/index?id=" + id
      });
    };
    return {
      list,
      deleteId,
      visible,
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
