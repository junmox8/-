<template>
  <div class="tianxie-container"></div>
</template>

<script>
import qs from "qs";
export default {
  created() {
    const id = qs.parse(this.tid.slice(25)).id;
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
</style>
