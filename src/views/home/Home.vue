<script setup>
import {EventsEnum} from "../../events/EventsEnum";
import {useRefreshStore} from "../../store/refreshStore";
import {onMounted, onUnmounted, reactive, ref, toRaw, watch} from "vue";
import logoImg from "../../assets/images/华建通logo.png"
import bottomLogoImg from "../../assets/images/底部logo-中国东信.png"
import icoIcon from "../../assets/images/ico_ga.png"
import bannerImg from "../../assets/images/05-710x460.png"
import swiperImg1 from "../../assets/images/05-710x460.png"
import playImg from "../../assets/images/播放按钮.png"
import arrowLeft from "../../assets/images/切换按钮-左-1.png"
import arrowRight from "../../assets/images/切换按钮-右-1.png"
import partnerImg1 from "../../assets/images/合作采购方-1.png"
import partnerImg2 from "../../assets/images/合作采购方-2.png"
import partnerImg3 from "../../assets/images/合作采购方-3.png"
import partnerImg4 from "../../assets/images/合作采购方-4.png"
import partnerImg5 from "../../assets/images/合作采购方-5.png"
import {MEDIA_TYPE_ENUM} from "../../enum/MediaEnum";
import {isFunction} from "../../utils/helpers";

import PanelTitle from "../../components/pannel/PanelTitle.vue"
import PanelHeader from "../../components/pannel/PanelHeader.vue"
import Tag from "../../components/tag/Tag.vue";
import PanelMultipleTitle from "../../components/pannel/PanelMultipleTitle.vue";
import ActivityItem from "../../components/activity/ActivityItem.vue";
import {useWindowSize} from "@vant/use";

const refreshStore = useRefreshStore()

onMounted(() => { // 页面渲染时进行事件监听
  window.emitter.on(EventsEnum.onRefresh, () => {
    console.log('下拉刷新触发')
    refreshStore.loading = false; // 关闭下拉刷新动画
  }); // 监听处理页面的下拉刷新事件
})

onUnmounted(() => { // 离开页面时移除事件监听
  window.emitter.off(EventsEnum.onRefresh)
})

const swiperRef = ref(null)
const sourceRef = ref([])
const swiperData = reactive({
  index: 0,
  data: [
    {type: MEDIA_TYPE_ENUM.video, playing: false, link: 'https://www.w3school.com.cn/i/movie.ogg'},
    {type: MEDIA_TYPE_ENUM.image, link: swiperImg1},
  ]
});

const {width, height} = useWindowSize();
watch([width, height], () => { // 窗口变化时 轮播图应该重绘
  if (swiperRef.value) {
    swiperRef.value.resize();
  }
});
// 轮播图滚动
const onNext = (next = true) => {
  if (!swiperRef.value) {
    return;
  }
  console.log(swiperRef.value)
  if (next) {
    swiperRef.value.next();
  } else {
    swiperRef.value.prev();
  }
}

// 播放视频
const onPlay = (index) => {
  const videoRef = sourceRef.value[0];
  if (!videoRef || !(videoRef instanceof HTMLVideoElement)) {
    return
  }
  if (isFunction(videoRef.play)) {
    videoRef.play();
  }
}


// 合作伙伴
const partners = ref([
  partnerImg1,
  partnerImg2,
  partnerImg3,
  partnerImg4,
  partnerImg5,
]);

// 方案设计标签
const designs = ref(new Array(10).fill('方案设计'))
</script>

