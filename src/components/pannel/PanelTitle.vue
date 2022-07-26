<script setup>
import triangleIcon from "../../assets/images/多边形-三角.png"

const props = defineProps({
  text: String,
  hideTriangle: Boolean,
})
</script>
<template>
  <div class="panel-title-container">
    <VanImage class="tw-w-14 tw-h-auto tw-mx-10" v-if="!hideTriangle" :src="triangleIcon"/>
    <span>{{ props.text }}</span>
    <VanImage class="tw-w-14 tw-h-auto tw-mx-10" v-if="!hideTriangle" :src="triangleIcon"/>
  </div>
</template>


<style lang="less" scoped>
.panel-title-container {
  .row-flex-center();
  padding: 6px 0;
  background: linear-gradient(270deg, white, rgba(225, 127, 79, .2), white);
  color: #F07842;
  font-size: 20px;
}
</style>