<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <WordCloud :keyWordList="keyWordList" />
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="all-user traffic-box">
                <div class="traffic-img">
                  <el-icon><User /></el-icon>
                </div>
                <span class="item-value">{{ indexData?.allUserCount }}</span>
                <span class="traffic-name sle">⽤户总数</span>
              </div>
              <div class="no-resource traffic-box">
                <div class="traffic-img">
                  <el-icon><Warning /></el-icon>
                </div>
                <span class="item-value">{{ indexData?.resourceUnAuditCount }}</span>
                <span class="traffic-name sle">未审核资源</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <el-icon><Location /></el-icon>
                </div>
                <span class="item-value">{{ indexData?.todayUserCheckCount }}</span>
                <span class="traffic-name sle">今⽇签到数</span>
              </div>
              <div class="all-resource traffic-box">
                <div class="traffic-img">
                  <el-icon><Files /></el-icon>
                </div>
                <span class="item-value">{{ indexData?.resourceCount }}</span>
                <span class="traffic-name sle">资源总数</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">不同⽹盘类型资源</div>
              <div class="pie-echarts">
                <Pie :pieDataList="pieDataList" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="dataVisualize">
import { indexDashboard } from '@/api/modules/home'
import type { IndexDataReturnType, EChartsDataType } from '@/api/modules/home'
import { onMounted, ref } from 'vue'
import { User, Location, Files, Warning } from '@element-plus/icons-vue'
import WordCloud from './wordCloud..vue'
import Pie from './components/pie.vue'

const indexData = ref<IndexDataReturnType>()
const keyWordList = ref<EChartsDataType[]>([])
const pieDataList = ref<EChartsDataType[]>([])
const getIndexData = async () => {
  const res = await indexDashboard()
  indexData.value = res.data

  // 处理词云图
  keyWordList.value = res.data.tagList.map((item) => {
    return {
      name: item.title,
      value: item.pkId
    }
  })

  // 饼图
  pieDataList.value = Object.keys(res.data.resourceCountMap).map((item) => {
    const value = res.data.resourceCountMap[item]
    return {
      name: item,
      value
    }
  })
}

onMounted(() => getIndexData())
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