<template>
  <div>
    <div class="tw-px-22 tw-py-15 tw-bg-white">
      <VanImage class="tw-h-58 tw-w-auto" :src="logoImg"/>
    </div>

    <div>
      <VanImage class="tw-h-400 tw-w-full" :src="bannerImg"/>
    </div>

    <!--轮播图 start -->
    <div class="tw-py-35 swipe-box-bg row-flex-center">
      <div @click="onNext(false)" class="tw-flex-1 row-flex-center tw-cursor-pointer">
        <VanImage class="tw-w-40 tw-h-40" :src="arrowLeft"/>
      </div>
      <van-swipe ref="swiperRef" class="swipe-box" indicator-color="white">
        <van-swipe-item v-for="(item,i) of swiperData.data" :key="i">
          <div class="row-flex-center swipe-item-box">
            <div class="source-box" v-if="item.type===MEDIA_TYPE_ENUM.video">
              <video
                  ref="sourceRef"
                  @play="item.playing=true"
                  @pause="item.playing=false"
                  @ended="item.playing=false"
                  :key="item.link">
                <source :src="item.link"/>
              </video>
              <div v-show="item.playing===false" class="row-flex-center play-modal">
                <VanImage @click="onPlay(i,item)" class="tw-w-81 tw-h-81 tw-cursor-pointer" :src="playImg"/>
              </div>
            </div>
            <div class="source-box" v-if="item.type===MEDIA_TYPE_ENUM.image">
              <VanImage ref="sourceRef" :key="item.link" class="tw-w-full tw-h-full" :src="item.link"/>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div @click="onNext()" class="tw-flex-1 row-flex-center tw-cursor-pointer">
        <VanImage class="tw-w-40 tw-h-40" :src="arrowRight"/>
      </div>
    </div>
    <!--轮播图 end -->


    <!--合作采购方 start-->
    <div class="tw-py-20 col-flex-center partner-container">
      <PanelMultipleTitle title="合作采购方" bg-title="COOPERATION"/>
      <div class="tw-w-full tw-bg-light-white tw-px-17 tw-py-15 flex-row tw-flex-wrap">
        <div class="tw-w-1/3 tw-px-5 tw-py-5" v-for="item of partners" :key="item">
          <VanImage class="tw-bg-white tw-h-auto" :src="item" :key="item"/>
        </div>
      </div>
    </div>
    <!--合作采购方 end-->


    <!--采购需求 start-->
    <div class="tw-py-20 tw-px-20 tw-mx-22 tw-bg-white ">
      <PanelHeader
          text="作为中国领先的城市运营商，云星集团主营业务涉及房地产开发、城市更新、商业运营..."
          :logo="partnerImg1"/>
      <PanelTitle text="采购需求"/>
      <div class="flex-row tw-flex-wrap">
        <div
            class="tw-w-1/4 tw-px-5 tw-py-5"
            v-for="(item,i) of designs" :key="item">
          <Tag class="tw-w-full" :text="`${i}${item.repeat(3)}`"/>
        </div>
      </div>
    </div>
    <!--采购需求 end-->

    <!--活动形式 start-->
    <div class="tw-py-20 col-flex-center partner-container">
      <PanelMultipleTitle title="活动形式" bg-title="ACTIVITY FORM"/>
      <div class="tw-w-full tw-px-80 tw-py-25 col-flex-center">
        <div class="tw-w-full tw-space-y-20">
          <ActivityItem
              ok-text="我要参加"
              title="线上招募" desc="线上定向引入 海量数据沉淀"/>
          <ActivityItem
              ok-text="我要参加"
              theme="green"
              title="供需对接会" desc="线下供需直连 精准高效共赢"/>
        </div>
      </div>
    </div>
    <!--活动形式 end-->

    <!--联系方式 start-->
    <div class="tw-pt-20 link-box">
      <div class="link-tel">
        <div class="flex-row">
          <div>活动联系人：何文章</div>
          <div class="tw-px-10">13188888888</div>
        </div>
        <VanImage class="tel-icon" :src="playImg"/>
      </div>
      <div class="link-online">
        <div class="link-btn">立即报名</div>
      </div>
    </div>
    <!--联系方式 end-->

    <div class="right-box">
      <div class="tw-py-49 tw-px-42">
        <VanImage class="logo-image" :src="bottomLogoImg"/>
      </div>
      <div class="info-item">
        <div class="label">南宁总部：</div>
        <div class="value">中国广西南宁市良庆区秋月路18号， 530200</div>
      </div>
      <div class="info-item">
        <div class="label">北京总部：</div>
        <div class="value">北京市海淀区鲁迅文化园文化创作展示中心2号楼， 100097</div>
      </div>
      <div class="info-item">
        <div class="label">联系电话：</div>
        <div class="value">0771-100097</div>
      </div>
      <div class="info-item">
        <div class="label">联系邮箱：</div>
        <div class="value">contact@caih.com</div>
      </div>

      <div class="col-flex-center footer-box">
        <div>桂ICP备16005301号-7</div>
        <div class="row-flex-center">
          <VanImage class="tw-w-39 tw-h-auto tw-mr-15" :src="icoIcon"/>
          <span>桂公网安备 45010802000099号</span>
        </div>
        <div>由广西东信数建信息科技有限公司承建</div>
        <div>Copyright 2020-2024 All Right</div>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.swipe-box-bg {
  background-color: rgba(184, 218, 255, .1);
}

.swipe-box {
  width: 530px;
  height: 328px;

  .swipe-item-box {

    background-color: antiquewhite;

    .source-box {
      width: 100%;
      height: 100%;
      position: relative;

      video {
        width: 100%;
        height: 100%;
        object-fit: fill
      }

      .play-modal {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.link-box {
  background-color: white;

  .link-tel {
    .flex-row();
    align-items: center;
    justify-content: space-between;
    height: 60px;
    border-radius: 30px;
    margin: 0 22px;
    padding: 0 20px;
    font-size: 24px;
    color: #3995C0;

    background-color: #F7F7F7;
    overflow: hidden;

    .tel-icon {
      height: 120%;
      opacity: .4;

    }
  }

  .link-online {
    .row-flex-center();
    height: 212px;
    background: url("../../assets/images/花花草草.png") no-repeat 100%;

    .link-btn {
      background-image: linear-gradient(90deg, #3793C0 0%, #57DCF0 100%);
      border-radius: 3px;
      padding: 13px 32px;
      font-size: 24px;
      color: white;
    }
  }

}

.right-box {
  background-color: #323232;
  color: white;
  font-size: 25px;
  line-height: 45px;

  .logo-image {
    width: 390px;
    height: 81px;
  }

  .info-item {
    .flex-row();
    padding: 0 40px;

    .label {
      width: 140px;
    }

    .value {
      flex: 1;
    }

  }

  .footer-box {
    padding-top: 116px;
    line-height: 70px;
  }
}

</style>
