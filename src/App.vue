<script setup>
import {isFalse, isTrue, px2rem} from "./utils/helpers";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {useRefreshStore} from "./store/refreshStore";
import {EventsEnum} from "./events/EventsEnum";
import {useIosCompatibility} from "./hooks/useIosCompatibility";
import Config from "./config/Config";

const $route = useRoute();
useIosCompatibility(); // ios适配


// 是否有顶部导航栏
const hasNavBar = computed(() => {
  return isTrue($route.meta.navbar);
});


// 是否显示返回按钮
const showBack = computed(() => {
  return isTrue($route.meta.showBack);
})


const bodyStyle = computed(() => {
  const meta = $route.meta || {};
  const styles = meta.pageStyle || {};
  if (meta.pageBgColor) {
    styles.backgroundColor = meta.pageBgColor;
  }
  return styles;
})


// 全局主题配置
const themeVars = {
  dividerMargin: '0.5rem',

}
const refreshStore = useRefreshStore()

function onRefresh() {
  // 触发下拉刷新页面，对应的页面需要实现下拉刷新的具体逻辑
  window.emitter.emit(EventsEnum.onRefresh);
}

const configProviderClass = computed(() => {
  return {
    'tw-max-w-view-port': true,
    'config-provider': true,
    'padding-nav-bar': hasNavBar.value,
  }
});
const router = useRouter();
const onBack = () => {
  if (window.history.length > 1) { // 可后退的
    router.back();
  } else { // 否则直接到首页
    router.replace({name: Config.homeRouteName})
  }
}
</script>

<template>
  <van-pull-refresh
      class="tw-px-position-center tw-min-h-screen"
      :disabled="isFalse($route.meta.refresh)"
      v-model="refreshStore.loading"
      @refresh="onRefresh">
    <van-config-provider
        :class="configProviderClass"
        :style="bodyStyle"
        :theme-vars="themeVars">
      <!--顶部导航栏 start-->
      <van-nav-bar
          fixed
          class="tw-mx-position-center tw-max-w-view-port"
          safe-area-inset-top
          v-if="hasNavBar"
          @click-left="onBack">
        <template #left>
          <van-icon v-if="showBack" :size="px2rem(17)" name="arrow-left" color="#27292B"/>
        </template>
        <template #title>
          <span class="tw-text-dark tw-text-17 tw-font-normal tw-leading-26">
            {{ $route.query._title || $route.meta.title }}
          </span>
        </template>
      </van-nav-bar>
      <!--顶部导航栏 end-->
      <router-view></router-view>

    </van-config-provider>
  </van-pull-refresh>
</template>

<style lang="less" scoped>
.config-provider {
  z-index: -1;
  min-height: 100vh;
  box-sizing: border-box;

  &.padding-nav-bar {
  @apply tw-pt-46; // vant顶部导航栏默认高度为46px（这里使用了tailwindcss 的@apply指令）
  }

}


</style>
