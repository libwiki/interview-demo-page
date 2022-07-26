<script setup>

const props = defineProps({
  logo: String,
  text: Boolean,
})
</script>
<template>
  <div class="panel-header-container">
    <VanImage class="logo-image" :src="props.logo" v-if="props.logo"/>
    <div class="tw-flex-1 tw-text-24">{{ props.text }}</div>
  </div>
</template>


<style lang="less" scoped>
.panel-header-container {
  .flex-row();
  padding: 20px 30px;

  .logo-image {
    width: 188px;
    height: 100px;
    border: solid 1px #D9D9D9;
    margin-right: 10px;
  }
}
</style>