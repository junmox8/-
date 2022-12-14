import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  // 第一个参数是应用程序中 store 的唯一 id，第二个参数是 store 的初始值
  state: () => {
    return {
      selected: 0, // 当前选中的页面索引
      arr: [] //用户已经填过的问卷id
    };
  },
  getters: {},
  actions: {
    setSelected(index) {
      this.selected = index;
    },
    addArr(num) {
      this.arr = [...this.arr, num];
    },
    clearArr() {
      this.arr = [];
    }
  }
});
