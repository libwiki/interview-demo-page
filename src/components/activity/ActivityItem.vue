<script setup>
import bgGreen from "../../assets/images/模块-活动形式-供需对接会.png"
import bgOrange from "../../assets/images/模块-活动形式-线上招募.png"

const props = defineProps({
  title: String,
  desc: String,
  theme: {
    type: String,
    default: 'orange',
  },
  okText: String,
})
</script>
<template>
  <div :class="`activity-item-container ${props.theme}`">
    <div class="tw-text-40 tw-font-700 title">{{ props.title }}</div>
    <div class="tw-text-22 desc">{{ props.desc }}</div>
    <div
        v-if="okText&&okText.length>0"
        class="tw-rounded-full button">
      <span>{{ okText }}</span>
    </div>
  </div>
</template>


<style lang="less" scoped>
.activity-item-container {
  width: 100%;
  border-radius: 10px;
  padding: 35px;
  color: #333333;

  .button {
    .row-flex-center();
    display: inline-flex;
    font-size: 22px;
    min-width: 136px;
    min-height: 50px;
    color: white;
    cursor: pointer;
  }

  &.green {
    background: url("../../assets/images/模块-活动形式-供需对接会.png") no-repeat;
    background-size: 100% 100%;

    .title {
      color: #3995C0;
    }

    .button {
      background: linear-gradient(90deg, #3793C0 0%, #57DCF0 100%);
    }

  }

  &.orange {
    background: url("../../assets/images/模块-活动形式-线上招募.png") no-repeat;
    background-size: 100% 100%;

    .title {
      color: #6D5232;
    }

    .button {
      background: linear-gradient(90deg, #FF7549 0%, #EBB75F 100%);
    }

  }
}
</style>