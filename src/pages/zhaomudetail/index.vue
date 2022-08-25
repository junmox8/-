<template>
  <div class="zhaomudetail-container">
    <div style="width:100%;height:1vh;background-color:#f0f0f0"></div>
    <div class="zhaomudetail-content-container">
      <div class="zhaomudetail-content-title">
        <div class="zhaomudetail-content-title-content">
          <nut-icon style="color:#21C175" name="location"></nut-icon>
          <div>项目详情</div>
        </div>
        <div class="zhaomudetail-content-content">
          <nut-cell-group>
            <nut-cell title="招募截至" desc="2022-08-08 15:20"></nut-cell>
            <nut-cell
              title="时间"
              desc="2022-08-08 15:20-2022-08-08 16:22"
            ></nut-cell>
            <nut-cell title="地点" desc="asdsadsa"></nut-cell>
            <nut-cell title="举办方" desc="阿斯顿撒旦阿斯顿"></nut-cell>
            <nut-cell title="负责人" desc="阿"></nut-cell>
            <nut-cell title="电话" desc="1645456456456"></nut-cell>
            <div class="last-nut-cell">
              <nut-input
                style="width:100%;height:100%"
                label="项目介绍"
                type="textarea"
                show-word-limit
                rows="4"
                max-length="200"
                placeholder="请输入留言"
              />
            </div>
          </nut-cell-group>
        </div>
      </div>
    </div>
    <div class="zhaomudetail-bottom">
      <nut-button
        shape="square"
        style="width:100%;height:100%;line-height:50px;text-align:center;background-color:#FA4419;color:#fff;font-size:16px"
        >立即报名</nut-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.zhaomudetail-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  background-color: #fff;
}
.zhaomudetail-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
}
.zhaomudetail-content-container {
  width: 100%;
  height: 99vh;
  background-color: #fff;
}
.zhaomudetail-content-title {
  width: 100%;
  height: 50px;
}
.zhaomudetail-content-title-content {
  height: 100%;
  width: 32%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}
.zhaomudetail-content-content {
  width: 100%;
  min-height: 500px;
  height: auto;
  padding-left: 10px;
  padding-right: 10px;
}
.last-nut-cell {
  width: 100%;
  min-height: 46px;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
}
.nut-input {
  padding: 0;
  margin-left: 4.5%;
}
.nut-input-label {
  display: flex;
  align-items: center;
}
.nut-input .input-text,
.nut-input__text--readonly {
  width: 94.5%;
  color: #cfcccc;
}
</style>
