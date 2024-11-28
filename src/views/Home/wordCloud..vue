<script setup lang="ts">
import * as echarts from 'echarts/core'
import 'echarts-wordcloud'
import { onMounted, watch } from 'vue'
import type { EChartsDataType } from '@/api/modules/home'

const props = defineProps<{
  keyWordList: EChartsDataType[]
}>()

onMounted(() => {
  init()
})

// 初始化示例设置数据
const init = () => {
  const dom = document.querySelector('.wordCloud') as HTMLElement
  var myChart = echarts.init(dom)
  const option = {
    series: [
      {
        type: 'wordCloud',
        // 要绘制云的形状,默认是 circle，可选的参数有 cardioid 、 diamond 、 triangle-forward 、 triangle 、 star
        shape: 'circle',
        // 保持maskImage的纵横⽐或1:1的形状
        // 从echarts-wordcloud@2.1.0开始⽀持该选项
        keepAspect: false,
        // 左/上/宽/⾼/右/下⽤于字云的定位
        // 默认放置在中⼼，⼤⼩为75% x 80%。
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        // 数据中的值将映射到的⽂本⼤⼩范围。
        // 默认值为最⼩12px，最⼤60px。
        sizeRange: [12, 60],
        // ⽂字旋转范围和步进程度。⽂本将通过rotationStep 45在[- 90,90]范围内随机旋转
        rotationRange: [-90, 90],
        rotationStep: 45,
        // ⽹格⼤⼩(以像素为单位)，⽤于标记画布的可⽤性
        // ⽹格⼤⼩越⼤，单词之间的间隔就越⼤
        gridSize: 8,
        // 设置为true允许⽂字部分地绘制在画布之外。
        // 允许画⽐画布⼤的字
        // 从echarts-wordcloud@2.1.0开始⽀持该选项
        drawOutOfBound: false,
        // 如果字体太⼤，⽆法显示⽂本，是否缩⼩⽂本。如果设置为false，则⽂本将不被渲染。如果设置为true，⽂本将被缩⼩。
        shrinkToFit: false,
        // 是否执⾏布局动画。
        //当单词较多时禁⽤会导致UI阻塞。
        layoutAnimation: true,
        // 全局⽂本样式
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // Color可以是回调函数或颜⾊字符串
          color: function () {
            // 任意颜⾊
            return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')'
          }
        },
        emphasis: {
          focus: 'self',
          textStyle: {
            textShadowBlur: 10,
            textShadowColor: '#333'
          }
        },
        data: props.keyWordList
      }
    ]
  }
  myChart.setOption(option)
}

watch(
  () => props.keyWordList,
  () => {
    init()
  }
)
</script>
<template>
  <div class="wordCloud"></div>
</template>
<style lang="less" scoped>
.wordCloud {
  height: 100%;
  width: 100%;
}
</style>
