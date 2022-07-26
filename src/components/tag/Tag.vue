<script setup>
import arrowIcon from "../../assets/images/图标-招募需求-箭头-1.png"

const props = defineProps({
  text: String,
  hideArrow: Boolean,
})
</script>
<template>
  <div class="tag-container">
    <div class="tw-truncate">
      {{ props.text }}
    </div>
    <VanImage class="tw-w-10 tw-flex-shrink-0 tw-mx-10" v-if="!hideArrow" :src="arrowIcon"/>
  </div>
</template>


<style lang="less" scoped>
.tag-container {
  .flex-row();
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #3995C0;
  background: rgba(128, 212, 180, .13);
  padding: 15px 10px;
  border-radius: 5px;
}
</style>