<template>
  <div class="tuiwen-container">
    <div class="tuiwen-content">
      <div class="left">
        <div style="display:-webkit-box;" class="text-container">
          大厦大厦啊实打实倒萨撒范德萨分士大夫爱的色放的萨芬士大夫阿斯蒂芬阿斯蒂芬阿斯蒂芬
        </div>
        <div class="time">
          <nut-icon name="clock"></nut-icon>
          <div>2022-08-06</div>
        </div>
      </div>
      <div class="right">
        <img
          style="width:100%;height:100%;"
          src="https://ps.ssl.qhimg.com/t013f5efcfb02eba705.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tuiwen"
};
</script>

<style>
.tuiwen-container {
  width: 100%;
  height: 130px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  padding-bottom: 20px;
  padding-top: 20px;
}
.tuiwen-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
}
.left {
  width: 60%;
  height: 100%;
  position: relative;
}
.right {
  width: 40%;
  height: 100%;
}
.text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  max-height: 45%;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 16px;
  color: #2f2f2f;
  font-weight: 550;
}
.time {
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  align-items: center;
  top: 75%;
}
</style>
