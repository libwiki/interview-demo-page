<script setup>
import triangleIcon from "../../assets/images/多边形-三角.png"

const props = defineProps({
  title: String,
  bgTitle: String,
})
</script>
<template>
  <div class="panel-mult-title-container">
    <div class="en-title-box">{{ props.bgTitle }}</div>
    <div class="zh-title-box">{{ props.title }}</div>
  </div>
</template>


<style lang="less" scoped>
.panel-mult-title-container {
  .col-flex-center();
@apply tw-bg-white tw-py-12 tw-w-full;

  .en-title-box {
    background-image: linear-gradient(#5EBDEA, #D8D8D8, white);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 48px;
  }

  .zh-title-box {
    color: #3995C0;
    margin-top: -40px;
    font-size: 36px;

  }
}
</style>