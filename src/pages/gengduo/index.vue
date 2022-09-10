<template>
  <div class="gengduo-container">
    <nut-searchbar @search="search" v-model="value">
      <template v-slot:leftin>
        <nut-icon size="14" name="search2"></nut-icon>
      </template>
    </nut-searchbar>
    <div :class="['tuiwen-content-container', list.length == 0 ? 'empty' : '']">
      <tuiwen
        v-for="item in list"
        :key="item.id"
        :time="item.adTime"
        :title="item.title"
        :url="item.imgPath"
      ></tuiwen>

      <nut-empty
        :style="{ display: list.length == 0 ? 'block' : 'none' }"
        description="暂无推文发布"
      ></nut-empty>
    </div>
    <!-- <div class="noMore" :style="{ display: send == true ? 'none' : 'block' }">
      ----没有更多推文了----
    </div> -->
  </div>
</template>

<script>
import tuiwen from "../../component/tuiwen.vue";
import { get, post } from "../../utils/http";
import { ref, reactive, toRefs } from "vue";
export default {
  components: {
    tuiwen
  },
  async onReachBottom() {
    if (this.send == true) {
      const result = await get({
        url:
          "/volunteer/front/news/getNews?pageNum=" + this.page + "&pageSize=5",
        showLoading: true
      });
      this.list = [...this.list, ...result.data.records];
      this.page++;
      if (result.data.total == this.list.length) this.send = false;
    }
  },
  async onShow() {
    const result = await get({
      url: "/volunteer/front/news/getNews?pageNum=1&pageSize=5"
    });
    this.list = result.data.records;
    if (result.data.total == this.list.length) this.send = false;
  },
  setup() {
    const value = ref("");
    const list = ref([]);
    const page = ref(2);
    const send = ref(true);
    const search = async () => {
      const result = await get({
        url: "/volunteer/front/news/getNewsByTitle?title=" + value.value
      });
      list.value = result.data;
    };
    return {
      value,
      list,
      page,
      send,
      search
    };
  }
};
</script>

<style>
.gengduo-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  padding-top: 5px;
}
.tuiwen-content-container {
  width: 100%;
  height: auto;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #fff;
}
.empty {
  display: flex;
  justify-content: center;
}
.noMore {
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.3);
}
</style>
